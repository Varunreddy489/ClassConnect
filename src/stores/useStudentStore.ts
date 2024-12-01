import { axiosInstance } from "@/lib/axios";
import { Student } from "@/types/Client-types";
import { create } from "zustand";

interface StudentStore {
  user: Student | null;
  isLoading: boolean;
  error: any | null;
  suggestions: Student[] | null;

  fetchSuggestions: () => Promise<void>;
}

export const useStudentStore = create<StudentStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  suggestions: null,

  fetchSuggestions: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/student/suggestions");
      set({ suggestions: response.data });
    } catch (error) {
      set({ error: error, isLoading: false });
      console.log("Error fetching suggestions:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
