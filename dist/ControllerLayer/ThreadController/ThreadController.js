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
Object.defineProperty(exports, "__esModule", { value: true });
class ThreadController {
    constructor(ThreadUsecase) {
        this.ThreadUsecase = ThreadUsecase;
    }
    FetchThread(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchThread = yield this.ThreadUsecase.FetchThreadForm();
                return res.json({
                    success: fetchThread === null || fetchThread === void 0 ? void 0 : fetchThread.success,
                    status: fetchThread === null || fetchThread === void 0 ? void 0 : fetchThread.status,
                    data: fetchThread === null || fetchThread === void 0 ? void 0 : fetchThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddThread(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, authorId, tags } = req.body;
                const addThread = yield this.ThreadUsecase.AddThreadForm(title, content, authorId, tags);
                return res.json({
                    success: addThread === null || addThread === void 0 ? void 0 : addThread.success,
                    status: addThread === null || addThread === void 0 ? void 0 : addThread.status,
                    data: addThread === null || addThread === void 0 ? void 0 : addThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId, authorId, content } = req.body;
                const addComment = yield this.ThreadUsecase.AddCommentForm(threadId, authorId, content);
                return res.json({
                    success: addComment === null || addComment === void 0 ? void 0 : addComment.success,
                    status: addComment === null || addComment === void 0 ? void 0 : addComment.status,
                    data: addComment === null || addComment === void 0 ? void 0 : addComment.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    EditComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, threadId, authorId, content } = req.body;
                const editComment = yield this.ThreadUsecase.EditCommentForm(_id, threadId, authorId, content);
                return res.json({
                    success: editComment === null || editComment === void 0 ? void 0 : editComment.success,
                    status: editComment === null || editComment === void 0 ? void 0 : editComment.status,
                    data: editComment === null || editComment === void 0 ? void 0 : editComment.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    EditThread(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, title, content, authorId, tags } = req.body;
                const editThread = yield this.ThreadUsecase.EditThreadForm(_id, title, content, authorId, tags);
                return res.json({
                    success: editThread === null || editThread === void 0 ? void 0 : editThread.success,
                    status: editThread === null || editThread === void 0 ? void 0 : editThread.status,
                    data: editThread === null || editThread === void 0 ? void 0 : editThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DeleteThread(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId } = req.body;
                const deleteThread = yield this.ThreadUsecase.DeleteThreadForm(threadId);
                return res.json({
                    success: deleteThread === null || deleteThread === void 0 ? void 0 : deleteThread.success,
                    status: deleteThread === null || deleteThread === void 0 ? void 0 : deleteThread.status,
                    data: deleteThread === null || deleteThread === void 0 ? void 0 : deleteThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DeleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId } = req.body;
                const deleteComment = yield this.ThreadUsecase.DeleteCommentForm(commentId);
                return res.json({
                    success: deleteComment === null || deleteComment === void 0 ? void 0 : deleteComment.success,
                    status: deleteComment === null || deleteComment === void 0 ? void 0 : deleteComment.status,
                    data: deleteComment === null || deleteComment === void 0 ? void 0 : deleteComment.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    CommentLikes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, userId } = req.body;
                const likeComment = yield this.ThreadUsecase.CommentLikesForm(commentId, userId);
                return res.json({
                    success: likeComment === null || likeComment === void 0 ? void 0 : likeComment.success,
                    status: likeComment === null || likeComment === void 0 ? void 0 : likeComment.status,
                    data: likeComment === null || likeComment === void 0 ? void 0 : likeComment.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadUpvote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId, userId } = req.body;
                const likeThread = yield this.ThreadUsecase.ThreadUpvoteForm(threadId, userId);
                return res.json({
                    success: likeThread === null || likeThread === void 0 ? void 0 : likeThread.success,
                    status: likeThread === null || likeThread === void 0 ? void 0 : likeThread.status,
                    data: likeThread === null || likeThread === void 0 ? void 0 : likeThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    CommentDislikes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, userId } = req.body;
                const dislikeComment = yield this.ThreadUsecase.CommentDislikesForm(commentId, userId);
                return res.json({
                    success: dislikeComment === null || dislikeComment === void 0 ? void 0 : dislikeComment.success,
                    status: dislikeComment === null || dislikeComment === void 0 ? void 0 : dislikeComment.status,
                    data: dislikeComment === null || dislikeComment === void 0 ? void 0 : dislikeComment.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    RealTimeReplies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, userId, content } = req.body;
                const commentReply = yield this.ThreadUsecase.CommentReplyForm(commentId, userId, content);
                return res.json({
                    success: commentReply === null || commentReply === void 0 ? void 0 : commentReply.success,
                    status: commentReply === null || commentReply === void 0 ? void 0 : commentReply.status,
                    data: commentReply === null || commentReply === void 0 ? void 0 : commentReply.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadDownvote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId, userId } = req.body;
                const dislikeThread = yield this.ThreadUsecase.ThreadDownvoteForm(threadId, userId);
                return res.json({
                    success: dislikeThread === null || dislikeThread === void 0 ? void 0 : dislikeThread.success,
                    status: dislikeThread === null || dislikeThread === void 0 ? void 0 : dislikeThread.status,
                    data: dislikeThread === null || dislikeThread === void 0 ? void 0 : dislikeThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadShares(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId } = req.body;
                const shareThread = yield this.ThreadUsecase.ThreadSharesForm(threadId);
                return res.json({
                    success: shareThread === null || shareThread === void 0 ? void 0 : shareThread.success,
                    status: shareThread === null || shareThread === void 0 ? void 0 : shareThread.status,
                    data: shareThread === null || shareThread === void 0 ? void 0 : shareThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadSearch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchInp } = req.body;
                //--------about topic ----
                const shareThread = yield this.ThreadUsecase.ThreadSearchForm(searchInp);
                return res.json({
                    success: shareThread === null || shareThread === void 0 ? void 0 : shareThread.success,
                    status: shareThread === null || shareThread === void 0 ? void 0 : shareThread.status,
                    data: shareThread === null || shareThread === void 0 ? void 0 : shareThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ThreadFilter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filter } = req.body;
                const shareThread = yield this.ThreadUsecase.ThreadFilterForm(filter);
                return res.json({
                    success: shareThread === null || shareThread === void 0 ? void 0 : shareThread.success,
                    status: shareThread === null || shareThread === void 0 ? void 0 : shareThread.status,
                    data: shareThread === null || shareThread === void 0 ? void 0 : shareThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ThreadController;
