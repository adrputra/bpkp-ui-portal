import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { checkIn, checkOut, getTodayAttendance, getUserAttendances } from '@/api/attendance';
import { isToday } from '@/libs/utils';
import { useLayoutStore } from '../layout';
import { useAuthStore } from '../auth';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface AttendanceStore {
  userAttendance: UserAttendance;
  doCheckIn: (request: RequestAttendance) => void;
  doCheckOut: (request: RequestAttendance) => void;
  getTodayAttendance: () => void;

  attendanceList: UserAttendance[];
  getAttendanceList: () => void;
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
  status_in: '',
  status_out: '',
  remark_in: '',
  remark_out: '',
  source_in: '',
  source_out: '',
};

export const useAttendanceStore = create<AttendanceStore>()((set) => ({
  userAttendance,
  attendanceList: [],
  doCheckIn: async (request: RequestAttendance) => {
    const req: Pick<UserAttendance, 'username' | 'remark_out' | 'source_out'> = {
      username: request.username,
      remark_out: request.remarks,
      source_out: 'web',
    };
    showLoading();
    await checkIn(req)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
          useAttendanceStore.getState().getTodayAttendance();
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  doCheckOut: async (request: RequestAttendance) => {
    const req: Pick<UserAttendance, 'username' | 'remark_out' | 'source_out'> = {
      username: request.username,
      remark_out: request.remarks,
      source_out: 'web',
    };
    showLoading();
    await checkOut(req)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
          useAttendanceStore.getState().getTodayAttendance();
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
            : '';
          const checkOutTime = isToday(res.data.check_out)
            ? new Date(res.data.check_out).toLocaleTimeString('en-US', {
                timeZone: 'Asia/Bangkok',
                hour12: false,
              })
            : '';
          set({
            userAttendance: {
              ...res.data,
              check_in: checkInTime || '',
              check_out: checkOutTime || '',
            },
          });
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  getAttendanceList: async () => {
    showLoading();
    const request: RequestAttendance = {
      username: '',
      remarks: '',
      insitution_id: useAuthStore.getState().institutionID,
    }
    await getUserAttendances(request).then((res) => {
      if (res.code === 200) {
        set({
          attendanceList: res.data,
        });
      }
    }).finally(() => {
      hideLoading();
    });
  }
}));
