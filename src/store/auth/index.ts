import { deleteAllIndexedDBs } from '@/libs/utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStore = {
  username: string;
  shortname: string;
  fullname: string;
  token: string;
  role: string;
  role_name: string;
  institutionID: string;
  institutionName: string;
  setUsername: (username: string) => void;
  setShortname: (shortname: string) => void;
  setFullname: (fullname: string) => void;
  setRole: (role: string) => void;
  setRoleName: (role_name: string) => void;
  setToken: (token: string) => void;
  setInstitutionID: (institutionID: string) => void;
  setInstitutionName: (institutionName: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      username: '',
      shortname: '',
      fullname: '',
      token: '',
      role: '',
      role_name: '',
      institutionID: '',
      institutionName: '',
      setUsername: (username: string) => set(() => ({ username })),
      setShortname: (shortname: string) => set(() => ({ shortname })),
      setFullname: (fullname: string) => set(() => ({ fullname })),
      setRole: (role: string) => set(() => ({ role })),
      setRoleName: (role_name: string) => set(() => ({ role_name })),
      setToken: (token: string) => set(() => ({ token })),
      setInstitutionID: (institutionID: string) => set(() => ({ institutionID })),
      setInstitutionName: (institutionName: string) => set(() => ({ institutionName })),

      clearAuth: () => {
        set(() => ({ token: '', role: '' }));
        localStorage.removeItem('session');
        localStorage.removeItem('menu');
        deleteAllIndexedDBs();
        window.location.href = '/login';
      }
    }),
    {
      name: 'session', // Key to store the data in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
