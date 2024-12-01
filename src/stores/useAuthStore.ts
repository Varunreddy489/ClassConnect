import { axiosInstance } from "@/lib/axios";
import { Student } from "@/types/Client-types";
import { create } from "zustand";

interface AuthStore {
  user: Student | null;
  isLoading: boolean;
  error: string | null;

  login: (user: Student, toast: any, navigate: any) => Promise<void>;
  signup: (user: Student, toast: any, navigate: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (data: Student, toast: any, navigate: any) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/student/login", {
        data,
      });
      set({ user: response.data, isLoading: false, error: null });
      navigate("/home");
      toast({
        title: "Success",
        description:
          "Welcome to ClassConnect! You have logged in successfully.",
      });
    } catch (error: any) {
      console.error("Login Error:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Login failed.",
        variant: "destructive",
      });
      set({ error: error?.response?.data?.message || null, isLoading: false });
    }
  },

  signup: async (data: Student, toast: any, navigate: any) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/student/register", {
        data,
      });
      set({ user: response.data, isLoading: false, error: null });
      navigate("/login");
      toast({
        title: "Success",
        description: "Registration successful. Please log in.",
      });
    } catch (error: any) {
      console.error("Signup Error:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Signup failed.",
        variant: "destructive",
      });
      set({ error: error?.response?.data?.message || null, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/auth/student/logout");
      set({ user: null, isLoading: false, error: null });
    } catch (error: any) {
      console.error("Logout Error:", error);
      set({
        error: error?.response?.data?.message || "Logout failed.",
        isLoading: false,
      });
    }
  },
}));
