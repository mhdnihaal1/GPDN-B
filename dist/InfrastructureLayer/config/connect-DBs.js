"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { DB_NAME } from "./constant";
const connectDB = async () => {
    try {
        // const  mongo_uri =
        //        process.env.MONGODB_URI;
        if (process.env.MONGODB_URI) {
            await mongoose_1.default.connect(process.env.MONGODB_URI);
        }
    }
    catch (error) {
        const err = error;
        console.log("Error connecting to MongoDB", err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
