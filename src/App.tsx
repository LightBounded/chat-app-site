import { useEffect } from "react";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import socket from "./lib/socket";
import { User, useUserStore } from "./stores/users";

function App() {
  const { activeUserId, addUser, setUsers } = useUserStore();

  useEffect(() => {
    const onUsersFetch = (users: User[]) => setUsers(users);
    const onUserCreate = (user: User) => addUser(user);

    socket.emit("fetchUsers");
    socket.on("fetchUsers", onUsersFetch);
    socket.on("userCreate", onUserCreate);

    return () => {
      socket.off("fetchUsers", onUsersFetch);
      socket.off("userCreate", onUserCreate);
    };
  }, []);

  if (!activeUserId) {
    return <Auth />;
  }

  return <Chat />;
}

export default App;
