import { useEffect } from "react";
import { logIn } from "./actions";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import socket from "./lib/socket";
import { Channel, useChannelStore } from "./stores/channels";
import { Message, useMessageStore } from "./stores/messages";
import { User, useUserStore } from "./stores/users";

function App() {
  const activeUserId = useUserStore((state) => state.activeUserId);
  const setUsers = useUserStore((state) => state.setUsers);
  const createUser = useUserStore((state) => state.createUser);
  const setChannels = useChannelStore((state) => state.setChannels);
  const createChannel = useChannelStore((state) => state.createChannel);
  const setMessages = useMessageStore((state) => state.setMessages);
  const createMessage = useMessageStore((state) => state.createMessage);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("activeUserId");
    if (storedUserId !== null && storedUserId !== "") logIn(storedUserId);

    socket.emit("usersFetch");
    socket.emit("channelsFetch");
    socket.emit("messagesFetch");

    const onUsersFetch = (users: User[]) => setUsers(users);
    const onUserCreate = (user: User) => createUser(user);

    socket.on("usersFetch", onUsersFetch);
    socket.on("userCreate", onUserCreate);

    const onChannelsFetch = (channels: Channel[]) => setChannels(channels);
    const onChannelCreate = (channel: Channel) => createChannel(channel);

    socket.on("channelsFetch", onChannelsFetch);
    socket.on("channelCreate", onChannelCreate);

    const onMessagesFetch = (messages: Message[]) => setMessages(messages);
    const onMessageCreate = (message: Message) => createMessage(message);

    socket.on("messagesFetch", onMessagesFetch);
    socket.on("messageCreate", onMessageCreate);

    return () => {
      socket.off("usersFetch", onUsersFetch);
      socket.off("userCreate", onUserCreate);

      socket.off("channelsFetch", onChannelsFetch);
      socket.off("channelCreate", onChannelCreate);

      socket.off("messagesFetch", onMessagesFetch);
      socket.off("messageCreate", onMessageCreate);
    };
  }, []);

  if (!activeUserId) {
    return <Auth />;
  }

  return <Chat />;
}

export default App;
