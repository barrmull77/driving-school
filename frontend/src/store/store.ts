// store.ts
import { create } from 'zustand';
import { fetchDrivesListApi } from '@/services/api';

export interface DriveData {
  id: string;
  incidentCount: number;
  bookmarkCount: number;
  curriculumCount: number;
  dongleId: string;
  driver: Person;
  driverDriveCount: number;
  startTimestamp: string;
  instructor: Person;
  partner: Partner;
  driveType: number;
  continueSessionId: string | null;
  lessonTopics: string[];
  videoStatus: number;
  metadataStatus: number;
  fullVideoStatus: number;
  rating: number;
  licensePlate: string | null;
  vin: string | null;
  bitRateKbps: number;
}

interface Person {
  id: string;
  firstname: string;
  lastname: string;
  profileImageURL: string;
}

interface Partner {
  id: string;
  name: string;
}

interface DriveState {
  drives: DriveData[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  hasMore: boolean;
  fetchDrives: () => void;
  searchTerm: string;
  filterDate: string | null;
  setSearchTerm: (term: string) => void; 
  setFilterDate: (date: string | null) => void;
  filteredDrives: () => DriveData[]; 
}

interface SideBarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useDriveStore = create<DriveState>((set, get) => ({
  drives: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterDate: null,
  filteredDrivesMemoized: null,
  page: 1,
  pageSize: 20,
  hasMore: true,
  fetchDrives: async () => {
    set({ loading: true });
    try {
      const { drives, hasMore } = await fetchDrivesListApi(1, get().pageSize);
      set({ 
        drives, 
        loading: false, 
        page: 1, 
        hasMore 
      });
    } catch (error) {
      console.error('Error in fetchDrives:', error);
      set({ error: error.toString(), loading: false });
    }
  },

  fetchMoreDrives: async () => {
    if (!get().hasMore) return;
    const nextPage = get().page + 1;
    set({ loading: true });
    try {
      const { drives: moreDrives, hasMore } = await fetchDrivesListApi(nextPage, get().pageSize);
      const currentDrives = get().drives;
      const updatedDrives = [
        ...currentDrives,
        ...moreDrives.filter((newDrive) => !currentDrives.some((existingDrive) => existingDrive.id === newDrive.id))
      ];
      set({
        drives: updatedDrives,
        loading: false,
        page: nextPage,
        hasMore,
      });
    } catch (error) {
      console.error('Error in fetchMoreDrives:', error);
      set({ error: error.toString(), loading: false });
    }
  },
  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },
  setFilterDate: (date: string | null) => {
    set({ filterDate: date });
  },
  filteredDrives: () => {
    const { drives, searchTerm, filterDate } = get();
    return drives.filter((drive) => {
      const matchesFilterDate = !filterDate || new Date(drive.startTimestamp).toDateString() === new Date(filterDate).toDateString();
      if (!matchesFilterDate) return 
      if (!searchTerm.trim()) return matchesFilterDate;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
      const includesSearchTerm = (value: any) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerCaseSearchTerm);
      };
      console.log('drives', drives);
      // Check multiple fields for match
      const matchesSearchTerm = includesSearchTerm(drive.dongleId) ||
                                includesSearchTerm(drive.driver?.firstname) ||
                                includesSearchTerm(drive.driver?.lastname) ||
                                includesSearchTerm(drive.partner?.name) ||
                                // Add other fields you want to search in
                                includesSearchTerm(drive.licensePlate);
  
      return matchesFilterDate && matchesSearchTerm;
      // return matchesFilterDate
    });
  },
}));

export const useSidebarStore = create<SideBarState>((set) => ({
  isSidebarOpen: true, 
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
