"use strict";
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
    async FetchNewsAndBlogsForm() {
        try {
            const fetchNewsAndBlogs = await this.NewsAndBlogsRepository.fetchNewsAndBlogs();
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
    }
    async FetchNewsAndBlogsByIdForm(_id) {
        try {
            const fetchBlogs = await this.NewsAndBlogsRepository.fetchBlogsById(_id);
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
    }
    async AddNewAndBlogsForm(title, content, authorId, tags, description, imageURL, category) {
        try {
            const NewsAndBlogs = { title, content, description, tags, authorId, imageURL, category };
            if (!authorId || !title || !content || !tags || !description || !imageURL || !category) {
                return { success: false, status: 400, data: { Message: "Please fill all required feilds." } };
            }
            const addNewsAndBlogs = await this.NewsAndBlogsRepository.addNewsAndBlogs(NewsAndBlogs);
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
    }
    async EditNewsAndBlogsForm(_id, title, content, description, tags, imageURL, category) {
        try {
            const editNewsAndBlogs = { _id, title, content, description, tags, imageURL, category };
            if (!_id || !title || !content || !tags || !description || !imageURL || !category) {
                return { success: false, status: 400, message: "Please fill all required feilds." };
            }
            const EditNewsAndBlogs = await this.NewsAndBlogsRepository.editNewsAndBlogs(editNewsAndBlogs);
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
    }
    async DeleteNewsAndBlogsForm(BlogId) {
        try {
            const deleteNewsAndBlogs = await this.NewsAndBlogsRepository.deleteNewsAndBlogs(BlogId);
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
    }
    async SearchNewsAndBlogsForm(searchInp) {
        try {
            const searchNewsAndBlogs = await this.NewsAndBlogsRepository.searchNewsAndBlogs(searchInp);
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
    }
    async FilterNewsAndBlogsForm(topic) {
        try {
            const filterNewsAndBlogs = await this.NewsAndBlogsRepository.filterNewsAndBlogs(topic);
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
    }
    async NewsAndBlogsLikeForm(BlogId, userId) {
        try {
            const NewsAndBlogs = await this.NewsAndBlogsRepository.findNewsAndBlogsById(BlogId);
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
            const likeIndex = NewsAndBlogs.likes?.findIndex((id) => id.equals(userObjectId));
            const dislikeIndex = NewsAndBlogs.dislikes?.findIndex((id) => id.equals(userObjectId));
            if (likeIndex !== -1) {
                NewsAndBlogs.likes?.splice(likeIndex, 1);
            }
            else {
                NewsAndBlogs.likes?.push(userObjectId);
                if (dislikeIndex !== -1) {
                    NewsAndBlogs.dislikes?.splice(dislikeIndex, 1);
                }
            }
            await NewsAndBlogs.save();
            return {
                success: true,
                status: 200,
                data: NewsAndBlogs,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async NewsAndBlogsDislikeForm(BlogId, userId) {
        try {
            const NewsAndBlogs = await this.NewsAndBlogsRepository.findNewsAndBlogsById(BlogId);
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
            const likeIndex = NewsAndBlogs.likes?.findIndex((id) => id.equals(userObjectId));
            const dislikeIndex = NewsAndBlogs.dislikes?.findIndex((id) => id.equals(userObjectId));
            if (dislikeIndex !== -1) {
                NewsAndBlogs.dislikes?.splice(dislikeIndex, 1);
            }
            else {
                NewsAndBlogs.dislikes?.push(userObjectId);
                if (likeIndex !== -1) {
                    NewsAndBlogs.likes?.splice(likeIndex, 1);
                }
            }
            await NewsAndBlogs.save();
            return {
                success: true,
                status: 200,
                data: NewsAndBlogs,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = NewsAndBlogsUsecase;
