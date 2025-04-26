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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app_1 = __importDefault(require("./InfrastructureLayer/config/app"));
const connect_DBs_1 = require("./InfrastructureLayer/config/connect-DBs");
// This will hold the socket instance globally (to prevent reinitializing)
let io = null;
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!io) {
            const server = new http_1.Server(app_1.default);
            io = new socket_io_1.Server(server, {
                cors: {
                    origin: process.env.CORS_URL,
                },
            });
            app_1.default.set("io", io);
            yield (0, connect_DBs_1.connectDB)();
            io.on("connection", (socket) => {
                console.log("New user connected");
                socket.on("message", (message) => {
                    console.log(message);
                    io === null || io === void 0 ? void 0 : io.emit("message", message);
                });
                socket.on("disconnect", () => {
                    console.log("User disconnected");
                });
            });
        }
        res.end("Socket server is ready");
    });
}
