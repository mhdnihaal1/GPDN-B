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
class ThreadUsecase {
    constructor(ThreadRepository, generateOtp, EncryptPassword, jwtToken, AppWriteOtp, generateEmail) {
        this.ThreadRepository = ThreadRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.AppWriteOtp = AppWriteOtp;
        this.generateEmail = generateEmail;
    }
    AddThreadForm(title, content, authorId, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thread = { title, content, authorId, tags };
                const addThread = yield this.ThreadRepository.addThread(thread);
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
        });
    }
    AddCommentForm(userId, threadId, authorId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = { userId, threadId, authorId, content };
                const addComment = yield this.ThreadRepository.addComment(comment);
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
        });
    }
    EditCommentForm(_id, threadId, authorId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = { _id, threadId, authorId, content };
                const editComment = yield this.ThreadRepository.editComment(comment);
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
        });
    }
    EditThreadForm(_id, title, content, authorId, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thread = { _id, title, content, tags };
                const editThread = yield this.ThreadRepository.editThread(thread);
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
        });
    }
    DeleteThreadForm(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteThread = yield this.ThreadRepository.deleteThread(threadId);
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
        });
    }
    DeleteCommentForm(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedComment = yield this.ThreadRepository.deleteComment(commentId);
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
        });
    }
    CommentLikesForm(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const comment = yield this.ThreadRepository.findCommentById(commentId);
                if (!comment) {
                    return { message: "Comment not found" };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const likeIndex = (_a = comment.likes) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const dislikeIndex = (_b = comment.dislikes) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (likeIndex !== -1) {
                    (_c = comment.likes) === null || _c === void 0 ? void 0 : _c.splice(likeIndex, 1);
                }
                else {
                    (_d = comment.likes) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (dislikeIndex !== -1) {
                        (_e = comment.dislikes) === null || _e === void 0 ? void 0 : _e.splice(dislikeIndex, 1);
                    }
                }
                yield comment.save();
                return {
                    success: true,
                    status: 200,
                    data: comment,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadUpvoteForm(threadId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const thread = yield this.ThreadRepository.findThreadById(threadId);
                if (!thread) {
                    return { message: "Thread not found" };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const upVoteIndex = (_a = thread.upVote) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const downVoteIndex = (_b = thread.downVote) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (upVoteIndex !== -1) {
                    (_c = thread.upVote) === null || _c === void 0 ? void 0 : _c.splice(upVoteIndex, 1);
                }
                else {
                    (_d = thread.upVote) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (downVoteIndex !== -1) {
                        (_e = thread.downVote) === null || _e === void 0 ? void 0 : _e.splice(downVoteIndex, 1);
                    }
                }
                yield thread.save();
                return {
                    success: true,
                    status: 200,
                    data: thread,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    CommentDislikesForm(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const comment = yield this.ThreadRepository.findCommentById(commentId);
                if (!comment) {
                    return { message: "Comment not found" };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const likeIndex = (_a = comment.likes) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const dislikeIndex = (_b = comment.dislikes) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (dislikeIndex !== -1) {
                    (_c = comment.dislikes) === null || _c === void 0 ? void 0 : _c.splice(likeIndex, 1);
                }
                else {
                    (_d = comment.dislikes) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (likeIndex !== -1) {
                        (_e = comment.likes) === null || _e === void 0 ? void 0 : _e.splice(dislikeIndex, 1);
                    }
                }
                yield comment.save();
                return {
                    success: true,
                    status: 200,
                    data: comment,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadDownvoteForm(threadId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const thread = yield this.ThreadRepository.findThreadById(threadId);
                if (!thread) {
                    return { message: "Thread not found" };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const upVoteIndex = (_a = thread.upVote) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const downVoteIndex = (_b = thread.downVote) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (downVoteIndex !== -1) {
                    (_c = thread.downVote) === null || _c === void 0 ? void 0 : _c.splice(upVoteIndex, 1);
                }
                else {
                    (_d = thread.downVote) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (upVoteIndex !== -1) {
                        (_e = thread.upVote) === null || _e === void 0 ? void 0 : _e.splice(downVoteIndex, 1);
                    }
                }
                yield thread.save();
                return {
                    success: true,
                    status: 200,
                    data: thread,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadSharesForm(threadId, shares) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const threadShares = yield this.ThreadRepository.ThreadShare(threadId, shares);
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
        });
    }
    ThreadSearchForm(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchThread = yield this.ThreadRepository.searchThread(searchInp);
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
        });
    }
    ThreadFilterForm(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filtered;
                if (filter == "MostLiked") {
                    filtered = yield this.ThreadRepository.filterlikedThread();
                }
                else if (filter == "MostShared") {
                    filtered = yield this.ThreadRepository.filtersharedThread();
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
        });
    }
}
exports.default = ThreadUsecase;
