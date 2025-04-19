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
const BlogSchema_1 = __importDefault(require("../../database/BlogSchema"));
class NewsAndBlogsRepository {
    fetchNewsAndBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsAndBlogs = yield BlogSchema_1.default.find();
                return NewsAndBlogs;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    fetchBlogsById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchBlogs = yield BlogSchema_1.default.findById(_id);
                return fetchBlogs;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    addNewsAndBlogs(NewsAndBlogs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNewsAndBlogs = new BlogSchema_1.default(NewsAndBlogs);
                const savedNewsAndBlogs = yield newNewsAndBlogs.save();
                return savedNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    editNewsAndBlogs(NewsAndBlogs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editNewsAndBlogs = yield BlogSchema_1.default.findByIdAndUpdate(NewsAndBlogs._id, { $set: NewsAndBlogs }, { new: true });
                return editNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    deleteNewsAndBlogs(BlogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedNewsAndBlogs = yield BlogSchema_1.default.findOneAndDelete({ _id: BlogId });
                return savedNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    searchNewsAndBlogs(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchNewsAndBlogs = yield BlogSchema_1.default.find({
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
        });
    }
    filterNewsAndBlogs(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filterNewsAndBlogs;
                if (topic == 'All') {
                    filterNewsAndBlogs = yield BlogSchema_1.default.find();
                }
                else {
                    filterNewsAndBlogs = yield BlogSchema_1.default.find({
                        category: { $regex: new RegExp(`^${topic}$`, 'i') }
                    });
                }
                return filterNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    findNewsAndBlogsById(BlogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsAndBlogs = yield BlogSchema_1.default.findOne({ _id: BlogId });
                return NewsAndBlogs;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
}
exports.default = NewsAndBlogsRepository;
