import express, { Request, Response, NextFunction } from "express";

//controller import
import NewsAndBlogsController from "../../ControllerLayer/NewsAndBlogsController/NewsAndBlogsController";

//usecase import
import NewsAndBlogsUsecase from "../../UsecaseLayer/NewsAndBlogsUsecase/NewsAndBlogsUsecase";

// error handle
// import errorHandle from '../middleware/ErrorHandlingMiddleware';
// import userAuth  from '../middleware/UserMiddleware';


//repository import
import NewsAndBlogsRepository from "../repository/NewsAndBlogsRepository/NewsAndBlogsRepository";

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
const newsAndBlogsRepository = new NewsAndBlogsRepository();

//useCases
const newsAndBlogsUsecase = new NewsAndBlogsUsecase(
    newsAndBlogsRepository,
  generateOtp,
  encryptPassword,
  jwtToken,
  appWriteOtp,
  generateEmail
);

//controllers
const newsAndblogsController = new NewsAndBlogsController(newsAndBlogsUsecase);

const route = express.Router();
  

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
 

export default route;
