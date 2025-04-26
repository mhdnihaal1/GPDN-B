"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("../router/UserRoute"));
const ThreadRoute_1 = __importDefault(require("../router/ThreadRoute"));
const NewsAndBlogsRoute_1 = __importDefault(require("../router/NewsAndBlogsRoute"));
const AdminRoute_1 = __importDefault(require("../router/AdminRoute"));
const MembersAndPalliativeRoute_1 = __importDefault(require("../router/MembersAndPalliativeRoute"));
const ResourceRoute_1 = __importDefault(require("../router/ResourceRoute"));
dotenv.config();
const app = (0, express_1.default)();
exports.httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    origin: "*", // or specify your frontend origin like "http://localhost:3000"
    // methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
}));
app.get("/server", (req, res) => {
    res.json({ message: "Server is running! 🟢" });
});
app.use("/api/user", UserRoute_1.default);
app.use("/api/thread", ThreadRoute_1.default);
app.use("/api/blog", NewsAndBlogsRoute_1.default);
app.use("/api/palliative", MembersAndPalliativeRoute_1.default);
app.use("/api/resource", ResourceRoute_1.default);
app.use("/api/admin", AdminRoute_1.default);
exports.default = app;
