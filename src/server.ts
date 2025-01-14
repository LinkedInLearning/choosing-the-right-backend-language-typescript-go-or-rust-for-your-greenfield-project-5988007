import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { WebSocketServer } from "ws";

const server = http.createServer((req, res) =>{
  if (req.url === "/" && req.method == "GET"){
    fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, data)=>{
      if (err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200,{"Content-Type": "text/html"})
      res.end(data);
    })
  } else if (req.url === "/client.js" && req.method === "GET"){
      fs.readFile(path.join(__dirname,"client.js"),"utf-8",(err, data)=>{
        if (err){
          res.writeHead(500, {"Content-Type": "text/plain"})
          res.end("Internal Server Error")
          return;
        }
        res.writeHead(200,{"Content-Type":"text/javascript"})
        res.end(data);
      })
  }
})
const wss = new WebSocketServer({server });
wss.on("connection",(ws)=>{
  console.log("Client connected!");

  ws.on("message",(message: Buffer)=>{
    console.log("Received: ", message.toString())
    
    ws.send(`Echo: ${message.toString()}`);
  })

  ws.on("close", ()=>{
    console.log("Client disconnected");
  })
  ws.on("error",(error:any)=>{
    console.error("WebSocket error:", error);
  })

})

const port = 8080;
server.listen(port,()=>{
  console.log(`HTTP server serving on http://localhost:${port}`)
  console.log(`WebSocket server running on ws://localhost:${port}`)
})