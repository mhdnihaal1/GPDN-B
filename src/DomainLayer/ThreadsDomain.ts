import mongoose from "mongoose";

 interface IThread {
    _id?: string;
    title: string;
    content: string;
    authorId?: string;  
    tags: string[];
    upVote?: mongoose.Types.ObjectId[];
    downVote?: mongoose.Types.ObjectId[]; 
    shares?: number;
    comments?: number;
    approvalStatus?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export default IThread