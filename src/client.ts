const socket = new WebSocket(":8080")

socket.addEventListener("open",()=>{
  console.log("Connected to the WebSocket Server!");
  socket.send("Hello server!")
})

socket.addEventListener("message",(event: MessageEvent)=>{
  console.log("Message from server: ", event.data);
})

socket.addEventListener("close",()=>{
  console.log("Disconnected from WebSocket server!")
})

socket.addEventListener("error",(event:Event)=>{
  console.error("websocket error: ",event);
})

setInterval(()=>{
  if (socket.readyState === WebSocket.OPEN){
    socket.send("Ping from client!");
  }
}, 5000);