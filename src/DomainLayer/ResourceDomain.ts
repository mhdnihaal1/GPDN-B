import mongoose from "mongoose";

 interface IResource {
    _id?: string;
    title: string;
    description: string;
    fileURL: string;  
    authorId: string;  
    category: string;
    likes?:mongoose.Types.ObjectId[]; 
    dislikes?:mongoose.Types.ObjectId[]; 
    approvalStatus?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export default IResource ;