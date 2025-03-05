import { create } from 'zustand';
import { showNotification } from '@mantine/notifications';
import { createNewUser, deleteUser, getAllUser, getUserDetail, updateUser } from '@/api/user';
import { useLayoutStore } from '../layout';

const { showLoading, hideLoading } = useLayoutStore.getState();

interface UserStore {
  userList: User[];
  setUserList: (userList: User[]) => void;
  getUserList: () => void;

  createNewUser: (req: RequestNewUser) => void;
  updateUser: (req: RequestEditUser) => void;
  deleteUser: (id: string) => void;

  userDetail: User;
  getUserDetail: (id: string, navigate: (path: string) => void) => void;

  resetUserStore: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  userList: [],
  setUserList: (userList: User[]) => set({ userList }),
  getUserList: async () => {
    showLoading();
    await getAllUser().then((res) => {
      if (res.code === 200) {
        set({ userList: res.data });
      }
    }).finally(() => {
      hideLoading();
    });
  },

  createNewUser: (req: RequestNewUser) => {
    showLoading();
    createNewUser(req)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
          useUserStore.getState().getUserList();
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  updateUser: async (req: RequestEditUser) => {
    showLoading();
    await updateUser(req)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
          useUserStore.getState().getUserList();
        }
      })
      .finally(() => {
        hideLoading();
      });
  },

  deleteUser: async (id: string) => {
    showLoading();
    await deleteUser(id).then((res) => {
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        useUserStore.getState().getUserList();
      }
    }).finally(() => {
      hideLoading();
    });
  },

  userDetail: {} as User,
  getUserDetail: async (id: string, navigate: (path: string) => void) => {
    showLoading();
    await getUserDetail(id).then((res) => {
      if (res.code === 200) {
        set({ userDetail: res.data });
      }
    }).catch(() => navigate('/')).finally(() => {
      hideLoading();
    });
  },

  resetUserStore: () => {
    set({ userList: [] });
  },
}));
