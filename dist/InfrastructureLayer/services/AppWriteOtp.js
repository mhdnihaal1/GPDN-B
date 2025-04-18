"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppWriteOtp = exports.account = void 0;
const node_appwrite_1 = require("node-appwrite");
const client = new node_appwrite_1.Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67d6d15500070be0d761");
exports.account = new node_appwrite_1.Account(client);
class AppWriteOtp {
    async sendOTP(phoneNumber) {
        try {
            const session = await exports.account.createPhoneToken(node_appwrite_1.ID.unique(), phoneNumber);
            console.log("OTP sent successfully!", session);
            // console.log(session.secret)
            return session?.userId;
        }
        catch (error) {
            console.error("Error sending OTP:", error);
            throw error;
        }
    }
}
exports.AppWriteOtp = AppWriteOtp;
