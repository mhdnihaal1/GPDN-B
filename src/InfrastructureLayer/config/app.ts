import * as dotenv from 'dotenv';
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import {createServer} from "http";
 import cors from "cors";
import UserRoute from "../router/UserRoute";
import ThreadRoute from "../router/ThreadRoute";
import blogRoute from "../router/NewsAndBlogsRoute";
import adminRoute from "../router/AdminRoute";
import palliativeRoute from "../router/MembersAndPalliativeRoute";
import resourceRoute from "../router/ResourceRoute";


dotenv.config();


const app = express();

export const httpServer = createServer(app);

app.use(cors({
  origin: "*", // or specify your frontend origin like "http://localhost:3000"
  // methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
 }));




app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/hello", (req, res) => {
  res.json({ message: "Server is runnings! 🟢" }); 
});

app.get("/server", (req, res) => {
  res.json({ message: "Server is running! 🟢" }); 
});

app.use("/api/user", UserRoute);
app.use("/api/thread", ThreadRoute);
app.use("/api/blog", blogRoute);
app.use("/api/palliative", palliativeRoute);
app.use("/api/resource", resourceRoute);
app.use("/api/admin", adminRoute);

export default app;
