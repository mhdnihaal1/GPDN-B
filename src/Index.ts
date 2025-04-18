import app, { httpServer } from "./InfrastructureLayer/config/app";
import { connectDB } from "./InfrastructureLayer/config/connect-DBs";
import { Server as SocketIOServer } from "socket.io";

const PORT = process.env.MYPORT || 3000;

const startServer = async (): Promise<void> => {
  await connectDB();
  const server = httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

 
  
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CORS_URL,
    },
  });
  app.set("io", io);
  
  
  io.on("connection" , (socket) => {
     console.log("New user connected")
  
     socket.on("message" , (message) => {
      console.log(message)
      io.emit("message" , message)
     })
  
     socket.on("disconnect" , () => {
      console.log("User disconnected")
     })
  })
};

startServer();
  