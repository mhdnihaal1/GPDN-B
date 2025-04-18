"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = __importDefault(require("../../database/UserSchema"));
const OtpSchema_1 = __importDefault(require("../../database/OtpSchema"));
class UserRepository {
    async findByEmail(email) {
        try {
            const User = await UserSchema_1.default.findOne({ email: email });
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
    }
    async AddUser(addNewUser) {
        try {
            const newUser = new UserSchema_1.default(addNewUser);
            const savedUser = await newUser.save();
            return savedUser.toObject();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async AddOtp(email, otp) {
        try {
            const newOtp = new OtpSchema_1.default({
                email,
                otp,
                otpGeneratedAt: new Date(),
            });
            const savedOtp = await newOtp.save();
            return savedOtp.toObject();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async updateUser(update) {
        try {
            const updatedUser = await UserSchema_1.default.findByIdAndUpdate(update._id, update, { new: true });
            return updatedUser;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async resetORforgotPassword(_id, password) {
        try {
            const resetORforgotPassword = await UserSchema_1.default.findByIdAndUpdate(_id, { $set: { password } }, { new: true });
            return resetORforgotPassword;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findUserOtp(email) {
        try {
            const UserOtp = await OtpSchema_1.default.findOne({ email: email });
            return UserOtp;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteUserOtp(email) {
        try {
            const deletedUser = await OtpSchema_1.default.deleteOne({ email: email });
            return deletedUser;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findUserByNumber(phoneNumber) {
        try {
            const user = await UserSchema_1.default.findOne({ phoneNumber: phoneNumber });
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = UserRepository;
