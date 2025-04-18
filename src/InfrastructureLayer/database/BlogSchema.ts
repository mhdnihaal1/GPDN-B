import mongoose, { Schema, Document, Model } from "mongoose";
import IBlog from "../../DomainLayer/BlogDomain.";

const blogSchema: Schema<IBlog & Document> = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      tags: { type: [String], default: [] },
      imageURL: { type: String, required: true },
      authorId: { type: String, required: false, ref: 'User' }, 
      approvalStatus: { type: Boolean, default: false }, 
      likes:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true } 
  );

const Blog: Model<IBlog & Document> = mongoose.model<IBlog & Document>(
     "Blog",
      blogSchema
);

export default Blog;
