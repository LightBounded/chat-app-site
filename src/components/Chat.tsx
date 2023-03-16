import { FormEvent, useMemo, useState } from "react";
import { logOut } from "../actions";
import socket from "../lib/socket";
import { useChannelStore } from "../stores/channels";
import { useMessageStore } from "../stores/messages";
import { useUserStore } from "../stores/users";

function ChannelCreator() {
  const [channelName, setChannelName] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!channelName) return;
    socket.emit("channelCreate", channelName);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        type="text"
      />
    </form>
  );
}

function ChannelList() {
  const channels = useChannelStore((state) => state.channels);
  const setActiveChannelId = useChannelStore(
    (state) => state.setActiveChannelId
  );

  return (
    <>
      <div>Channels:</div>
      <ul>
        {channels.map((c) => (
          <li key={c.id}>
            <button onClick={() => setActiveChannelId(c.id)}>{c.name}</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function UsersList() {
  const users = useUserStore((state) => state.users);

  return (
    <>
      <div>Users:</div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.isOnline && "*"}
            {u.username}
          </li>
        ))}
      </ul>
    </>
  );
}

function MessageCreator() {
  const activeUserId = useUserStore((state) => state.activeUserId);
  const activeChannelId = useChannelStore((state) => state.activeChannelId);

  const [messageText, setMessageText] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageText) return;
    socket.emit("messageCreate", {
      messageText,
      channelId: activeChannelId,
      userId: activeUserId,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        type="text"
      />
    </form>
  );
}

function MessagesList() {
  const activeChannelId = useChannelStore((state) => state.activeChannelId);

  const messages = useMessageStore((state) => state.messages);
  const messagesForActiveChannel = useMemo(() => {
    return messages.filter((m) => m.channelId === activeChannelId);
  }, [messages, activeChannelId]);

  return (
    <>
      <div>Messages:</div>
      <ul>
        {messagesForActiveChannel.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </>
  );
}

function ActiveChannel() {
  const activeChannelId = useChannelStore((state) => state.activeChannelId);

  if (!activeChannelId) {
    return <div>No channel selected :(</div>;
  }

  return (
    <>
      <MessageCreator />
      <MessagesList />
    </>
  );
}

export default function Chat() {
  const activeUserId = useUserStore((state) => state.activeUserId);

  return (
    <>
      <button onClick={() => logOut(activeUserId!)}>Log Out</button>
      <UsersList />
      <ChannelCreator />
      <ChannelList />
      <ActiveChannel />
    </>
  );
}
