import mongoose, { Schema, Document, Model } from "mongoose";
import IComment from "../../DomainLayer/CommentsDomain";

const commentSchema: Schema<IComment & Document> = new Schema(
  {
    threadId: { type: String, required: false, ref: "Thread" },
    resourceId: { type: String, required: false, ref: "Resource" },
    blogId: { type: String, required: false, ref: "Blog" },
    authorId: { type: String, required: true, ref: "User" },
    content: { type: String, required: true },
    reply: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Comment: Model<IComment & Document> = mongoose.model<IComment & Document>(
  "Comment",
  commentSchema
);

export default Comment;
