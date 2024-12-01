import { axiosInstance } from "@/lib/axios";
import { ClubTypes } from "@/types/Client-types";
import { create } from "zustand";

interface ClubStore {
  error: any;
  isLoading: boolean;
  clubData: ClubTypes | null;
  userClubs: { clubs: ClubTypes[] } | null;
  clubs: ClubTypes[];
  userActivities: Map<string, string>;
  selectedClub: string | null;
  
  fetchAllClubs: () => Promise<void>;
  fetchUserClubs: () => Promise<void>;
  fetchClubDetails: (clubId: string) => Promise<void>;
}

export const useClubStore = create<ClubStore>((set) => ({
  clubs: [],
  isLoading: false,
  error: null,
  clubData: null,
  userClubs: null,
  userActivities: new Map(),
  selectedClub: null,

  fetchAllClubs: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/club");
      set({ clubs: response.data });
    } catch (error) {
      console.error("Error fetching all clubs:", error);
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchClubDetails: async (clubId: string) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(`/club/details/${clubId}`);
      set({ clubData: response.data });
    } catch (error) {
      console.error(`Error fetching club details for club ID ${clubId}:`, error);
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserClubs: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/user/club");
      set({ userClubs: response.data });
    } catch (error) {
      console.error("Error fetching user clubs:", error);
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
