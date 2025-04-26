import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import app from "./InfrastructureLayer/config/app";
import { connectDB } from "./InfrastructureLayer/config/connect-DBs";

// This will hold the socket instance globally (to prevent reinitializing)
let io: SocketIOServer | null = null;

export default async function handler(req: any, res: any) {
  if (!io) {
    const server = new HttpServer(app);

    io = new SocketIOServer(server, {
      cors: {
        origin: process.env.CORS_URL,
      },
    });

    app.set("io", io);

    await connectDB();

    io.on("connection", (socket) => {
      console.log("New user connected");

      socket.on("message", (message) => {
        console.log(message);
        io?.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  res.end("Socket server is ready");
}
