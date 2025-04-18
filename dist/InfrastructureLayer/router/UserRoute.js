"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../../ControllerLayer/UserController/UserController"));
const UserUsecase_1 = __importDefault(require("../../UsecaseLayer/UserUsecase/UserUsecase"));
// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';
const UserRepository_1 = __importDefault(require("../repository/UserRepository/UserRepository"));
const GenerateOtp_1 = __importDefault(require("../services/GenerateOtp"));
const BcryptPassword_1 = __importDefault(require("../services/BcryptPassword"));
const SendEmail_1 = __importDefault(require("../services/SendEmail"));
const AppWriteOtp_1 = require("../services/AppWriteOtp");
const GenerateToken_1 = __importDefault(require("../services/GenerateToken"));
const generateOtp = new GenerateOtp_1.default();
const encryptPassword = new BcryptPassword_1.default();
const sendEmail = new SendEmail_1.default();
const jwtToken = new GenerateToken_1.default();
const appWriteOtp = new AppWriteOtp_1.AppWriteOtp();
const userRepository = new UserRepository_1.default();
const userUsecase = new UserUsecase_1.default(userRepository, generateOtp, encryptPassword, jwtToken, appWriteOtp, sendEmail);
const userController = new UserController_1.default(userUsecase);
const route = express_1.default.Router();
//  Register, Login, Logout, Password Reset.
route.post("/Register", (req, res, next) => {
    userController.Register(req, res, next);
});
// route.post("/Login", (req, res, next) => {
//     userController.Login(req, res, next);
//   });
//   route.post("/Verify", (req, res, next) => {
//     userController.Verify(req, res, next);
//   });
//   route.post("/Logout", (req, res, next) => {
//     userController.Logout(req, res, next);
//   });
route.post("/EditUser", (req, res, next) => {
    userController.EditUser(req, res, next);
});
route.post("/ResetORForgotPassword", (req, res, next) => {
    userController.ResetORForgotPassword(req, res, next);
});
route.post("/VerifyOtp", (req, res, next) => {
    userController.VerifyOtp(req, res, next);
});
route.post("/userContactDetails", (req, res, next) => {
    userController.ContactEmail(req, res, next);
});
// route.use(errorHandle);
exports.default = route;
