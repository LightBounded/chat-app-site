import socket from "./lib/socket";
import { useUserStore } from "./stores/users";

const getRoute = (suffix: string) => `http://localhost:3000/${suffix}`;

export const logIn = (userId: string) => {
  socket.emit("logIn", userId);
  useUserStore.setState({ activeUserId: userId });
  window.localStorage.setItem("activeUserId", userId);
};

// TODO: Implement
export const logOut = (userId: string) => {
  socket.emit("logOut", userId);
  useUserStore.setState({ activeUserId: null });
  window.localStorage.removeItem("activeUserId");
};

export const createUser = (username: string) => {
  socket.emit("userCreate", username);
};
