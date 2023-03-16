import { FormEvent, useState } from "react";
import { logIn } from "../actions";
import socket from "../lib/socket";
import { useUserStore } from "../stores/users";

function UserCreator() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    socket.emit("userCreate", username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter a username"
      />
    </form>
  );
}

function UserSelector() {
  const users = useUserStore((state) => state.users);

  return (
    <select
      onChange={(e) => {
        logIn(e.target.value);
      }}
    >
      <option>Pick a user</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.username}
        </option>
      ))}
    </select>
  );
}

export default function Auth() {
  return (
    <>
      <UserCreator />
      <UserSelector />
    </>
  );
}
