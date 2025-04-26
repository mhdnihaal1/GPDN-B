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
const CategorySchema_1 = __importDefault(require("../../database/CategorySchema"));
const CommentSchema_1 = __importDefault(require("../../database/CommentSchema"));
const ResourceSchema_1 = __importDefault(require("../../database/ResourceSchema"));
const ThreadSchema_1 = __importDefault(require("../../database/ThreadSchema"));
const UnitSchema_1 = __importDefault(require("../../database/UnitSchema."));
const UserSchema_1 = __importDefault(require("../../database/UserSchema"));
class AdminRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield UserSchema_1.default.findOne({ email: email });
                return User;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    userActionStatus(userId, actionStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchUser = yield UserSchema_1.default.findByIdAndUpdate(userId, { $set: { registrationStatus: actionStatus } }, { new: true });
                ;
                return fetchUser;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddUser(addNewUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new UserSchema_1.default(addNewUser);
                const savedUser = yield newUser.save();
                return savedUser;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    updateUser(update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield UserSchema_1.default.findOneAndUpdate({ _id: update._id }, update, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield UserSchema_1.default.findByIdAndDelete(userId);
                return deleteUser;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchUser = yield UserSchema_1.default.find();
                return fetchUser;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchThread() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchThread = yield ThreadSchema_1.default.find();
                return fetchThread;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    threadActionStatus(threadId, actionStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchThread = yield ThreadSchema_1.default.findByIdAndUpdate(threadId, { $set: { approvalStatus: actionStatus } }, { new: true });
                ;
                return fetchThread;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editThread(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editThread = yield ThreadSchema_1.default.findByIdAndUpdate(thread._id, { $set: Object.assign({}, thread) }, { new: true });
                return editThread;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteUserComment(threadId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUserComment = yield ThreadSchema_1.default.findByIdAndUpdate(threadId, { $pull: { comments: commentId } }, { new: true });
                const deletes = yield CommentSchema_1.default.findByIdAndDelete(commentId);
                return deleteUserComment;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteThread(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteThread = yield ThreadSchema_1.default.findByIdAndDelete(threadId);
                yield CommentSchema_1.default.deleteMany({ threadId: threadId });
                return deleteThread;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchResource() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchResource = yield ResourceSchema_1.default.find();
                return fetchResource;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resourceActionStatus(resourceId, actionStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchResource = yield ResourceSchema_1.default.findByIdAndUpdate(resourceId, { $set: { approvalStatus: actionStatus } }, { new: true });
                ;
                return fetchResource;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addNewsAndBlogs(NewsAndBlogs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(1212);
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
    fetchBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchBlogs = yield BlogSchema_1.default.find();
                return fetchBlogs;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blogActionStatus(_id, actionStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBlog = yield BlogSchema_1.default.findByIdAndUpdate(_id, { $set: { approvalStatus: actionStatus } }, { new: true });
                console.log(updatedBlog);
                return updatedBlog;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchCategory = yield CategorySchema_1.default.find();
                return fetchCategory;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = new CategorySchema_1.default({ category });
                const savedCategory = yield newCategory.save();
                return savedCategory;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    editCategory(_id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editCategory = yield CategorySchema_1.default.findByIdAndUpdate(_id, { $set: { category } }, { new: true });
                return editCategory;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deleteCategory(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteCategory = yield CategorySchema_1.default.findByIdAndDelete(_id);
                return deleteCategory;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    fetchPalliative() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPalliative = yield UnitSchema_1.default.find();
                console.log(fetchPalliative);
                return fetchPalliative;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addPalliative(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUnit = new UnitSchema_1.default(unit);
                const savedUnit = yield newUnit.save();
                return savedUnit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editPalliative(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedBlog = yield UnitSchema_1.default.findByIdAndUpdate(unit === null || unit === void 0 ? void 0 : unit._id, { $set: Object.assign({}, unit) }, { new: true });
                return savedBlog;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    removePalliative(unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removePalliative = yield UnitSchema_1.default.findByIdAndDelete(unitId);
                return removePalliative;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayUserRegistration() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const lastDayUserRegistration = yield UserSchema_1.default.find({
                    createdAt: { $gte: yesterday }
                }).sort({ createdAt: -1 });
                return lastDayUserRegistration;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekUserRegistration() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const lastWeekUserRegistration = yield UserSchema_1.default.find({
                    createdAt: { $gte: sevenDaysAgo }
                }).sort({ createdAt: -1 });
                return lastWeekUserRegistration;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthUserRegistration() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                const lastMonthUserRegistration = yield UserSchema_1.default.find({
                    createdAt: { $gte: thirtyDaysAgo }
                }).sort({ createdAt: -1 });
                return lastMonthUserRegistration;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayResource() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const lastDayResource = yield ResourceSchema_1.default.find({
                    createdAt: { $gte: yesterday }
                }).sort({ createdAt: -1 });
                return lastDayResource;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekResource() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const lastWeekResource = yield ResourceSchema_1.default.find({
                    createdAt: { $gte: sevenDaysAgo }
                }).sort({ createdAt: -1 });
                return lastWeekResource;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthResource() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                const lastMonthResource = yield ResourceSchema_1.default.find({
                    createdAt: { $gte: thirtyDaysAgo }
                }).sort({ createdAt: -1 });
                return lastMonthResource;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayNewsAndBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const lastDayNewsAndBlogs = yield BlogSchema_1.default.find({
                    createdAt: { $gte: yesterday }
                }).sort({ createdAt: -1 });
                return lastDayNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekNewsAndBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const lastWeekNewsAndBlogs = yield BlogSchema_1.default.find({
                    createdAt: { $gte: sevenDaysAgo }
                }).sort({ createdAt: -1 });
                return lastWeekNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthNewsAndBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                const lastMonthNewsAndBlogs = yield BlogSchema_1.default.find({
                    createdAt: { $gte: thirtyDaysAgo }
                }).sort({ createdAt: -1 });
                return lastMonthNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayThread() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const lastDayThread = yield ThreadSchema_1.default.find({
                    createdAt: { $gte: yesterday }
                }).sort({ createdAt: -1 });
                console.log(lastDayThread);
                return lastDayThread;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekThread() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const lastWeekThread = yield ThreadSchema_1.default.find({
                    createdAt: { $gte: sevenDaysAgo }
                }).sort({ createdAt: -1 });
                return lastWeekThread;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthThread() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                const lastMonthThread = yield ThreadSchema_1.default.find({
                    createdAt: { $gte: thirtyDaysAgo }
                }).sort({ createdAt: -1 });
                return lastMonthThread;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalUsers = yield UserSchema_1.default.countDocuments();
                return TotalUsers;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalThreads() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalThreads = yield ThreadSchema_1.default.countDocuments();
                return TotalThreads;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalResources() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalResources = yield ResourceSchema_1.default.countDocuments();
                return TotalResources;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalNewsAndBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalNewsAndBlogs = yield BlogSchema_1.default.countDocuments();
                return TotalNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TopLikedThreads() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedThreads = yield ThreadSchema_1.default.find()
                    .sort({ likes: -1 });
                return TopLikedThreads;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TopLikedResources() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedResources = yield ResourceSchema_1.default.find()
                    .sort({ likes: -1 });
                return TopLikedResources;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TopLikedNewsAndBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedNewsAndBlogs = yield BlogSchema_1.default.find()
                    .sort({ likes: -1 });
                return TopLikedNewsAndBlogs;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = AdminRepository;
