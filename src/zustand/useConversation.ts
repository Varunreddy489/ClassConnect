import { MessageType } from "@/types/Client-types";
import { create } from "zustand";

// interface ConversationState {
//   messages: MessageType[];
//   setMessages: (messages: MessageType[]) => void;
// }

// const useConversation = create<ConversationState>((set) => ({
//   messages: [],
//   setMessages: (messages) => set({ messages }),
// }));

interface ConversationState {
  messages: MessageType[];
  setMessages: (messages: MessageType[] | ((prevMessages: MessageType[]) => MessageType[])) => void;
}

const useConversation = create<ConversationState>((set) => ({
  messages: [],
  setMessages: (messagesOrUpdater) => 
    set((state) => ({
      messages: 
        typeof messagesOrUpdater === 'function' 
          ? messagesOrUpdater(state.messages)
          : messagesOrUpdater,
    })),
}));


export default useConversation;
