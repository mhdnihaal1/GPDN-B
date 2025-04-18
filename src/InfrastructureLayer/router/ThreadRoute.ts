import express, { Request, Response, NextFunction } from "express";

//controller import
import ThreadController from "../../ControllerLayer/ThreadController/ThreadController";

//usecase import
import ThreadUsecase from "../../UsecaseLayer/ThreadUsecase/ThreadUsecase";

// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';


//repository import
import ThreadRepository from "../repository/ThreadRepository/ThreadRepository";

//services import
import GenerateOtp from "../services/GenerateOtp";
import EncryptPassword from "../services/BcryptPassword";
import SendEmail from "../services/SendEmail";
import {AppWriteOtp} from "../services/AppWriteOtp";
import JWTToken from "../services/GenerateToken";
 
//services
const generateOtp = new GenerateOtp();
const encryptPassword = new EncryptPassword();
const sendEmail = new SendEmail();
const jwtToken = new JWTToken();
const appWriteOtp = new AppWriteOtp()

//repositories
const threadRepository = new ThreadRepository();

//useCases
const threadUsecase = new ThreadUsecase(
  threadRepository,
  generateOtp,
  encryptPassword,
  jwtToken,
  appWriteOtp,
  sendEmail
);

//controllers
const threadController = new ThreadController(threadUsecase);

const route = express.Router();

//  Creating, editing, deleting forum threads and comments. ----
//  Managing likes, dislikes, shares, upvotes, downvotes.  ----

//  Searching and filtering discussions.   --filter remains
//  Real-time notifications for replies & engagement (WebSockets).  -----doubt  remains


route.post("/AddThread", (req, res, next) => {
  threadController.AddThread(req, res, next);
});
route.post("/EditThread", (req, res, next) => {
  threadController.EditThread(req, res, next);
});
route.post("/DeleteThread", (req, res, next) => {
  threadController.DeleteThread(req, res, next);
});
route.post("/ThreadUpvote", (req, res, next) => {
  threadController.ThreadUpvote(req, res, next);
});
route.post("/ThreadDownvote", (req, res, next) => {
  threadController.ThreadDownvote(req, res, next);
});
route.post("/ThreadShares", (req, res, next) => {
  threadController.ThreadShares(req, res, next);
});
route.post("/ThreadSearch", (req, res, next) => {
  threadController.ThreadSearch(req, res, next);
});
route.post("/ThreadFilter", (req, res, next) => {
  threadController.ThreadFilter(req, res, next);
});



route.post("/AddComment", (req, res, next) => {
  threadController.AddComment(req, res, next);
});
route.post("/EditComment", (req, res, next) => {
  threadController.EditComment(req, res, next);
});
route.post("/DeleteComment", (req, res, next) => {
  threadController.DeleteComment(req, res, next);
});
route.post("/CommentLikes", (req, res, next) => {
  threadController.CommentLikes(req, res, next);
});
route.post("/CommentDislikes", (req, res, next) => {
  threadController.CommentDislikes(req, res, next);
});
// route.post("/Real-time-replies", (req, res, next) => {
//   threadController.Real-time-replies(req, res, next);
// });



// route.use(errorHandle);
 

export default route;
