"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const ThreadController_1 = __importDefault(require("../../ControllerLayer/ThreadController/ThreadController"));
//usecase import
const ThreadUsecase_1 = __importDefault(require("../../UsecaseLayer/ThreadUsecase/ThreadUsecase"));
// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';
//repository import
const ThreadRepository_1 = __importDefault(require("../repository/ThreadRepository/ThreadRepository"));
//services import
const GenerateOtp_1 = __importDefault(require("../services/GenerateOtp"));
const BcryptPassword_1 = __importDefault(require("../services/BcryptPassword"));
const SendEmail_1 = __importDefault(require("../services/SendEmail"));
const AppWriteOtp_1 = require("../services/AppWriteOtp");
const GenerateToken_1 = __importDefault(require("../services/GenerateToken"));
//services
const generateOtp = new GenerateOtp_1.default();
const encryptPassword = new BcryptPassword_1.default();
const sendEmail = new SendEmail_1.default();
const jwtToken = new GenerateToken_1.default();
const appWriteOtp = new AppWriteOtp_1.AppWriteOtp();
//repositories
const threadRepository = new ThreadRepository_1.default();
//useCases
const threadUsecase = new ThreadUsecase_1.default(threadRepository, generateOtp, encryptPassword, jwtToken, appWriteOtp, sendEmail);
//controllers
const threadController = new ThreadController_1.default(threadUsecase);
const route = express_1.default.Router();
//  Creating, editing, deleting forum threads and comments. ----
//  Managing likes, dislikes, shares, upvotes, downvotes.  ----
//  Searching and filtering discussions.   --filter remains
//  Real-time notifications for replies & engagement (WebSockets).  -----doubt  remains
route.get("/FetchThread", (req, res, next) => {
    threadController.FetchThread(req, res, next);
});
route.post("/AddThread", (req, res, next) => {
    threadController.AddThread(req, res, next);
});
route.patch("/EditThread", (req, res, next) => {
    threadController.EditThread(req, res, next);
});
route.post("/DeleteThread", (req, res, next) => {
    threadController.DeleteThread(req, res, next);
});
route.patch("/ThreadUpvote", (req, res, next) => {
    threadController.ThreadUpvote(req, res, next);
});
route.patch("/ThreadDownvote", (req, res, next) => {
    threadController.ThreadDownvote(req, res, next);
});
route.patch("/ThreadShares", (req, res, next) => {
    threadController.ThreadShares(req, res, next);
});
route.get("/ThreadSearch", (req, res, next) => {
    threadController.ThreadSearch(req, res, next);
});
route.get("/ThreadFilter", (req, res, next) => {
    threadController.ThreadFilter(req, res, next);
});
route.post("/AddComment", (req, res, next) => {
    threadController.AddComment(req, res, next);
});
route.patch("/EditComment", (req, res, next) => {
    threadController.EditComment(req, res, next);
});
route.post("/DeleteComment", (req, res, next) => {
    threadController.DeleteComment(req, res, next);
});
route.patch("/CommentLikes", (req, res, next) => {
    threadController.CommentLikes(req, res, next);
});
route.patch("/CommentDislikes", (req, res, next) => {
    threadController.CommentDislikes(req, res, next);
});
route.patch("/Real-time-replies", (req, res, next) => {
    threadController.RealTimeReplies(req, res, next);
});
// route.use(errorHandle);
exports.default = route;
