import { create } from "zustand";
import { io, Socket } from "socket.io-client";

import { axiosInstance } from "@/lib/axios";
import { ClubTypes, MessageTypes, Student } from "@/types/Client-types";

interface MessageStore {
  error: any;
  isLoading: boolean;
  isConnected: boolean;
  users: Student | null;
  socket: Socket | null;
  messages: MessageTypes[];
  onlineUsers: Set<string>;
  clubData: ClubTypes | null;
  userClubs: { clubs: ClubTypes[] } | null;
  userActivities: Map<string, string>;
  selectedClub: string | null;

  disconnectSocket: () => void;
  initSocket: (userId: string) => void;
  setSelectedClub: (clubId: string) => void;

  fetchUserClubs: () => Promise<void[]>;
  fetchClubById: (clubId: string) => Promise<void>;
  fetchClubDetails: (clubId: string) => Promise<void>;
  uploadFile: (clubId: string, file: File) => Promise<void>;
  sendMessage: (clubId: string, content: string) => Promise<void>;
}

const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

export const useMessageStore = create<MessageStore>((set, get) => ({
  users: null,
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedClub: "",
  clubData: null,
  userClubs: null,

  setSelectedClub: (clubId: string) => set({ selectedClub: clubId }),

  
  initSocket: (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.on("connect", () => set({ isConnected: true }));
      socket.on("disconnect", () => set({ isConnected: false }));

      socket.on("receive_message", (message: MessageTypes) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: MessageTypes) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      set({ isConnected: true });
    }
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket && get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: async (clubId: string, content: string) => {
    const socket = get().socket;
    if (!socket) {
      console.error("Socket not initialized");
      set({ error: "Socket connection is unavailable" });
      return;
    }

    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(`/club/message/${clubId}`, {
        content,
      });

      socket.emit("send_message", { clubId, data: response.data });
    } catch (error: any) {
      console.error("Send message error:", error);
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchClubById: async (clubId: string | null) => {
    try {
      const response = await axiosInstance.get(`/club/message/${clubId}`);
      set({
        isLoading: true,
        clubData: response.data,
        messages: response.data.messages,
      });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      console.error("error in Conversation:", error);
      throw new Error("Failed to fetch club details");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchClubDetails: async (clubId: string) => {
    try {
      const response = await axiosInstance.get(`/club/details/${clubId}`);
      set({
        isLoading: true,
        clubData: response.data,
      });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      console.error("error in Conversation:", error);
      throw new Error("Failed to fetch club details");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserClubs: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/user/club");
      set({ userClubs: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      console.error("error in Conversation:", error);
      throw new Error("Failed to fetch club details");
    } finally {
      set({ isLoading: false });
    }
  },

  uploadFile: async (clubId, file) => {
    try {
      set({ isLoading: true });
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        `club/file/${clubId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const socket = get().socket;
      if (socket) {
        socket.emit("file_uploaded", { clubId, fileData: response.data });
      }
    } catch (error: any) {
      console.error("File upload error:", error);
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
