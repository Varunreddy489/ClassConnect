import { axiosInstance } from "@/lib/axios";
import { Student } from "@/types/Client-types";
import { create } from "zustand";

interface StudentStore {
  user: Student | null;
  isLoading: boolean;
  error: any | null;
  student: Student | null;
  students: Student[] | null;
  suggestions: Student[] | null;

  fetchSuggestions: () => Promise<void>;
  getStudentById: (studentId: string) => Promise<void>;
  getAllStudent: () => Promise<void>;
}

export const useStudentStore = create<StudentStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  suggestions: null,
  student: null,
  students: [],

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

  getStudentById: async (studentId) => {
    try {
      const response = await axiosInstance.get(`/student/profile/${studentId}`);
      console.log(response.data);
      set({ student: response.data, isLoading: true });
      return response.data;
    } catch (error) {
      set({ error: error, isLoading: false });
      console.error("error in getStudentById:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getAllStudent: async () => {
    try {
      const response = await axiosInstance.get(`/student/all`);
      console.log(response.data);
      set({ students: response.data, isLoading: true });
      return response.data;
    } catch (error) {
      console.error("error in getAllStudent:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
