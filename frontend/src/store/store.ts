// store.ts
import { create } from 'zustand';
import { fetchDrivesListApi } from '@/services/api';

interface Drive {
  id: string;
  partner: string;
  kitId: string;
  instructor: string;
  status: string;
  data: string;
  bitrate: string;
}

interface DriveState {
  drives: Drive[];
  loading: boolean;
  error: string | null;
  fetchDrives: () => void;
}

export const useDriveStore = create<DriveState>((set) => ({
  drives: [],
  loading: false,
  error: null,
  fetchDrives: async () => {
    set({ loading: true });
    try {
        const drivesList = await fetchDrivesListApi();
        console.log('drives list', drivesList);
        set({ drives: drivesList, loading: false });
    } catch (error) {
        set({ error: error, loading: false });
    }
  },

export const useSidebarStore = create<SideBarState>((set) => ({
  isSidebarOpen: true, 
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
