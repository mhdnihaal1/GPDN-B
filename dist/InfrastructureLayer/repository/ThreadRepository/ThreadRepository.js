"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ThreadSchema_1 = __importDefault(require("../../database/ThreadSchema"));
const CommentSchema_1 = __importDefault(require("../../database/CommentSchema"));
class ThreadRepository {
    async fetchThreads() {
        try {
            const Threads = await ThreadSchema_1.default.find();
            return Threads;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async addThread(thread) {
        try {
            const newThread = new ThreadSchema_1.default(thread);
            const savedThread = await newThread.save();
            return savedThread;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async addComment(comment) {
        try {
            const newComment = new CommentSchema_1.default(comment);
            const savedComment = await newComment.save();
            await ThreadSchema_1.default.findByIdAndUpdate(comment.threadId, { $push: { comments: comment.authorId } }, { new: true });
            return savedComment;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async editComment(comment) {
        try {
            const updatedComment = await CommentSchema_1.default.findByIdAndUpdate(comment._id, { $set: { ...comment } }, { new: true });
            return updatedComment;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async editThread(thread) {
        try {
            const updatedThread = await ThreadSchema_1.default.findByIdAndUpdate(thread._id, { $set: { ...thread } }, { new: true });
            return updatedThread;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteThread(threadId) {
        try {
            const deleteComment = await CommentSchema_1.default.deleteMany({ threadId: threadId });
            const deleteThread = await ThreadSchema_1.default.deleteOne({ _id: threadId });
            return deleteThread;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteComment(commentId) {
        try {
            const deleteComment = await CommentSchema_1.default.deleteOne({ _id: commentId });
            return deleteComment;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findCommentById(commentId) {
        try {
            const Comment = await CommentSchema_1.default.findOne({ _id: commentId });
            return Comment;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findThreadById(threadId) {
        try {
            const thread = await ThreadSchema_1.default.findOne({ _id: threadId });
            return thread;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async ThreadShare(threadId, shares) {
        try {
            const searchThread = await ThreadSchema_1.default.findByIdAndUpdate(threadId, { $inc: { shares: 1 } }, { new: true });
            return searchThread;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async searchThread(searchInp) {
        try {
            const searchThread = await CommentSchema_1.default.find({
                $or: [
                    { title: { $regex: searchInp, $options: "i" } },
                    { tags: { $regex: searchInp, $options: "i" } },
                ]
            });
            return searchThread;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async filterlikedThread() {
        try {
            const sortedThreads = await ThreadSchema_1.default.find().sort({ upVote: 1 });
            return sortedThreads;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async filtersharedThread() {
        try {
            const sortedThreads = await ThreadSchema_1.default.find().sort({ shares: 1 });
            return sortedThreads;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
exports.default = ThreadRepository;
