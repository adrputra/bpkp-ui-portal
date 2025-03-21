import { addNewInstitution, getInstitutionList } from "@/api/institution";
import { showNotification } from "@mantine/notifications";
import { create } from "zustand";
import { useLayoutStore } from "../layout";

interface InstitutionStore {
    institutionList: Institution[]
    getInstitutionList: () => void;
    addInstitution: (institution: RequestNewInstitution) => Promise<void>;

    resetInstitutionStore: () => void;
}

const { showLoading, hideLoading } = useLayoutStore.getState();

export const useInstitutionStore = create<InstitutionStore>()((set) => ({
    institutionList: [],
    getInstitutionList: async () => {
        showLoading();
        await getInstitutionList().then((res) => {
            if (res.code === 200 && res.data) {
                set({ institutionList: res.data });
            } else {
                showNotification({
                    color: 'red',
                    title: 'Error',
                    message: res.message
                })
            }
        }).finally(() => {
            hideLoading();
        })
    },

    addInstitution: async (institution: RequestNewInstitution) => {
        await addNewInstitution(institution).then((res) => {
            if (res.code === 200) {
                showNotification({
                    color: 'green',
                    title: 'Success',
                    message: res.message
                })
            } else {
                showNotification({
                    color: 'red',
                    title: 'Error',
                    message: res.message
                })
            }
        })
        await useInstitutionStore.getState().getInstitutionList();
    },

    resetInstitutionStore: () => {
        set({ institutionList: [] });
    }
}))