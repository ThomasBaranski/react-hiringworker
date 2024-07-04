import WebSocket from "websocket";
let instance2;
const socketURL = process.env.REACT_APP_SOCKET_URL;

export const WebSocketNotification = (access_token) => {
  const headers = {
    ["Authorization"]: `${access_token}`,
  };
  if (!instance2) {
    instance2 = new WebSocket.client(
      `wss://${socketURL}/ws/notification/?Authorization=${access_token}`
    );
    console.log(
      "🚀 ~ file: SocketNotification.js:10 ~ WebSocketNotification ~ instance2:",
      instance2
    );
    instance2.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    return instance2;
  } else {
    if (instance2.readyState !== 1) {
      instance2 = new WebSocket.client(
        `wss://${socketURL}/ws/notification/?Authorization=${access_token}`
      );
      console.log(
        "🚀 ~ file: SocketNotification.js:20 ~ WebSocketNotification ~ instance2:",
        instance2
      );
      // Handle WebSocket errors
      instance2.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      return instance2;
    } else {
      return instance2;
    }
  }
};
