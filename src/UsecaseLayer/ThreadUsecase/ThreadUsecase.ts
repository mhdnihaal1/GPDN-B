import mongoose, { Schema, Document, Model, Types } from "mongoose";
import ThreadRepository from "../../InfrastructureLayer/repository/ThreadRepository/ThreadRepository";
import IUser from "../../DomainLayer/UserDomain";
import generateOtp from "../../InfrastructureLayer/services/GenerateOtp";
import EncryptPassword from "../../InfrastructureLayer/services/BcryptPassword";
import sendOtp from "../../InfrastructureLayer/services/SendEmail";
import {AppWriteOtp} from "../../InfrastructureLayer/services/AppWriteOtp";
import {account} from "../../InfrastructureLayer/services/AppWriteOtp";
import JWTToken from "../../InfrastructureLayer/services/GenerateToken";

import { v4 as uuidv4 } from 'uuid';

    

class ThreadUsecase {
  private ThreadRepository: ThreadRepository;
  private generateOtp: generateOtp;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private AppWriteOtp: AppWriteOtp;
  private generateEmail: sendOtp;

  constructor(
    ThreadRepository: ThreadRepository,
    generateOtp: generateOtp,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    AppWriteOtp:AppWriteOtp,
    generateEmail: sendOtp
  ) {
    this.ThreadRepository = ThreadRepository;
    this.generateOtp = generateOtp;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.AppWriteOtp = AppWriteOtp;
    this.generateEmail = generateEmail;
  }


 

    async AddThreadForm(title:string , content:string , authorId:string , tags:[string] ){
    try{

      const thread = {  title, content, authorId, tags };
      
      const addThread = await this.ThreadRepository.addThread(thread);
      if(!addThread){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to add thread! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:addThread,
        };
      }        
    }catch(error){
        console.log(error)
    }
}


async AddCommentForm(userId:string , threadId:string , authorId:string , content:string ){
  try{

    const comment = {userId , threadId , authorId ,content }

    const addComment = await this.ThreadRepository.addComment(comment) ;
    if(!addComment){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to add comment! ,Please try later "
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:addComment,
      };
    }      
  }catch(error){
      console.log(error)
  }
}

async EditCommentForm(_id:string , threadId:string , authorId:string , content:string ){
  try{

    const comment = { _id , threadId , authorId , content }

    const editComment = await this.ThreadRepository.editComment(comment) ;
    if(!editComment){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to edit comment! ,Please try later"
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:editComment,
      };
    }            
  }catch(error){
      console.log(error)
  }
}


async EditThreadForm(_id:string  , title:string  , content:string  , authorId:string  , tags:string[] ){
  try{

    const thread = { _id , title , content , tags }

    const editThread = await this.ThreadRepository.editThread(thread) ;
    if(!editThread){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to edit thread! ,Please try later"
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:editThread,
      };
    }        
  }catch(error){
      console.log(error)
  }
}

async DeleteThreadForm(threadId:string ){
  try{

    const deleteThread = await this.ThreadRepository.deleteThread(threadId)

    if(!deleteThread){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to delete thread! ,Please try later"
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:deleteThread,
      };
    }          
  }catch(error){
      console.log(error)
  }
}

async DeleteCommentForm(commentId:string ){
  try{

    const deletedComment =  await this.ThreadRepository.deleteComment(commentId)

     if(!deletedComment){
      return {
        success: false,
        status: 409,
        data:{
          message:"Failed to delete comment! ,Please try later"
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:deletedComment,
      };
    }       
  }catch(error){
      console.log(error)
  }
}

async CommentLikesForm( commentId:string , userId:string ){
  try{

    const comment = await this.ThreadRepository.findCommentById(commentId);
    if (!comment) {
      return { message: "Comment not found" };
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const likeIndex = comment.likes?.findIndex((id:any) => id.equals(userObjectId));
    const dislikeIndex = comment.dislikes?.findIndex((id:any) => id.equals(userObjectId));

    if (likeIndex !== -1) {
      comment.likes?.splice(likeIndex, 1);
    } else {
      comment.likes?.push(userObjectId);
      
      if (dislikeIndex !== -1) {
        comment.dislikes?.splice(dislikeIndex, 1);
      }
    }

    await comment.save();
    return {
      success: true,
      status: 200,
      data:comment,
    };
      
  }catch(error){
      console.log(error)
  }
}

async ThreadUpvoteForm( threadId:string , userId:string ){
  try{

    const thread = await this.ThreadRepository.findThreadById(threadId);
    if (!thread) {
      return { message: "Thread not found" };
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const upVoteIndex = thread.upVote?.findIndex((id:any) => id.equals(userObjectId));
    const downVoteIndex = thread.downVote?.findIndex((id:any) => id.equals(userObjectId));

    if (upVoteIndex !== -1) {
      thread.upVote?.splice(upVoteIndex, 1);
    } else {
      thread.upVote?.push(userObjectId);
      
      if (downVoteIndex !== -1) {
        thread.downVote?.splice(downVoteIndex, 1);
      }
    }

    await thread.save();
    return {
      success: true,
      status: 200,
      data:thread,
    };
      
  }catch(error){
      console.log(error)
  }
}

async CommentDislikesForm( commentId:string , userId:string ){
  try{

    const comment = await this.ThreadRepository.findCommentById(commentId);
    if (!comment) {
      return { message: "Comment not found" };
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const likeIndex = comment.likes?.findIndex((id:any) => id.equals(userObjectId));
    const dislikeIndex = comment.dislikes?.findIndex((id:any) => id.equals(userObjectId));

    if (dislikeIndex !== -1) {
      comment.dislikes?.splice(likeIndex, 1);
    } else {
      comment.dislikes?.push(userObjectId);
      
      if (likeIndex !== -1) {
        comment.likes?.splice(dislikeIndex, 1);
      }
    }

    await comment.save();
    return {
      success: true,
      status: 200,
      data:comment,
    };
      
  }catch(error){
      console.log(error)
  }
}

async ThreadDownvoteForm( threadId:string , userId:string ){
  try{

    const thread = await this.ThreadRepository.findThreadById(threadId);
    if (!thread) {
      return { message: "Thread not found" };
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const upVoteIndex = thread.upVote?.findIndex((id:any) => id.equals(userObjectId));
    const downVoteIndex = thread.downVote?.findIndex((id:any) => id.equals(userObjectId));

    if (downVoteIndex !== -1) {
      thread.downVote?.splice(upVoteIndex, 1);
    } else {
      thread.downVote?.push(userObjectId);
      
      if (upVoteIndex !== -1) {
        thread.upVote?.splice(downVoteIndex, 1);
      }
    }

    await thread.save();
    return {
      success: true,
      status: 200,
      data:thread,
    };
      
  }catch(error){
      console.log(error)
  }
}

async ThreadSharesForm( threadId:string , shares:number ){
  try{

    const threadShares = await this.ThreadRepository.ThreadShare(threadId,shares)
    if(!threadShares){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to share thread! ,Please try later"
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:threadShares,
      };
    }    
      
  }catch(error){
      console.log(error)
  }
}


async ThreadSearchForm( searchInp:string  ){
  try{

    const searchThread = await this.ThreadRepository.searchThread(searchInp)

    if(!searchThread){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to search thread! ,Please try later"
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:searchThread,
      };
    }  
      
  }catch(error){
      console.log(error)
  }
}


async ThreadFilterForm( filter:string  ){
  try{
     let filtered;
    if( filter == "MostLiked"){
       filtered = await this.ThreadRepository.filterlikedThread()
    }else if(filter == "MostShared"){
       filtered = await this.ThreadRepository.filtersharedThread()
    }

    if(!filtered){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to filter thread! ,Please try later"
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:filtered,
      };
    }  
      
  }catch(error){
      console.log(error)
  }
}

}

export default ThreadUsecase;