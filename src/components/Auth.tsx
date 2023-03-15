import { FormEvent, useState } from "react";
import { createUser, logIn } from "../actions";
import { useUserStore } from "../stores/users";

function UserCreator() {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  const [users, setActiveUserId] = useUserStore((state) => [
    state.users,
    state.setActiveUserId,
  ]);

  return (
    <select
      onChange={(e) => {
        logIn(e.target.value);
        setActiveUserId(e.target.value);
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
