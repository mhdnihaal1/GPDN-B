"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const AdminController_1 = __importDefault(require("../../ControllerLayer/AdminController/AdminController"));
//usecase import
const AdminUsecase_1 = __importDefault(require("../../UsecaseLayer/AdminUsecase/AdminUsecase"));
// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';
//repository import
const AdminRepository_1 = __importDefault(require("../repository/AdminRepository/AdminRepository"));
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
const adminRepository = new AdminRepository_1.default();
//useCases
const adminUsecase = new AdminUsecase_1.default(adminRepository, generateOtp, encryptPassword, jwtToken, appWriteOtp, generateEmail);
//controllers
const adminController = new AdminController_1.default(adminUsecase);
const route = express_1.default.Router();
// User Management: Manage users, roles, and permissions. 
// Forum Moderation: Approve, edit, or delete discussions. 
// Content Moderation: Approve/decline blogs and resources. 
// Palliative Care Units Management: Add, edit, remove listings. 
// Analytics Dashboard: Provide user activity insights and KPIs. 
// ------------------ User Management
route.post("/adminInvitationToUser", (req, res, next) => {
    adminController.adminInvitationToUser(req, res, next);
});
route.post("/approveORdeclineUser", (req, res, next) => {
    adminController.approveORdeclineUser(req, res, next);
});
route.post("/createUser", (req, res, next) => {
    adminController.createUser(req, res, next);
});
route.patch("/updateUser", (req, res, next) => {
    adminController.updateUser(req, res, next);
});
route.post("/deleteUser", (req, res, next) => {
    adminController.deleteUser(req, res, next);
});
route.get("/fetchUser", (req, res, next) => {
    adminController.fetchUser(req, res, next);
});
//------------------------Forum Moderation
route.get("/fetchThreads", (req, res, next) => {
    adminController.fetchThreads(req, res, next);
});
route.post("/approveORdeclineThreads", (req, res, next) => {
    adminController.approveORdeclineThreads(req, res, next);
});
route.patch("/editThreads", (req, res, next) => {
    adminController.editThreads(req, res, next);
});
route.post("/deleteThreadComment", (req, res, next) => {
    adminController.deleteThreadComment(req, res, next);
});
route.post("/deleteThreads", (req, res, next) => {
    adminController.deleteThreads(req, res, next);
});
//-----------------------------  Content Moderation
route.get("/fetchResource", (req, res, next) => {
    adminController.fetchResource(req, res, next);
});
route.post("/approveORdeclineResource", (req, res, next) => {
    adminController.approveORdeclineResource(req, res, next);
});
//----------------------------       News and Blogs
route.get("/fetchBlogs", (req, res, next) => {
    adminController.fetchBlogs(req, res, next);
});
route.post("/addNewsAndBlogs", (req, res, next) => {
    adminController.addNewsAndBlogs(req, res, next);
});
route.patch("/editNewsAndBlogs", (req, res, next) => {
    adminController.editNewsAndBlogs(req, res, next);
});
route.post("/deleteNewsAndBlogs", (req, res, next) => {
    adminController.deleteNewsAndBlogs(req, res, next);
});
route.patch("/approveORdeclineBlogs", (req, res, next) => {
    adminController.approveORdeclineBlogs(req, res, next);
});
//----------------------------       Category
route.get("/fetchCategory", (req, res, next) => {
    adminController.fetchCategory(req, res, next);
});
route.post("/addCategory", (req, res, next) => {
    adminController.addCategory(req, res, next);
});
route.patch("/editCategory", (req, res, next) => {
    adminController.editCategory(req, res, next);
});
route.post("/deleteCategory", (req, res, next) => {
    adminController.deleteCategory(req, res, next);
});
//----------------------------Palliative Care Units Management
route.get("/fetchPalliative", (req, res, next) => {
    adminController.fetchPalliative(req, res, next);
});
route.post("/addPalliative", (req, res, next) => {
    adminController.addPalliative(req, res, next);
});
route.patch("/editPalliative", (req, res, next) => {
    adminController.editPalliative(req, res, next);
});
route.post("/removePalliative", (req, res, next) => {
    adminController.removePalliative(req, res, next);
});
//-------------------------  Analytics Dashboard
//-------User By Time
route.get("/fetchLastDayUserRegistration", (req, res, next) => {
    adminController.fetchLastDayUserRegistration(req, res, next);
});
route.get("/fetchLastWeekUserRegistration", (req, res, next) => {
    adminController.fetchLastWeekUserRegistration(req, res, next);
});
route.get("/fetchLastMonthUserRegistration", (req, res, next) => {
    adminController.fetchLastMonthUserRegistration(req, res, next);
});
//-------Resource By Time
route.get("/fetchLastDayResource", (req, res, next) => {
    adminController.fetchLastDayResource(req, res, next);
});
route.get("/fetchLastWeekResource", (req, res, next) => {
    adminController.fetchLastWeekResource(req, res, next);
});
route.get("/fetchLastMonthResource", (req, res, next) => {
    adminController.fetchLastMonthResource(req, res, next);
});
//-------Blog By Time
route.get("/fetchLastDayNewsAndBlogs", (req, res, next) => {
    adminController.fetchLastDayNewsAndBlogs(req, res, next);
});
route.get("/fetchLastWeekNewsAndBlogs", (req, res, next) => {
    adminController.fetchLastWeekNewsAndBlogs(req, res, next);
});
route.get("/fetchLastMonthNewsAndBlogs", (req, res, next) => {
    adminController.fetchLastMonthNewsAndBlogs(req, res, next);
});
//-------thread By Time
route.get("/fetchLastDayThread", (req, res, next) => {
    adminController.fetchLastDayThread(req, res, next);
});
route.get("/fetchLastWeekThread", (req, res, next) => {
    adminController.fetchLastWeekThread(req, res, next);
});
route.get("/fetchLastMonthThread", (req, res, next) => {
    adminController.fetchLastMonthThread(req, res, next);
});
// -------------------
route.get("/fetchTotalUsers", (req, res, next) => {
    adminController.fetchTotalUsers(req, res, next);
});
route.get("/fetchTotalThreads", (req, res, next) => {
    adminController.fetchTotalThreads(req, res, next);
});
route.get("/fetchTotalResources", (req, res, next) => {
    adminController.fetchTotalResources(req, res, next);
});
route.get("/fetchTotalNewsAndBlogs", (req, res, next) => {
    adminController.fetchTotalNewsAndBlogs(req, res, next);
});
route.get("/fetchTopLikedThreads", (req, res, next) => {
    adminController.fetchTopLikedThreads(req, res, next);
});
route.get("/fetchTopLikedResources", (req, res, next) => {
    adminController.fetchTopLikedResources(req, res, next);
});
route.get("/fetchTopLikedNewsAndBlogs", (req, res, next) => {
    adminController.fetchTopLikedNewsAndBlogs(req, res, next);
});
// route.use(errorHandle);
exports.default = route;
