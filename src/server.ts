import { Server as ServerIO } from "socket.io";
import { connectDB } from "./InfrastructureLayer/config/connect-DBs"; // adjust your path

let io: ServerIO | null = null;

export default async function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    await connectDB();

    const ioInstance = new ServerIO(res.socket.server, {
      path: "/api/socket/io",
      cors: {
        origin: process.env.CORS_URL,
        methods: ["GET", "POST"],
      },
    });

    res.socket.server.io = ioInstance;

    ioInstance.on("connection", (socket) => {
      console.log("New user connected");

      socket.on("message", (message) => {
        console.log("Received message:", message);
        ioInstance.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  res.end();
}
