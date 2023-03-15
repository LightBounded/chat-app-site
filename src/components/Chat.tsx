import { useState } from "react";
import { logOut } from "../actions";
import { useUserStore } from "../stores/users";

export default function Chat() {
  const activeUserId = useUserStore((state) => state.activeUserId);
  const users = useUserStore((state) => state.users);

  const [messageText, setMessageText] = useState("");

  return (
    <>
      <button onClick={() => logOut(activeUserId!)}>Log Out</button>
      <div>Users:</div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.isOnline && "*"}
            {u.username}
          </li>
        ))}
      </ul>

      <input
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        type="text"
      />

      <div>Messages:</div>
      <ul>
        <li></li>
      </ul>
    </>
  );
}
