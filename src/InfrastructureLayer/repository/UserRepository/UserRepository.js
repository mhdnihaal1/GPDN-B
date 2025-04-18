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
const UserSchema_1 = __importDefault(require("../../database/UserSchema"));
const OtpSchema_1 = __importDefault(require("../../database/OtpSchema"));
class UserRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield UserSchema_1.default.findOne({ email: email });
                return {
                    success: false,
                    status: 409,
                    data: User,
                };
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    AddUser(addNewUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new UserSchema_1.default(addNewUser);
                const savedUser = yield newUser.save();
                return savedUser.toObject();
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    AddOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOtp = new OtpSchema_1.default({
                    email,
                    otp,
                    otpGeneratedAt: new Date(),
                });
                const savedOtp = yield newOtp.save();
                return savedOtp.toObject();
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    updateUser(update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield UserSchema_1.default.findByIdAndUpdate(update._id, update, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    resetORforgotPassword(_id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resetORforgotPassword = yield UserSchema_1.default.findByIdAndUpdate(_id, { $set: { password } }, { new: true });
                return resetORforgotPassword;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    findUserOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UserOtp = yield OtpSchema_1.default.findOne({ email: email });
                return UserOtp;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    deleteUserOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield OtpSchema_1.default.deleteOne({ email: email });
                return deletedUser;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    findUserByNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserSchema_1.default.findOne({ phoneNumber: phoneNumber });
                return user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserRepository;
