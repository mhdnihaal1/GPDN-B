import mongoose from "mongoose";

 interface IComment {
    _id?: string;
    threadId?: string;  
    resourceId?:string;
    blogId?:string;
    authorId: string;  
    content: string;
    reply?:{
      userId: mongoose.Types.ObjectId;
      content: string;
      createdAt?: Date;
    }[];
    likes?: mongoose.Types.ObjectId[]; 
    dislikes?: mongoose.Types.ObjectId[]; 
    createdAt?: Date;
    updatedAt?: Date;
  }

  export default IComment;