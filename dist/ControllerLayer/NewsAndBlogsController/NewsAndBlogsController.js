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
class NewsAndBlogsController {
    constructor(NewsAndBlogsUsecase) {
        this.NewsAndBlogsUsecase = NewsAndBlogsUsecase;
    }
    FetchNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(" You are on FetchNewsAndBlogs");
                const fetchNewsAndBlogs = yield this.NewsAndBlogsUsecase.FetchNewsAndBlogsForm();
                return res.json({
                    success: fetchNewsAndBlogs === null || fetchNewsAndBlogs === void 0 ? void 0 : fetchNewsAndBlogs.success,
                    status: fetchNewsAndBlogs === null || fetchNewsAndBlogs === void 0 ? void 0 : fetchNewsAndBlogs.status,
                    data: fetchNewsAndBlogs === null || fetchNewsAndBlogs === void 0 ? void 0 : fetchNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    FetchNewsAndBlogsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body;
                const fetchNewsAndBlogs = yield this.NewsAndBlogsUsecase.FetchNewsAndBlogsByIdForm(_id);
                return res.json({
                    success: fetchNewsAndBlogs === null || fetchNewsAndBlogs === void 0 ? void 0 : fetchNewsAndBlogs.success,
                    status: fetchNewsAndBlogs === null || fetchNewsAndBlogs === void 0 ? void 0 : fetchNewsAndBlogs.status,
                    data: fetchNewsAndBlogs === null || fetchNewsAndBlogs === void 0 ? void 0 : fetchNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, description, authorId, tags, imageURL, category } = req.body;
                const AddNewsAndBlogs = yield this.NewsAndBlogsUsecase.AddNewAndBlogsForm(title, content, authorId, tags, description, imageURL, category);
                return res.json({
                    success: AddNewsAndBlogs === null || AddNewsAndBlogs === void 0 ? void 0 : AddNewsAndBlogs.success,
                    status: AddNewsAndBlogs === null || AddNewsAndBlogs === void 0 ? void 0 : AddNewsAndBlogs.status,
                    data: AddNewsAndBlogs === null || AddNewsAndBlogs === void 0 ? void 0 : AddNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    EditNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, title, content, description, tags, imageURL, category } = req.body;
                const editNewsAndBlogs = yield this.NewsAndBlogsUsecase.EditNewsAndBlogsForm(_id, title, content, description, tags, imageURL, category);
                return res.json({
                    success: editNewsAndBlogs === null || editNewsAndBlogs === void 0 ? void 0 : editNewsAndBlogs.success,
                    status: editNewsAndBlogs === null || editNewsAndBlogs === void 0 ? void 0 : editNewsAndBlogs.status,
                    data: editNewsAndBlogs === null || editNewsAndBlogs === void 0 ? void 0 : editNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DeleteNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { BlogId } = req.body;
                const deleteNewsAndBlogs = yield this.NewsAndBlogsUsecase.DeleteNewsAndBlogsForm(BlogId);
                return res.json({
                    success: deleteNewsAndBlogs === null || deleteNewsAndBlogs === void 0 ? void 0 : deleteNewsAndBlogs.success,
                    status: deleteNewsAndBlogs === null || deleteNewsAndBlogs === void 0 ? void 0 : deleteNewsAndBlogs.status,
                    data: deleteNewsAndBlogs === null || deleteNewsAndBlogs === void 0 ? void 0 : deleteNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    SearchNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchInp } = req.body;
                const searchNewsAndBlogs = yield this.NewsAndBlogsUsecase.SearchNewsAndBlogsForm(searchInp);
                return res.json({
                    success: searchNewsAndBlogs === null || searchNewsAndBlogs === void 0 ? void 0 : searchNewsAndBlogs.success,
                    status: searchNewsAndBlogs === null || searchNewsAndBlogs === void 0 ? void 0 : searchNewsAndBlogs.status,
                    data: searchNewsAndBlogs === null || searchNewsAndBlogs === void 0 ? void 0 : searchNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    filterNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { topic } = req.body;
                const filterNewsAndBlogs = yield this.NewsAndBlogsUsecase.FilterNewsAndBlogsForm(topic);
                return res.json({
                    success: filterNewsAndBlogs === null || filterNewsAndBlogs === void 0 ? void 0 : filterNewsAndBlogs.success,
                    status: filterNewsAndBlogs === null || filterNewsAndBlogs === void 0 ? void 0 : filterNewsAndBlogs.status,
                    data: filterNewsAndBlogs === null || filterNewsAndBlogs === void 0 ? void 0 : filterNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    NewsAndBlogsLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { BlogId, userId } = req.body;
                const resourceLike = yield this.NewsAndBlogsUsecase.NewsAndBlogsLikeForm(BlogId, userId);
                return res.json({
                    success: resourceLike === null || resourceLike === void 0 ? void 0 : resourceLike.success,
                    status: resourceLike === null || resourceLike === void 0 ? void 0 : resourceLike.status,
                    data: resourceLike === null || resourceLike === void 0 ? void 0 : resourceLike.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    NewsAndBlogsDislike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { BlogId, userId } = req.body;
                const NewsAndBlogsDislike = yield this.NewsAndBlogsUsecase.NewsAndBlogsDislikeForm(BlogId, userId);
                return res.json({
                    success: NewsAndBlogsDislike === null || NewsAndBlogsDislike === void 0 ? void 0 : NewsAndBlogsDislike.success,
                    status: NewsAndBlogsDislike === null || NewsAndBlogsDislike === void 0 ? void 0 : NewsAndBlogsDislike.status,
                    data: NewsAndBlogsDislike === null || NewsAndBlogsDislike === void 0 ? void 0 : NewsAndBlogsDislike.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = NewsAndBlogsController;
