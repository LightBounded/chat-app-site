import { create } from "zustand";

export type Channel = {
  id: string;
  name: string;
};

type ChannelState = {
  channels: Channel[];
  activeChannelId: string | null;
  createChannel: (newChannel: Channel) => void;
  setActiveChannelId: (channelId: string) => void;
  setChannels: (channels: Channel[]) => void;
};

export const useChannelStore = create<ChannelState>((set) => ({
  channels: [],
  activeChannelId: null,
  createChannel: (newChannel) =>
    set((state) => ({ channels: [...state.channels, newChannel] })),
  setActiveChannelId: (channelId) => set({ activeChannelId: channelId }),
  setChannels: (channels) => set({ channels }),
}));
