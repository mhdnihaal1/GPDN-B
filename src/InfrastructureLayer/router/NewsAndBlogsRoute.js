"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const NewsAndBlogsController_1 = __importDefault(require("../../ControllerLayer/NewsAndBlogsController/NewsAndBlogsController"));
//usecase import
const NewsAndBlogsUsecase_1 = __importDefault(require("../../UsecaseLayer/NewsAndBlogsUsecase/NewsAndBlogsUsecase"));
// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';
//repository import
const NewsAndBlogsRepository_1 = __importDefault(require("../repository/NewsAndBlogsRepository/NewsAndBlogsRepository"));
//services import
const GenerateOtp_1 = __importDefault(require("../services/GenerateOtp"));
const BcryptPassword_1 = __importDefault(require("../services/BcryptPassword"));
const SendEmail_1 = __importDefault(require("../services/SendEmail"));
const AppWriteOtp_1 = require("../services/AppWriteOtp");
const GenerateToken_1 = __importDefault(require("../services/GenerateToken"));
//services
const generateOtp = new GenerateOtp_1.default();
const encryptPassword = new BcryptPassword_1.default();
const generateEmail = new SendEmail_1.default();
const jwtToken = new GenerateToken_1.default();
const appWriteOtp = new AppWriteOtp_1.AppWriteOtp();
//repositories
const newsAndBlogsRepository = new NewsAndBlogsRepository_1.default();
//useCases
const newsAndBlogsUsecase = new NewsAndBlogsUsecase_1.default(newsAndBlogsRepository, generateOtp, encryptPassword, jwtToken, appWriteOtp, generateEmail);
//controllers
const newsAndblogsController = new NewsAndBlogsController_1.default(newsAndBlogsUsecase);
const route = express_1.default.Router();
route.get("/FetchNewsAndBlogs", (req, res, next) => {
    newsAndblogsController.FetchNewsAndBlogs(req, res, next);
});
route.get("/FetchNewsAndBlogsById", (req, res, next) => {
    newsAndblogsController.FetchNewsAndBlogsById(req, res, next);
});
route.post("/AddNewsAndBlogs", (req, res, next) => {
    newsAndblogsController.AddNewsAndBlogs(req, res, next);
});
route.patch("/EditNewsAndBlogs", (req, res, next) => {
    newsAndblogsController.EditNewsAndBlogs(req, res, next);
});
route.post("/DeleteNewsAndBlogs", (req, res, next) => {
    newsAndblogsController.DeleteNewsAndBlogs(req, res, next);
});
route.post("/SearchNewsAndBlogs", (req, res, next) => {
    newsAndblogsController.SearchNewsAndBlogs(req, res, next);
});
route.post("/filterNewsAndBlogs", (req, res, next) => {
    newsAndblogsController.filterNewsAndBlogs(req, res, next);
});
route.patch("/NewsAndBlogsLike", (req, res, next) => {
    newsAndblogsController.NewsAndBlogsLike(req, res, next);
});
route.patch("/NewsAndBlogsDislike", (req, res, next) => {
    newsAndblogsController.NewsAndBlogsDislike(req, res, next);
});
// route.use(errorHandle);
exports.default = route;
