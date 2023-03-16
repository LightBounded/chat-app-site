import { create } from "zustand";

export type Message = {
  id: string;
  channelId: string;
  userId: string;
  text: string;
};

type MessageState = {
  messages: Message[];
  createMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
};

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  createMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  setMessages: (messages) => set({ messages }),
}));
