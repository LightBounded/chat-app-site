import { create } from "zustand";

export type Message = {
  id: string;
  channelId: string;
  userId: string;
  message: string;
};

type MessageState = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));
