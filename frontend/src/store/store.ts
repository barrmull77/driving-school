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
  fetchDrives: async () => {
    set({ loading: true });
    try {
        const drivesList = await fetchDrivesListApi();
        set({ drives: drivesList, loading: false });
    } catch (error) {
        set({ error: error, loading: false });
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
      // Todo - add logic for search functionality
      // const matchesSearchTerm = !searchTerm.trim() || Object.values(drive).some(value => 
      //   String(value).toLowerCase().includes(searchTerm.toLowerCase())
      // );
      const matchesFilterDate = !filterDate || new Date(drive.startTimestamp).toDateString() === new Date(filterDate).toDateString();
      return matchesFilterDate;
    });
  },
}));

export const useSidebarStore = create<SideBarState>((set) => ({
  isSidebarOpen: true, 
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
