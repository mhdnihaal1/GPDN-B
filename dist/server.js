"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const socket_io_1 = require("socket.io");
const connect_DBs_1 = require("./InfrastructureLayer/config/connect-DBs"); // adjust your path
let io = null;
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!res.socket.server.io) {
            yield (0, connect_DBs_1.connectDB)();
            const ioInstance = new socket_io_1.Server(res.socket.server, {
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
    });
}
