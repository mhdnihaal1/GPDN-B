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
// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";
class NewsAndBlogsUsecase {
    constructor(NewsAndBlogsRepository, generateOtp, EncryptPassword, jwtToken, AppWriteOtp, generateEmail) {
        this.NewsAndBlogsRepository = NewsAndBlogsRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.AppWriteOtp = AppWriteOtp;
        this.generateEmail = generateEmail;
    }
    FetchNewsAndBlogsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchNewsAndBlogs = yield this.NewsAndBlogsRepository.fetchNewsAndBlogs();
                if (!fetchNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch newsandblogs! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    FetchNewsAndBlogsByIdForm(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchBlogs = yield this.NewsAndBlogsRepository.fetchBlogsById(_id);
                if (!fetchBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch blogs! ,Please try later"
                        }
                    };
                }
                else {
                    return {
                        success: false,
                        status: 400,
                        data: fetchBlogs
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddNewAndBlogsForm(title, content, authorId, tags, description, imageURL, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsAndBlogs = { title, content, description, tags, authorId, imageURL, category };
                if (!authorId || !title || !content || !tags || !description || !imageURL || !category) {
                    return { success: false, status: 400, data: { Message: "Please fill all required feilds." } };
                }
                const addNewsAndBlogs = yield this.NewsAndBlogsRepository.addNewsAndBlogs(NewsAndBlogs);
                if (!addNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to add newsandblogs! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: addNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    EditNewsAndBlogsForm(_id, title, content, description, tags, imageURL, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editNewsAndBlogs = { _id, title, content, description, tags, imageURL, category };
                if (!_id || !title || !content || !tags || !description || !imageURL || !category) {
                    return { success: false, status: 400, message: "Please fill all required feilds." };
                }
                const EditNewsAndBlogs = yield this.NewsAndBlogsRepository.editNewsAndBlogs(editNewsAndBlogs);
                if (!EditNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to edit newsandblogs! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: EditNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DeleteNewsAndBlogsForm(BlogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteNewsAndBlogs = yield this.NewsAndBlogsRepository.deleteNewsAndBlogs(BlogId);
                if (!deleteNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to delete newsandblogs! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: deleteNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    SearchNewsAndBlogsForm(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchNewsAndBlogs = yield this.NewsAndBlogsRepository.searchNewsAndBlogs(searchInp);
                if (!searchNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to search newsandblogs! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: searchNewsAndBlogs
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    FilterNewsAndBlogsForm(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterNewsAndBlogs = yield this.NewsAndBlogsRepository.filterNewsAndBlogs(topic);
                if (!filterNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to filter newsandblogs! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: filterNewsAndBlogs
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    NewsAndBlogsLikeForm(BlogId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const NewsAndBlogs = yield this.NewsAndBlogsRepository.findNewsAndBlogsById(BlogId);
                if (!NewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "NewsAndBlogs not found"
                        },
                    };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const likeIndex = (_a = NewsAndBlogs.likes) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const dislikeIndex = (_b = NewsAndBlogs.dislikes) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (likeIndex !== -1) {
                    (_c = NewsAndBlogs.likes) === null || _c === void 0 ? void 0 : _c.splice(likeIndex, 1);
                }
                else {
                    (_d = NewsAndBlogs.likes) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (dislikeIndex !== -1) {
                        (_e = NewsAndBlogs.dislikes) === null || _e === void 0 ? void 0 : _e.splice(dislikeIndex, 1);
                    }
                }
                yield NewsAndBlogs.save();
                return {
                    success: true,
                    status: 200,
                    data: NewsAndBlogs,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    NewsAndBlogsDislikeForm(BlogId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const NewsAndBlogs = yield this.NewsAndBlogsRepository.findNewsAndBlogsById(BlogId);
                if (!NewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "NewsAndBlogs not found"
                        },
                    };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const likeIndex = (_a = NewsAndBlogs.likes) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const dislikeIndex = (_b = NewsAndBlogs.dislikes) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (dislikeIndex !== -1) {
                    (_c = NewsAndBlogs.dislikes) === null || _c === void 0 ? void 0 : _c.splice(dislikeIndex, 1);
                }
                else {
                    (_d = NewsAndBlogs.dislikes) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (likeIndex !== -1) {
                        (_e = NewsAndBlogs.likes) === null || _e === void 0 ? void 0 : _e.splice(likeIndex, 1);
                    }
                }
                yield NewsAndBlogs.save();
                return {
                    success: true,
                    status: 200,
                    data: NewsAndBlogs,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = NewsAndBlogsUsecase;
