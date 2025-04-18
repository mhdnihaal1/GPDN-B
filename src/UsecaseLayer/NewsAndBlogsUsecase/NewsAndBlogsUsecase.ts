import mongoose, { Schema, Document, Model, Types } from "mongoose";
import NewsAndBlogsRepository from "../../InfrastructureLayer/repository/NewsAndBlogsRepository/NewsAndBlogsRepository";
import generateOtp from "../../InfrastructureLayer/services/GenerateOtp";
import EncryptPassword from "../../InfrastructureLayer/services/BcryptPassword";
import sendOtp from "../../InfrastructureLayer/services/SendEmail";
import {AppWriteOtp} from "../../InfrastructureLayer/services/AppWriteOtp";
import {account} from "../../InfrastructureLayer/services/AppWriteOtp";
import JWTToken from "../../InfrastructureLayer/services/GenerateToken";



// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";

class NewsAndBlogsUsecase {
  private NewsAndBlogsRepository: NewsAndBlogsRepository;
  private generateOtp: generateOtp;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private AppWriteOtp: AppWriteOtp;
  private generateEmail: sendOtp;

  constructor(
    NewsAndBlogsRepository: NewsAndBlogsRepository,
    generateOtp: generateOtp,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    AppWriteOtp:AppWriteOtp,
    generateEmail: sendOtp
  ) {
    this.NewsAndBlogsRepository = NewsAndBlogsRepository;
    this.generateOtp = generateOtp;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.AppWriteOtp = AppWriteOtp;
    this.generateEmail = generateEmail;
  }

  async FetchNewsAndBlogsForm(){
    try{
        const fetchNewsAndBlogs =await  this.NewsAndBlogsRepository.fetchNewsAndBlogs();
        if(!fetchNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to fetch newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:fetchNewsAndBlogs,
          };
        }
    }catch(error){
      console.log(error)
    }
   }

   async   FetchNewsAndBlogsByIdForm( _id:string ) {
    try {

      const fetchBlogs = await this.NewsAndBlogsRepository.fetchBlogsById(_id);

       if(!fetchBlogs){
        return {
          success: false,
          status: 400,
          data: {
            message:"Failed to fetch blogs! ,Please try later"
          }
        };
       }else{
        return {
          success: false,
          status: 400,
          data: fetchBlogs
        };
       }
     

    } catch (error) {
      console.log(error);
    }
  }

   
   async AddNewAndBlogsForm(title:string , content:string , authorId:string , tags:[string] , description:string , imageURL:string, category:string){
    try{
        const NewsAndBlogs = {title , content ,description , tags , authorId , imageURL , category  } ;
        if (!authorId || !title || !content || !tags || !description || !imageURL || !category) {
          return { success: false, status:400 ,data:{Message:"Please fill all required feilds." } };
        }
 
        const addNewsAndBlogs =await  this.NewsAndBlogsRepository.addNewsAndBlogs(NewsAndBlogs);
        if(!addNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to add newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:addNewsAndBlogs,
          };
        }
    }catch(error){
      console.log(error) 
    }
   }

   
   async EditNewsAndBlogsForm(_id:string ,title:string , content:string , description:string, tags :[string],imageURL:string,category:string ){
    try{
        const editNewsAndBlogs = {_id ,title , content ,description , tags  , imageURL , category  }
        if (!_id || !title || !content || !tags || !description || !imageURL || !category) {
          return { success: false, status:400 ,message: "Please fill all required feilds." };
        }
        const EditNewsAndBlogs =await  this.NewsAndBlogsRepository.editNewsAndBlogs(editNewsAndBlogs);
        if(!EditNewsAndBlogs){
          return {
            success: false, 
            status: 400,  
            data:{
              message:"Failed to edit newsandblogs! ,Please try later."  
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:EditNewsAndBlogs,
          };
        }    }catch(error){
      console.log(error)
    }
   }

   
   async DeleteNewsAndBlogsForm(BlogId:string){
    try{
        const deleteNewsAndBlogs =await  this.NewsAndBlogsRepository.deleteNewsAndBlogs(BlogId);
        
        if(!deleteNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to delete newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:deleteNewsAndBlogs,
          };
        } 
       }catch(error){
      console.log(error)
    }
   }


   
   async SearchNewsAndBlogsForm(searchInp:string){
    try{
        const searchNewsAndBlogs =await  this.NewsAndBlogsRepository.searchNewsAndBlogs(searchInp);
        if(!searchNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to search newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:searchNewsAndBlogs
          };
        }
    }catch(error){
      console.log(error)
    }
   }

   
   async FilterNewsAndBlogsForm(topic:string){
    try{
        const filterNewsAndBlogs =await  this.NewsAndBlogsRepository.filterNewsAndBlogs(topic);
        if(!filterNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to filter newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:filterNewsAndBlogs
          };
        }
    }catch(error){
      console.log(error)
    }
   }
   

   async NewsAndBlogsLikeForm(BlogId:string , userId:string){
    try{
        const NewsAndBlogs =await  this.NewsAndBlogsRepository.findNewsAndBlogsById(BlogId);
        if (!NewsAndBlogs) {
          return {
            success: false,
            status: 400,
            data:{
              message:"NewsAndBlogs not found"
            },
          };
        }
     
        const userObjectId = new mongoose.Types.ObjectId(userId);
    
        const likeIndex = NewsAndBlogs.likes?.findIndex((id:any) => id.equals(userObjectId));
        const dislikeIndex = NewsAndBlogs.dislikes?.findIndex((id:any) => id.equals(userObjectId));
         if (likeIndex !== -1) {
           NewsAndBlogs.likes?.splice(likeIndex, 1);
        } else {
           NewsAndBlogs.likes?.push(userObjectId);
          
          if (dislikeIndex !== -1) {
            NewsAndBlogs.dislikes?.splice(dislikeIndex, 1);
          }
        }
    
        await NewsAndBlogs.save();
        return {
          success: true,
          status: 200,
          data:NewsAndBlogs,
        };
        }catch(error){
      console.log(error)
    }
   }


   async NewsAndBlogsDislikeForm(BlogId:string , userId:string){
    try{
        const NewsAndBlogs =await  this.NewsAndBlogsRepository.findNewsAndBlogsById(BlogId);
        if (!NewsAndBlogs) {
          return {
            success: false,
            status: 400,
            data:{
              message:"NewsAndBlogs not found"
            },
          };
          }
    
        const userObjectId = new mongoose.Types.ObjectId(userId);
    
        const likeIndex = NewsAndBlogs.likes?.findIndex((id:any) => id.equals(userObjectId));
        const dislikeIndex = NewsAndBlogs.dislikes?.findIndex((id:any) => id.equals(userObjectId));
    
        if (dislikeIndex !== -1) {
          NewsAndBlogs.dislikes?.splice(dislikeIndex, 1);
        } else {
          NewsAndBlogs.dislikes?.push(userObjectId);
          
          if (likeIndex !== -1) {
            NewsAndBlogs.likes?.splice(likeIndex, 1);
          }
        }
    
        await NewsAndBlogs.save();
        return {
          success: true,
          status: 200,
          data:NewsAndBlogs,
        };
    }catch(error){
      console.log(error)
    }
   }


}

export default NewsAndBlogsUsecase;