"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const ResourceController_1 = __importDefault(require("../../ControllerLayer/ResourceController/ResourceController"));
//usecase import
const ResourceUsecase_1 = __importDefault(require("../../UsecaseLayer/ResourceUsecase/ResourceUsecase"));
// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';  
//repository import
const ResourceRepository_1 = __importDefault(require("../repository/ResourceRepository/ResourceRepository"));
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
const resourceRepository = new ResourceRepository_1.default();
//useCases
const resourceUsecase = new ResourceUsecase_1.default(resourceRepository, generateOtp, encryptPassword, jwtToken, appWriteOtp, sendEmail);
//controllers
const resourceController = new ResourceController_1.default(resourceUsecase);
const route = express_1.default.Router();
// Develop APIs for file uploads & approvals. 
// Integrate AWS S3 or Firebase Storage for secure file handling. 
// Implement admin approval process before publishing resources. 
route.post("/fetchResource", (req, res, next) => {
    resourceController.fetchResource(req, res, next);
});
route.post("/AddResource", (req, res, next) => {
    resourceController.AddResource(req, res, next);
});
route.post("/EditResource", (req, res, next) => {
    resourceController.EditResource(req, res, next);
});
route.post("/DeleteResource", (req, res, next) => {
    resourceController.DeleteResource(req, res, next);
});
route.post("/ResourceLike", (req, res, next) => {
    resourceController.ResourceLike(req, res, next);
});
route.post("/ResourceDislike", (req, res, next) => {
    resourceController.ResourceDislike(req, res, next);
});
// route.use(errorHandle);
exports.default = route;
