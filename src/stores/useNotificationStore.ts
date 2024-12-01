import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface Notification {
    id: string;
    content: string;
    createdAt: string;
  }
  
interface NotificationStore {
  error: any;
  notifications: Notification[];
  isLoading: boolean;

  getNotifications: () => void;
  markAsRead: (id: string) => void;
  rejectFriendRequest: (clubId: string) => void;
  acceptFriendRequest: (clubId: string) => void;
  deleteNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({ 
  error: null,
  isLoading: false,
  notifications: [],

  getNotifications: async () => {
    try {
      const response = await axiosInstance.get("/notifications");
      set({ notifications: response.data, isLoading: true });
    } catch (error: any) {
      set({ isLoading: false, error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await axiosInstance.put(`/notifications/${id}`);
      set({ isLoading: true });
    } catch (error: any) {
      set({ error: error, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteNotification: async (id: string) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      set({ isLoading: true });
    } catch (error: any) {
      set({ error: error, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  acceptFriendRequest: async (connectionId: string) => {
    try {
      await axiosInstance.post(`/connection/request/accept/${connectionId}`, {});
      set({ isLoading: true });
    } catch (error: any) {
      set({ error: error, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  rejectFriendRequest: async (clubId: string) => {
    try {
      await axiosInstance.post(`/connection/request/reject/${clubId}`, {});
      set({ isLoading: true });
    } catch (error: any) {
      set({ error: error, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
