"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const MembersAndPalliativeController_1 = __importDefault(require("../../ControllerLayer/MembersAndPalliativeController/MembersAndPalliativeController"));
//usecase import
const MembersAndPalliativeUsecase_1 = __importDefault(require("../../UsecaseLayer/MembersAndPalliativeUseCase/MembersAndPalliativeUsecase"));
// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';
//repository import
const MembersAndPalliativeRepository_1 = __importDefault(require("../repository/MembersAndPalliativeRepository/MembersAndPalliativeRepository"));
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
const membersAndPalliativeRepository = new MembersAndPalliativeRepository_1.default();
//useCases
const membersAndPalliativeUseCase = new MembersAndPalliativeUsecase_1.default(membersAndPalliativeRepository, generateOtp, encryptPassword, jwtToken, appWriteOtp, generateEmail);
//controllers
const membersAndPalliativeController = new MembersAndPalliativeController_1.default(membersAndPalliativeUseCase);
const route = express_1.default.Router();
// Develop APIs to fetch, search, and filter doctor profiles. 
// Develop APIs to fetch and manage palliative care units. 
route.get("/fetchDoctors", (req, res, next) => {
    membersAndPalliativeController.fetchDoctors(req, res, next);
});
route.get("/searchDoctors", (req, res, next) => {
    membersAndPalliativeController.searchDoctors(req, res, next);
});
route.get("/filterDoctors", (req, res, next) => {
    membersAndPalliativeController.filterDoctors(req, res, next);
});
route.get("/fetchPalliativeUnit", (req, res, next) => {
    membersAndPalliativeController.fetchPalliativeUnit(req, res, next);
});
route.post("/addPalliativeUnit", (req, res, next) => {
    membersAndPalliativeController.addPalliativeUnit(req, res, next);
});
route.patch("/editPalliativeUnit", (req, res, next) => {
    membersAndPalliativeController.editPalliativeUnit(req, res, next);
});
route.post("/deletePalliativeUnit", (req, res, next) => {
    membersAndPalliativeController.deletePalliativeUnit(req, res, next);
});
route.get("/searchPalliativeUnit", (req, res, next) => {
    membersAndPalliativeController.searchPalliativeUnit(req, res, next);
});
// route.use(errorHandle);
exports.default = route;
