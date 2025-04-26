"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ThreadSchema_1 = __importDefault(require("../../database/ThreadSchema"));
const CommentSchema_1 = __importDefault(require("../../database/CommentSchema"));
class ThreadRepository {
    fetchThreads() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Threads = yield ThreadSchema_1.default.find();
                return Threads;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    addThread(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newThread = new ThreadSchema_1.default(thread);
                const savedThread = yield newThread.save();
                return savedThread;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    addComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newComment = new CommentSchema_1.default(comment);
                const savedComment = yield newComment.save();
                yield ThreadSchema_1.default.findByIdAndUpdate(comment.threadId, { $push: { comments: savedComment._id } }, { new: true });
                return savedComment;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    editComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedComment = yield CommentSchema_1.default.findByIdAndUpdate(comment._id, { $set: Object.assign({}, comment) }, { new: true });
                return updatedComment;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    editThread(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedThread = yield ThreadSchema_1.default.findByIdAndUpdate(thread._id, { $set: Object.assign({}, thread) }, { new: true });
                return updatedThread;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    deleteThread(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteComment = yield CommentSchema_1.default.deleteMany({ threadId: threadId });
                const deleteThread = yield ThreadSchema_1.default.findByIdAndDelete(threadId);
                return deleteThread;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteComment = yield CommentSchema_1.default.findByIdAndDelete(commentId);
                return deleteComment;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    findCommentById(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Comment = yield CommentSchema_1.default.findOne({ _id: commentId });
                return Comment;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    findThreadById(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thread = yield ThreadSchema_1.default.findOne({ _id: threadId });
                return thread;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    ThreadShare(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchThread = yield ThreadSchema_1.default.findByIdAndUpdate(threadId, { $inc: { shares: 1 } }, { new: true });
                return searchThread;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    searchThread(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchThread = yield ThreadSchema_1.default.find({
                    $or: [
                        { title: { $regex: searchInp, $options: "i" } },
                        { tags: { $regex: searchInp, $options: "i" } },
                    ]
                });
                console.log(searchThread);
                return searchThread;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    filterlikedThread() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sortedThreads = yield ThreadSchema_1.default.find().sort({ upVote: -1 });
                return sortedThreads;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    filtersharedThread() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sortedThreads = yield ThreadSchema_1.default.find().sort({ shares: -1 });
                return sortedThreads;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    commentReply(commentId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedComment = yield CommentSchema_1.default.findByIdAndUpdate(commentId, {
                    $push: {
                        reply: {
                            userId: new mongoose_1.default.Types.ObjectId(userId),
                            content: content,
                            createdAt: new Date()
                        }
                    }
                }, { new: true });
                return updatedComment;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
}
exports.default = ThreadRepository;
