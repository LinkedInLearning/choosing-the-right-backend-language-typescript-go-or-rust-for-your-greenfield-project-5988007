const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server");
  // Send a message to the server once connected
  socket.send("Hello, server!");
});

socket.addEventListener("message", (event: MessageEvent) => {
  console.log("Message from server:", event.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from WebSocket server");
});

socket.addEventListener("error", (event: Event) => {
  console.error("WebSocket error:", event);
});

// Optional: Send a message every 5 seconds to the server
setInterval(() => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send("Ping from client");
  }
}, 5000);
