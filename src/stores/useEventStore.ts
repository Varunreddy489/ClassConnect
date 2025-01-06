import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface EventsStore {
  events: any;
  isLoading: boolean;
  error: any | null;

  fetchEvents: () => Promise<void>;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/events");
      set({ events: response.data });
    } catch (error) {
      set({ error: error, isLoading: false });
      console.log("Error in fetchStats:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
