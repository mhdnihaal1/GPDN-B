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
exports.AppWriteOtp = exports.account = void 0;
const node_appwrite_1 = require("node-appwrite");
const client = new node_appwrite_1.Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67d6d15500070be0d761");
exports.account = new node_appwrite_1.Account(client);
class AppWriteOtp {
    sendOTP(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield exports.account.createPhoneToken(node_appwrite_1.ID.unique(), phoneNumber);
                console.log("OTP sent successfully!", session);
                // console.log(session.secret)
                return session === null || session === void 0 ? void 0 : session.userId;
            }
            catch (error) {
                console.error("Error sending OTP:", error);
                throw error;
            }
        });
    }
}
exports.AppWriteOtp = AppWriteOtp;
