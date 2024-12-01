import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface StatsStore {
  stats: any;
  isLoading: boolean;
  error: any | null;

  fetchStats: () => Promise<void>;
}

export const useStatsStore = create<StatsStore>((set) => ({
  stats: [],
  isLoading: false,
  error: null,

  fetchStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error) {
      set({ error: error, isLoading: false });
      console.log("Error in fetchStats:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
