import mongoose, { Schema, Document, Model } from "mongoose";
import IResource from "../../DomainLayer/ResourceDomain";

const resourceSchema: Schema<IResource & Document> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileURL: { type: String, required: true }, 
    authorId: { type: String, required: true, ref: 'User' },  
    category: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    approvalStatus: { type: Boolean, default: false }, 
  },
  { timestamps: true }  
);

const Resource: Model<IResource & Document> = mongoose.model<IResource & Document>(
     "Resource",
     resourceSchema
);

export default Resource;
