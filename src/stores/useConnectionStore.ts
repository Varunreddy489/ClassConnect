import { create } from "zustand";
import { Student } from "@/types/Client-types";
import { axiosInstance } from "@/lib/axios";

interface Connection {
  connection: any;
  isLoading: boolean;
  error: string | null;
  users: Student[];

  suggestions: Student[];

  searchUsers: (name: string) => Promise<void>;
  sendConnection: (userId: string) => Promise<void>;
  getSuggestedConnections: () => Promise<void>;
}

export const useConnectionStore = create<Connection>((set) => ({
  isLoading: false,
  connection: null,
  error: null,
  users: [],
  suggestions: [],

  searchUsers: async (name: string) => {
    try {
      const response = await axiosInstance.post("/connection/search", {
        name,
      });
      set({ isLoading: true, users: response.data });
    } catch (error: any) {
      set({ isLoading: false, error: error });
      console.error("error in searchUsers: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getSuggestedConnections: async () => {
    try {
      const response = await axiosInstance.get("/connection/suggestions");
      set({ isLoading: true, suggestions: response.data });
    } catch (error: any) {
      console.error("error in searchUsers: ", error);
      set({ isLoading: false, error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  sendConnection: async (userId: string) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        `/connection/request/${userId}`,
        {}
      );
      set({ connection: response.data });
    } catch (error: any) {
      console.error("error in sendConnection: ", error);
      set({ isLoading: false, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
