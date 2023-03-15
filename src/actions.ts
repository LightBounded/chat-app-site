import socket from "./lib/socket";

const getRoute = (suffix: string) => `http://localhost:3000/${suffix}`;

export const logIn = (userId: string) => {
  socket.emit("logIn", userId);
  window.localStorage.setItem("activeUserId", userId);
};

// TODO: Implement
export const logOut = (userId: string) => {};

export const createUser = (username: string) => {
  socket.emit("userCreate", username);
};
