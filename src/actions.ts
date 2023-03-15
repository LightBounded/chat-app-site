import socket from "./lib/socket";

const getRoute = (suffix: string) => `http://localhost:3000/${suffix}`;

export const logIn = (userId: string) => {
  fetch(getRoute("/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  // TODO: Check if user is already logged in before setting item in local storage
  window.localStorage.setItem("activeUserId", userId);
};

// TODO: Implement
export const logOut = (userId: string) => {};

export const createUser = (username: string) => {
  socket.emit("userCreate", username);
};
