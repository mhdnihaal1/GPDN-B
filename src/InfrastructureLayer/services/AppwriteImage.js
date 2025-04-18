"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_appwrite_1 = require("node-appwrite");
const client = new node_appwrite_1.Client();
if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
    throw new Error("Missing Appwrite environment configuration");
}
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);
const storage = new node_appwrite_1.Storage(client);
exports.default = storage;
