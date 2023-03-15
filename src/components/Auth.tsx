import { useState } from "react";
import socket from "../lib/socket";
import { useUserStore } from "../stores/users";
import { getRoute } from "../utils/get-route";

function UserCreator() {
  const [name, setName] = useState("");

  const createUser = (name: string) => {
    fetch(getRoute("/users"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    socket.emit("");
  };

  const handleSubmit = () => {
    if (!name) return;
    createUser(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter a username"
      />
    </form>
  );
}

function UserSelector() {
  const { users } = useUserStore();

  return (
    <select name="" id="">
      {users.map((u) => (
        <option key={u.id}>{u.username}</option>
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
