import { create } from 'zustand';
import { fetchDrivesListApi } from '@/services/api';

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

interface DriveState {
  drives: DriveData[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  hasMore: boolean;
  fetchDrives: () => Promise<void>;
  fetchMoreDrives: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setFilterDate: (date: string | null) => void;
  searchTerm: string;
  filterDate: string | null;
  filteredDrives: DriveData[];
}

interface SideBarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

// Utility function for filtering drives
function filterDrives(drives: DriveData[], searchTerm: string, filterDate: string | null): DriveData[] {
  return drives.filter(drive => {
    const matchesFilterDate = !filterDate || new Date(drive.startTimestamp).toDateString() === new Date(filterDate).toDateString();
    if (!searchTerm.trim()) return matchesFilterDate;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const includesSearchTerm = (value: any) => {
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerCaseSearchTerm);
    };

    // Check multiple fields for match
    return matchesFilterDate && (
      includesSearchTerm(drive.dongleId) ||
      includesSearchTerm(drive.driver?.firstname) ||
      includesSearchTerm(drive.driver?.lastname) ||
      includesSearchTerm(drive.partner?.name) ||
      includesSearchTerm(drive.licensePlate)
    );
  });
}

export const useDriveStore = create<DriveState>((set, get) => ({
  drives: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterDate: null,
  filteredDrives: [],
  page: 1,
  pageSize: 20,
  hasMore: true,

  fetchDrives: async () => {
    set({ loading: true });
    try {
      const { drives, hasMore } = await fetchDrivesListApi(1, get().pageSize);
      set(state => ({ 
        ...state,
        drives, 
        loading: false, 
        page: 1, 
        hasMore,
        // Re-compute filteredDrives since the base drives array has changed
        filteredDrives: filterDrives(drives, state.searchTerm, state.filterDate),
      }));
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
        ...moreDrives.filter((newDrive) => !currentDrives.some((existingDrive) => existingDrive.id === newDrive.id)),
      ];
      set(state => ({
        ...state,
        drives: updatedDrives,
        loading: false,
        page: nextPage,
        hasMore,
        // Re-compute filteredDrives since the base drives array has changed
        filteredDrives: filterDrives(updatedDrives, state.searchTerm, state.filterDate),
      }));
    } catch (error) {
      console.error('Error in fetchMoreDrives:', error);
      set({ error: error.toString(), loading: false });
    }
  },

  setSearchTerm: (term: string) => {
    set(state => ({
      ...state,
      searchTerm: term,
      // Re-compute filteredDrives since searchTerm has changed
      filteredDrives: filterDrives(state.drives, term, state.filterDate),
    }));
  },

  setFilterDate: (date: string | null) => {
    set(state => ({
      ...state,
      filterDate: date,
      // Re-compute filteredDrives since filterDate has changed
      filteredDrives: filterDrives(state.drives, state.searchTerm, date),
    }));
  },
}));

export const useSidebarStore = create<SideBarState>((set) => ({
  isSidebarOpen: true, 
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
