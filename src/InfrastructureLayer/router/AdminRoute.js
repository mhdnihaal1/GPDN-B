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
route.post("adminInvitation", (req, res, next) => {
    adminController.adminInvitation(req, res, next);
});
route.post("/createUser", (req, res, next) => {
    adminController.createUser(req, res, next);
});
route.post("/updateUser", (req, res, next) => {
    adminController.updateUser(req, res, next);
});
route.post("/deleteUser", (req, res, next) => {
    adminController.deleteUser(req, res, next);
});
route.post("/fetchUser", (req, res, next) => {
    adminController.fetchUser(req, res, next);
});
//------------------------Forum Moderation
route.post("/fetchThreads", (req, res, next) => {
    adminController.fetchThreads(req, res, next);
});
route.post("/approveORdeclineThreads", (req, res, next) => {
    adminController.approveORdeclineThreads(req, res, next);
});
route.post("/editThreads", (req, res, next) => {
    adminController.editThreads(req, res, next);
});
route.post("/deleteThreadComment", (req, res, next) => {
    adminController.deleteThreadComment(req, res, next);
});
route.post("/deleteThreads", (req, res, next) => {
    adminController.deleteThreads(req, res, next);
});
//-----------------------------  Content Moderation
route.post("/fetchResource", (req, res, next) => {
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
route.post("/fetchPalliative", (req, res, next) => {
    adminController.fetchPalliative(req, res, next);
});
route.post("/addPalliative", (req, res, next) => {
    adminController.addPalliative(req, res, next);
});
route.post("/editPalliative", (req, res, next) => {
    adminController.editPalliative(req, res, next);
});
route.post("/removePalliative", (req, res, next) => {
    adminController.removePalliative(req, res, next);
});
//-------------------------  Analytics Dashboard
//-------User By Time
route.post("/fetchLastDayUserRegistration", (req, res, next) => {
    adminController.fetchLastDayUserRegistration(req, res, next);
});
route.post("/fetchLastWeekUserRegistration", (req, res, next) => {
    adminController.fetchLastWeekUserRegistration(req, res, next);
});
route.post("/fetchLastMonthUserRegistration", (req, res, next) => {
    adminController.fetchLastMonthUserRegistration(req, res, next);
});
//-------Resource By Time
route.post("/fetchLastDayResource", (req, res, next) => {
    adminController.fetchLastDayResource(req, res, next);
});
route.post("/fetchLastWeekResource", (req, res, next) => {
    adminController.fetchLastWeekResource(req, res, next);
});
route.post("/fetchLastMonthResource", (req, res, next) => {
    adminController.fetchLastMonthResource(req, res, next);
});
//-------Blog By Time
route.post("/fetchLastDayNewsAndBlogs", (req, res, next) => {
    adminController.fetchLastDayNewsAndBlogs(req, res, next);
});
route.post("/fetchLastWeekNewsAndBlogs", (req, res, next) => {
    adminController.fetchLastWeekNewsAndBlogs(req, res, next);
});
route.post("/fetchLastMonthNewsAndBlogs", (req, res, next) => {
    adminController.fetchLastMonthNewsAndBlogs(req, res, next);
});
//-------thread By Time
route.post("/fetchLastDayThread", (req, res, next) => {
    adminController.fetchLastDayThread(req, res, next);
});
route.post("/fetchLastWeekThread", (req, res, next) => {
    adminController.fetchLastWeekThread(req, res, next);
});
route.post("/fetchLastMonthThread", (req, res, next) => {
    adminController.fetchLastMonthThread(req, res, next);
});
// -------------------
route.post("/fetchTotalUsers", (req, res, next) => {
    adminController.fetchTotalUsers(req, res, next);
});
route.post("/fetchTotalThreads", (req, res, next) => {
    adminController.fetchTotalThreads(req, res, next);
});
route.post("/fetchTotalResources", (req, res, next) => {
    adminController.fetchTotalResources(req, res, next);
});
route.post("/fetchTotalNewsAndBlogs", (req, res, next) => {
    adminController.fetchTotalNewsAndBlogs(req, res, next);
});
route.post("/fetchTopLikedThreads", (req, res, next) => {
    adminController.fetchTopLikedThreads(req, res, next);
});
route.post("/fetchTopLikedResources", (req, res, next) => {
    adminController.fetchTopLikedResources(req, res, next);
});
route.post("/fetchTopLikedNewsAndBlogs", (req, res, next) => {
    adminController.fetchTopLikedNewsAndBlogs(req, res, next);
});
// route.use(errorHandle);
exports.default = route;
