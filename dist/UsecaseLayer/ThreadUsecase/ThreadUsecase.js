"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class ThreadUsecase {
    constructor(ThreadRepository, generateOtp, EncryptPassword, jwtToken, AppWriteOtp, generateEmail) {
        this.ThreadRepository = ThreadRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.AppWriteOtp = AppWriteOtp;
        this.generateEmail = generateEmail;
    }
    async AddThreadForm(title, content, authorId, tags) {
        try {
            const thread = { title, content, authorId, tags };
            const addThread = await this.ThreadRepository.addThread(thread);
            if (!addThread) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to add thread! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: addThread,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async AddCommentForm(userId, threadId, authorId, content) {
        try {
            const comment = { userId, threadId, authorId, content };
            const addComment = await this.ThreadRepository.addComment(comment);
            if (!addComment) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to add comment! ,Please try later "
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: addComment,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async EditCommentForm(_id, threadId, authorId, content) {
        try {
            const comment = { _id, threadId, authorId, content };
            const editComment = await this.ThreadRepository.editComment(comment);
            if (!editComment) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to edit comment! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: editComment,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async EditThreadForm(_id, title, content, authorId, tags) {
        try {
            const thread = { _id, title, content, tags };
            const editThread = await this.ThreadRepository.editThread(thread);
            if (!editThread) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to edit thread! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: editThread,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async DeleteThreadForm(threadId) {
        try {
            const deleteThread = await this.ThreadRepository.deleteThread(threadId);
            if (!deleteThread) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to delete thread! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: deleteThread,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async DeleteCommentForm(commentId) {
        try {
            const deletedComment = await this.ThreadRepository.deleteComment(commentId);
            if (!deletedComment) {
                return {
                    success: false,
                    status: 409,
                    data: {
                        message: "Failed to delete comment! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: deletedComment,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async CommentLikesForm(commentId, userId) {
        try {
            const comment = await this.ThreadRepository.findCommentById(commentId);
            if (!comment) {
                return { message: "Comment not found" };
            }
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const likeIndex = comment.likes?.findIndex((id) => id.equals(userObjectId));
            const dislikeIndex = comment.dislikes?.findIndex((id) => id.equals(userObjectId));
            if (likeIndex !== -1) {
                comment.likes?.splice(likeIndex, 1);
            }
            else {
                comment.likes?.push(userObjectId);
                if (dislikeIndex !== -1) {
                    comment.dislikes?.splice(dislikeIndex, 1);
                }
            }
            await comment.save();
            return {
                success: true,
                status: 200,
                data: comment,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async ThreadUpvoteForm(threadId, userId) {
        try {
            const thread = await this.ThreadRepository.findThreadById(threadId);
            if (!thread) {
                return { message: "Thread not found" };
            }
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const upVoteIndex = thread.upVote?.findIndex((id) => id.equals(userObjectId));
            const downVoteIndex = thread.downVote?.findIndex((id) => id.equals(userObjectId));
            if (upVoteIndex !== -1) {
                thread.upVote?.splice(upVoteIndex, 1);
            }
            else {
                thread.upVote?.push(userObjectId);
                if (downVoteIndex !== -1) {
                    thread.downVote?.splice(downVoteIndex, 1);
                }
            }
            await thread.save();
            return {
                success: true,
                status: 200,
                data: thread,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async CommentDislikesForm(commentId, userId) {
        try {
            const comment = await this.ThreadRepository.findCommentById(commentId);
            if (!comment) {
                return { message: "Comment not found" };
            }
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const likeIndex = comment.likes?.findIndex((id) => id.equals(userObjectId));
            const dislikeIndex = comment.dislikes?.findIndex((id) => id.equals(userObjectId));
            if (dislikeIndex !== -1) {
                comment.dislikes?.splice(likeIndex, 1);
            }
            else {
                comment.dislikes?.push(userObjectId);
                if (likeIndex !== -1) {
                    comment.likes?.splice(dislikeIndex, 1);
                }
            }
            await comment.save();
            return {
                success: true,
                status: 200,
                data: comment,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async ThreadDownvoteForm(threadId, userId) {
        try {
            const thread = await this.ThreadRepository.findThreadById(threadId);
            if (!thread) {
                return { message: "Thread not found" };
            }
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const upVoteIndex = thread.upVote?.findIndex((id) => id.equals(userObjectId));
            const downVoteIndex = thread.downVote?.findIndex((id) => id.equals(userObjectId));
            if (downVoteIndex !== -1) {
                thread.downVote?.splice(upVoteIndex, 1);
            }
            else {
                thread.downVote?.push(userObjectId);
                if (upVoteIndex !== -1) {
                    thread.upVote?.splice(downVoteIndex, 1);
                }
            }
            await thread.save();
            return {
                success: true,
                status: 200,
                data: thread,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async ThreadSharesForm(threadId, shares) {
        try {
            const threadShares = await this.ThreadRepository.ThreadShare(threadId, shares);
            if (!threadShares) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to share thread! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: threadShares,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async ThreadSearchForm(searchInp) {
        try {
            const searchThread = await this.ThreadRepository.searchThread(searchInp);
            if (!searchThread) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to search thread! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: searchThread,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async ThreadFilterForm(filter) {
        try {
            let filtered;
            if (filter == "MostLiked") {
                filtered = await this.ThreadRepository.filterlikedThread();
            }
            else if (filter == "MostShared") {
                filtered = await this.ThreadRepository.filtersharedThread();
            }
            if (!filtered) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "Failed to filter thread! ,Please try later"
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 200,
                    data: filtered,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ThreadUsecase;
