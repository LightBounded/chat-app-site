import { useEffect } from "react";
import { logIn } from "./actions";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import socket from "./lib/socket";
import { User, useUserStore } from "./stores/users";

function App() {
  const [activeUserId, setActiveUserId, addUser, setUsers] = useUserStore(
    (state) => [
      state.activeUserId,
      state.setActiveUserId,
      state.addUser,
      state.setUsers,
    ]
  );

  useEffect(() => {
    socket.connect();

    const storedUserId = window.localStorage.getItem("activeUserId");
    if (storedUserId !== null && storedUserId !== "") logIn(storedUserId);

    socket.emit("usersFetch");

    const onUsersFetch = (users: User[]) => setUsers(users);
    const onUserCreate = (user: User) => addUser(user);

    socket.on("usersFetch", onUsersFetch);
    socket.on("userCreate", onUserCreate);

    return () => {
      socket.off("usersFetch", onUsersFetch);
      socket.off("userCreate", onUserCreate); 
      socket.disconnect();
    };
  }, []);

  if (!activeUserId) {
    return <Auth />;
  }

  return <Chat />;
}

export default App;
