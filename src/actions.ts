import socket from "./lib/socket";
import { useUserStore } from "./stores/users";

export const logIn = (userId: string) => {
  socket.emit("logIn", userId);
  useUserStore.setState({ activeUserId: userId });
  window.localStorage.setItem("activeUserId", userId);
};

export const logOut = (userId: string) => {
  socket.emit("logOut", userId);
  useUserStore.setState({ activeUserId: null });
  window.localStorage.removeItem("activeUserId");
};
