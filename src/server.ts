import { WebSocketServer } from "ws";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

// Create an HTTP server to serve static files
const server = http.createServer((req, res) => {
  // Serve the HTML file when the root URL is accessed
  if (req.url === "/" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/client.js" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "client.js"), "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(data);
    });
  } else {
    // Handle other requests (you can add more static files here, if necessary)
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Create the WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: Buffer) => {
    console.log("Received:", message.toString());

    // Echo the message back to the client
    ws.send(`Echo: ${message.toString()}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`WebSocket server running on ws://localhost:${port}`);
  console.log(`HTTP server serving HTML on http://localhost:${port}`);
});
