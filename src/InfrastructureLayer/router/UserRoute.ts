import express, { Request, Response, NextFunction } from "express";

import UserController from "../../ControllerLayer/UserController/UserController";

import UserUsecase from "../../UsecaseLayer/UserUsecase/UserUsecase";

// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';


import UserRepository from "../repository/UserRepository/UserRepository";

import GenerateOtp from "../services/GenerateOtp";
import EncryptPassword from "../services/BcryptPassword";
import SendEmail from "../services/SendEmail";
import {AppWriteOtp} from "../services/AppWriteOtp"; 
import JWTToken from "../services/GenerateToken";
import upload from "../services/upload";

const generateOtp = new GenerateOtp();
const encryptPassword = new EncryptPassword();
const sendEmail = new SendEmail();
const jwtToken = new JWTToken();
const appWriteOtp = new AppWriteOtp()

const userRepository = new UserRepository();

const userUsecase = new UserUsecase(
  userRepository,
  generateOtp,
  encryptPassword,
  jwtToken,
  appWriteOtp,
  sendEmail
);

const userController = new UserController(userUsecase);

const route = express.Router();


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

route.patch("/EditUser", (req, res, next) => {
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
 

export default route;
