import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { checkIn, checkOut, getTodayAttendance } from '@/api/attendance';
import { isToday } from '@/libs/utils';
import { useLayoutStore } from '../layout';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface AttendanceStore {
  userAttendance: UserAttendance;

  doCheckIn: (request: RequestAttendance) => void;
  doCheckOut: (request: RequestAttendance) => void;
  getTodayAttendance: () => void;
}

const userAttendance: UserAttendance = {
  id: '',
  username: '',
  fullname: '',
  shortname: '',
  gender: '',
  email: '',
  phone_number: '',
  check_in: '',
  check_out: '',
  remark_in: '',
  remark_out: '',
};

export const useAttendanceStore = create<AttendanceStore>()((set) => ({
  userAttendance,
  doCheckIn: async (request: RequestAttendance) => {
    showLoading();
    await checkIn(request)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  doCheckOut: async (request: RequestAttendance) => {
    showLoading();
    await checkOut(request)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  getTodayAttendance: async () => {
    showLoading();
    await getTodayAttendance()
      .then((res) => {
        if (res.code === 200) {
          const checkInTime = isToday(res.data.check_in)
            ? new Date(res.data.check_in).toLocaleTimeString('en-US', {
                timeZone: 'Asia/Bangkok',
                hour12: false,
              })
            : '--';
          const checkOutTime = isToday(res.data.check_out)
            ? new Date(res.data.check_out).toLocaleTimeString('en-US', {
                timeZone: 'Asia/Bangkok',
                hour12: false,
              })
            : '--';
          set({
            userAttendance: {
              ...res.data,
              check_in: checkInTime || '--',
              check_out: checkOutTime || '--',
            },
          });
        }
      })
      .finally(() => {
        hideLoading();
      });
  },
}));
