import mongoose from "mongoose";
import IThread from "../../../DomainLayer/ThreadsDomain";
import ThreadRepo from "../../../UsecaseLayer/Interface/ThreadRepo";
import ThreadSchema from "../../database/ThreadSchema";
import IComment from "../../../DomainLayer/CommentsDomain";
import CommentSchema from "../../database/CommentSchema";

class ThreadRepository implements ThreadRepo {


    async fetchThreads(): Promise<IThread | any> {
        try {
          const Threads = await ThreadSchema.find();
          return Threads;
        } catch (error) {
          console.log(error);
          return error;
        }
      }


  async addThread(thread: IThread): Promise<IThread | any> {
    try {
      const newThread = new ThreadSchema(thread);
      const savedThread = await newThread.save();
      return savedThread;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addComment(comment: IComment): Promise<IComment | any> {
    try {
      const newComment = new CommentSchema(comment);
      const savedComment = await newComment.save();

      await ThreadSchema.findByIdAndUpdate(
        comment.threadId,
        { $push: { comments: comment.authorId } }, 
        { new: true }
      );
      return savedComment;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editComment(comment: IComment): Promise<IComment | any> {
    try {
      const updatedComment = await CommentSchema.findByIdAndUpdate(
        comment._id,
        { $set: { ...comment} },
        { new: true }
      );
      return updatedComment;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editThread(thread: IThread): Promise<IThread | any> {
    try {
        const updatedThread = await ThreadSchema.findByIdAndUpdate(
            thread._id, 
            { $set: { ...thread } }, 
            { new: true }
          );
      return updatedThread;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteThread(threadId: string): Promise<IThread | any> {
    try {
      const deleteComment = await CommentSchema.deleteMany({ threadId: threadId });
      const deleteThread = await ThreadSchema.deleteOne({ _id: threadId });
      return deleteThread;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteComment(commentId: string): Promise<IComment | any> {
    try {
      const deleteComment = await CommentSchema.deleteOne({ _id: commentId });
      return deleteComment;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  

  async findCommentById(commentId: string): Promise<IComment | any> {
    try {
      const Comment = await CommentSchema.findOne({ _id: commentId });
      return Comment;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  

  async findThreadById(threadId: string): Promise<IThread | any> {
    try {
        const thread = await ThreadSchema.findOne({ _id: threadId });
        return thread;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  async ThreadShare(threadId: string, shares: number): Promise<IThread | any> {
    try {
      const searchThread = await ThreadSchema.findByIdAndUpdate(
        threadId,
        { $inc: { shares: 1 } },
        { new: true }
      );

      return searchThread;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async searchThread(searchInp: string): Promise<IThread[] | any> {
    try {
      const searchThread = await CommentSchema.find ({
        $or: [
          { title: { $regex: searchInp, $options: "i" } },
          { tags: { $regex: searchInp, $options: "i" } },
        ]
      });
      return searchThread;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  

  async filterlikedThread(): Promise<IThread[] | any> {
    try {
        const sortedThreads = await ThreadSchema.find().sort({ upVote: 1 });

      return sortedThreads;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  

  async filtersharedThread(): Promise<IThread[] | any> {
    try {
        const sortedThreads = await ThreadSchema.find().sort({ shares: 1 });

      return sortedThreads;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default ThreadRepository;
