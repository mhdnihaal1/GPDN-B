import mongoose, { Schema, Document, Model, Types } from "mongoose";
import ResourceRepository from "../../InfrastructureLayer/repository/ResourceRepository/ResourceRepository";
import IUser from "../../DomainLayer/UserDomain";
import generateOtp from "../../InfrastructureLayer/services/GenerateOtp";
import EncryptPassword from "../../InfrastructureLayer/services/BcryptPassword";
import sendOtp from "../../InfrastructureLayer/services/SendEmail";
import {AppWriteOtp} from "../../InfrastructureLayer/services/AppWriteOtp";
import {account} from "../../InfrastructureLayer/services/AppWriteOtp";
import JWTToken from "../../InfrastructureLayer/services/GenerateToken";



// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";

class ResourceUsecase {
  private ResourceRepository: ResourceRepository;
  private generateOtp: generateOtp;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private AppWriteOtp: AppWriteOtp;
  private generateEmail: sendOtp;

  constructor(
    ResourceRepository: ResourceRepository,
    generateOtp: generateOtp,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    AppWriteOtp:AppWriteOtp,
    generateEmail: sendOtp
  ) {
    this.ResourceRepository = ResourceRepository;
    this.generateOtp = generateOtp;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.AppWriteOtp = AppWriteOtp;
    this.generateEmail = generateEmail;
  }


   async FetchResourceForm(){
    try{
        const fetchedResources = this.ResourceRepository.fetchResources();
        if(!fetchedResources){
          return {
            success: false,
            status: 422,
            data:{
              message:"Failed to fetch resource! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:fetchedResources,
          };
        }    
    }catch(error){
      console.log(error)
    }
   }

   

   async AddResourceForm( title:string , description:string , fileURL:string , authorId:string , category:string){
    try{
      const resource = { title , description , fileURL , authorId , category}
        const addedResources = this.ResourceRepository.addResources(resource);
        if(!addedResources){
          return {
            success: false,
            status: 422,
            data:{
              message:"Failed to add resource! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:addedResources,
          };
        } 
        }catch(error){
      console.log(error)
    }
   }


   async EditResourceForm( title:string , description:string , fileURL:string , authorId:string , category:string){
    try{
      const resource = { title , description , fileURL , authorId , category}
        const editResources = this.ResourceRepository.editResources(resource);
        if(!editResources){
          return {
            success: false,
            status: 422,
            data:{
              message:"Failed to edit resource! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:editResources,
          };
        } 
        
        }catch(error){
      console.log(error)
    }
   }


   async DeleteResourceForm( resourceId:string ){
    try{
        const deleteResources = this.ResourceRepository.deleteResources(resourceId);
        if(!deleteResources){
          return {
            success: false,
            status: 422,
            data:{
              message:"Failed to delete resource! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:deleteResources,
          };
        } 
    }catch(error){
      console.log(error)
    }
   }


   async ResourceLikeForm( resourceId:string , userId:string){
    try{
        const Resources = await  this.ResourceRepository.findResourcesById(resourceId );

        if (!Resources) {
          return {
            success: false,
            status: 400,
            data:{
              message:"Resource not found"
            },
          };    
          }
    
        const userObjectId = new mongoose.Types.ObjectId(userId);
    
        const likeIndex = Resources.likes?.findIndex((id:any) => id.equals(userObjectId));
        const dislikeIndex = Resources.dislikes?.findIndex((id:any) => id.equals(userObjectId));
    
        if (likeIndex !== -1) {
          Resources.like?.splice(likeIndex, 1);
        } else {
          Resources.like?.push(userObjectId);
          
          if (dislikeIndex !== -1) {
            Resources.dislikes?.splice(dislikeIndex, 1);
          }
        }
    
        await Resources.save();
        return {
          success: true,
          status: 200,
          data:Resources,
        };
        }catch(error){
      console.log(error)
    }
   }


   async ResourceDislikeForm( resourceId:string , userId:string ){
    try{
      const Resources = await  this.ResourceRepository.findResourcesById(resourceId );

      if (!Resources) {
        return {
          success: false,
          status: 400,
          data:{
            message:"Resource not found"
          },
        }; 
       }
  
      const userObjectId = new mongoose.Types.ObjectId(userId);
  
      const likeIndex = Resources.likes?.findIndex((id:any) => id.equals(userObjectId));
      const dislikeIndex = Resources.dislikes?.findIndex((id:any) => id.equals(userObjectId));
  
      if (dislikeIndex !== -1) {
        Resources.dislike?.splice(dislikeIndex, 1);
      } else {
        Resources.dislike?.push(userObjectId);
        
        if (dislikeIndex !== -1) {
          Resources.likes?.splice(likeIndex, 1);
        }
      }
  
      await Resources.save();
      return {
        success: true,
        status: 200,
        data:Resources,
      };
    }catch(error){
      console.log(error)
    }
   }

}


export default ResourceUsecase;