"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogSchema_1 = __importDefault(require("../../database/BlogSchema"));
class NewsAndBlogsRepository {
    async fetchNewsAndBlogs() {
        try {
            const NewsAndBlogs = await BlogSchema_1.default.find();
            return NewsAndBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async fetchBlogsById(_id) {
        try {
            const fetchBlogs = await BlogSchema_1.default.findById(_id);
            return fetchBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async addNewsAndBlogs(NewsAndBlogs) {
        try {
            const newNewsAndBlogs = new BlogSchema_1.default(NewsAndBlogs);
            const savedNewsAndBlogs = await newNewsAndBlogs.save();
            return savedNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async editNewsAndBlogs(NewsAndBlogs) {
        try {
            const editNewsAndBlogs = await BlogSchema_1.default.findByIdAndUpdate(NewsAndBlogs._id, { $set: NewsAndBlogs }, { new: true });
            return editNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteNewsAndBlogs(BlogId) {
        try {
            const savedNewsAndBlogs = await BlogSchema_1.default.findOneAndDelete({ _id: BlogId });
            return savedNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async searchNewsAndBlogs(searchInp) {
        try {
            const searchNewsAndBlogs = await BlogSchema_1.default.find({
                $or: [
                    { title: { $regex: searchInp, $options: "i" } },
                    { content: { $regex: searchInp, $options: "i" } },
                    { tags: { $regex: searchInp, $options: "i" } },
                    { category: { $regex: searchInp, $options: "i" } },
                ]
            });
            return searchNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async filterNewsAndBlogs(topic) {
        try {
            let filterNewsAndBlogs;
            if (topic == 'All') {
                filterNewsAndBlogs = await BlogSchema_1.default.find();
            }
            else {
                filterNewsAndBlogs = await BlogSchema_1.default.find({
                    category: { $regex: new RegExp(`^${topic}$`, 'i') }
                });
            }
            return filterNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findNewsAndBlogsById(BlogId) {
        try {
            const NewsAndBlogs = await BlogSchema_1.default.findOne({ _id: BlogId });
            return NewsAndBlogs;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
exports.default = NewsAndBlogsRepository;
