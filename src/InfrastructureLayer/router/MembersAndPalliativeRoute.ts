import express, { Request, Response, NextFunction } from "express";

//controller import
import MembersAndPalliativeController from "../../ControllerLayer/MembersAndPalliativeController/MembersAndPalliativeController";

//usecase import
import MembersAndPalliativeUseCase from "../../UsecaseLayer/MembersAndPalliativeUseCase/MembersAndPalliativeUsecase";

// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';


//repository import
import MembersAndPalliativeRepository from "../repository/MembersAndPalliativeRepository/MembersAndPalliativeRepository";

//services import
import GenerateOtp from "../services/GenerateOtp";
import EncryptPassword from "../services/BcryptPassword";
import GenerateEmail from "../services/SendEmail";
import {AppWriteOtp} from "../services/AppWriteOtp";
import JWTToken from "../services/GenerateToken";
 
//services
const generateOtp = new GenerateOtp();
const encryptPassword = new EncryptPassword();
const generateEmail = new GenerateEmail();
const jwtToken = new JWTToken();
const appWriteOtp = new AppWriteOtp()

//repositories
const membersAndPalliativeRepository = new MembersAndPalliativeRepository();

//useCases
const membersAndPalliativeUseCase = new MembersAndPalliativeUseCase(
  membersAndPalliativeRepository,
  generateOtp,
  encryptPassword,
  jwtToken,
  appWriteOtp,
  generateEmail
);

//controllers
const membersAndPalliativeController = new MembersAndPalliativeController(membersAndPalliativeUseCase);

const route = express.Router();

// Develop APIs to fetch, search, and filter doctor profiles. 
// Develop APIs to fetch and manage palliative care units. 

route.post("/fetchDoctors", (req, res, next) => {
  membersAndPalliativeController.fetchDoctors(req, res, next);
});
route.post("/searchDoctors", (req, res, next) => {
  membersAndPalliativeController.searchDoctors(req, res, next);
});
route.post("/filterDoctors", (req, res, next) => {
  membersAndPalliativeController.filterDoctors(req, res, next);
});


route.post("/fetchPalliativeUnit", (req, res, next) => {
  membersAndPalliativeController.fetchPalliativeUnit(req, res, next);
});
route.post("/addPalliativeUnit", (req, res, next) => {
  membersAndPalliativeController.addPalliativeUnit(req, res, next);
});
route.post("/editPalliativeUnit", (req, res, next) => {
  membersAndPalliativeController.editPalliativeUnit(req, res, next);
});
route.post("/deletePalliativeUnit", (req, res, next) => {
  membersAndPalliativeController.deletePalliativeUnit(req, res, next);
});

route.post("/searchPalliativeUnit", (req, res, next) => {
  membersAndPalliativeController.searchPalliativeUnit(req, res, next);
});



// route.use(errorHandle);
 

export default route;
