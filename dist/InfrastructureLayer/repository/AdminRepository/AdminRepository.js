"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogSchema_1 = __importDefault(require("../../database/BlogSchema"));
const CategorySchema_1 = __importDefault(require("../../database/CategorySchema"));
const ResourceSchema_1 = __importDefault(require("../../database/ResourceSchema"));
const ThreadSchema_1 = __importDefault(require("../../database/ThreadSchema"));
const UnitSchema_1 = __importDefault(require("../../database/UnitSchema."));
const UserSchema_1 = __importDefault(require("../../database/UserSchema"));
class AdminRepository {
    async findByEmail(email) {
        try {
            const User = await UserSchema_1.default.findOne({ email: email });
            return User;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async AddUser(addNewUser) {
        try {
            const newUser = new UserSchema_1.default(addNewUser);
            const savedUser = await newUser.save();
            return savedUser.toObject();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async updateUser(update) {
        try {
            const updatedUser = await UserSchema_1.default.findByIdAndUpdate(update._id, update, { new: true });
            return updatedUser?.toObject() || null;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async deleteUser(userId) {
        try {
            const deleteUser = await UserSchema_1.default.findByIdAndDelete(userId);
            return deleteUser;
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchUser() {
        try {
            const fetchUser = await UserSchema_1.default.find();
            return fetchUser;
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchThread() {
        try {
            const fetchThread = await ThreadSchema_1.default.find();
            return fetchThread;
        }
        catch (error) {
            console.log(error);
        }
    }
    async threadActionStatus(threadId, actionStatus) {
        try {
            const fetchThread = await ThreadSchema_1.default.findByIdAndUpdate(threadId, { $set: { approvalStatus: actionStatus } }, { new: true });
            ;
            return fetchThread;
        }
        catch (error) {
            console.log(error);
        }
    }
    async editThread(thread) {
        try {
            const editThread = await ThreadSchema_1.default.findByIdAndUpdate(thread._id, { $set: { ...thread } }, { new: true });
            return editThread;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteUserComment(threadId, userId) {
        try {
            const deleteUserComment = await ThreadSchema_1.default.findByIdAndUpdate(threadId, { $pull: { comments: userId } }, { new: true });
            return deleteUserComment;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteThread(threadId) {
        try {
            const deleteThread = await ThreadSchema_1.default.findByIdAndDelete(threadId);
            return deleteThread;
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchResource() {
        try {
            const fetchResource = await ResourceSchema_1.default.find();
            return fetchResource;
        }
        catch (error) {
            console.log(error);
        }
    }
    async resourceActionStatus(resourceId, actionStatus) {
        try {
            const fetchResource = await ResourceSchema_1.default.findByIdAndUpdate(resourceId, { $set: { approvalStatus: actionStatus } }, { new: true });
            ;
            return fetchResource;
        }
        catch (error) {
            console.log(error);
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
    async fetchBlogs() {
        try {
            const fetchBlogs = await BlogSchema_1.default.find();
            return fetchBlogs;
        }
        catch (error) {
            console.log(error);
        }
    }
    async blogActionStatus(_id, actionStatus) {
        try {
            const updatedBlog = await BlogSchema_1.default.findByIdAndUpdate(_id, { $set: { approvalStatus: actionStatus } }, { new: true });
            console.log(updatedBlog);
            return updatedBlog;
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchCategory() {
        try {
            const fetchCategory = await CategorySchema_1.default.find();
            return fetchCategory;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addCategory(category) {
        try {
            const newCategory = new CategorySchema_1.default({ category });
            const savedCategory = await newCategory.save();
            return savedCategory;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async editCategory(_id, category) {
        try {
            const editCategory = await CategorySchema_1.default.findByIdAndUpdate(_id, { $set: { category } }, { new: true });
            return editCategory;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteCategory(_id) {
        try {
            const deleteCategory = await CategorySchema_1.default.findByIdAndDelete(_id);
            return deleteCategory;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async fetchPalliative() {
        try {
            const fetchPalliative = await UnitSchema_1.default.find();
            return fetchPalliative;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addPalliative(unit) {
        try {
            const newBlog = new BlogSchema_1.default(unit);
            const savedBlog = await newBlog.save();
            return savedBlog;
        }
        catch (error) {
            console.log(error);
        }
    }
    async editPalliative(unit) {
        try {
            const savedBlog = await UnitSchema_1.default.findByIdAndUpdate(unit?._id, { $set: { ...unit } }, { new: true });
            return savedBlog;
        }
        catch (error) {
            console.log(error);
        }
    }
    async removePalliative(unitId) {
        try {
            const removePalliative = await UnitSchema_1.default.findByIdAndDelete(unitId);
            return removePalliative;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastDayUserRegistration() {
        try {
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const lastDayUserRegistration = await UserSchema_1.default.find({
                createdAt: { $gte: yesterday }
            }).sort({ createdAt: -1 });
            return lastDayUserRegistration;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastWeekUserRegistration() {
        try {
            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const lastWeekUserRegistration = await UserSchema_1.default.find({
                createdAt: { $gte: sevenDaysAgo }
            }).sort({ createdAt: -1 });
            return lastWeekUserRegistration;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastMonthUserRegistration() {
        try {
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const lastMonthUserRegistration = await UnitSchema_1.default.find({
                createdAt: { $gte: thirtyDaysAgo }
            }).sort({ createdAt: -1 });
            return lastMonthUserRegistration;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastDayResource() {
        try {
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const lastDayResource = await ResourceSchema_1.default.find({
                createdAt: { $gte: yesterday }
            }).sort({ createdAt: -1 });
            return lastDayResource;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastWeekResource() {
        try {
            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const lastWeekResource = await ResourceSchema_1.default.find({
                createdAt: { $gte: sevenDaysAgo }
            }).sort({ createdAt: -1 });
            return lastWeekResource;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastMonthResource() {
        try {
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const lastMonthResource = await ResourceSchema_1.default.find({
                createdAt: { $gte: thirtyDaysAgo }
            }).sort({ createdAt: -1 });
            return lastMonthResource;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastDayNewsAndBlogs() {
        try {
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const lastDayNewsAndBlogs = await BlogSchema_1.default.find({
                createdAt: { $gte: yesterday }
            }).sort({ createdAt: -1 });
            return lastDayNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastWeekNewsAndBlogs() {
        try {
            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const lastWeekNewsAndBlogs = await BlogSchema_1.default.find({
                createdAt: { $gte: sevenDaysAgo }
            }).sort({ createdAt: -1 });
            return lastWeekNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastMonthNewsAndBlogs() {
        try {
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const lastMonthNewsAndBlogs = await BlogSchema_1.default.find({
                createdAt: { $gte: thirtyDaysAgo }
            }).sort({ createdAt: -1 });
            return lastMonthNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastDayThread() {
        try {
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const lastDayThread = await ThreadSchema_1.default.find({
                createdAt: { $gte: yesterday }
            }).sort({ createdAt: -1 });
            return lastDayThread;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastWeekThread() {
        try {
            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const lastWeekThread = await ThreadSchema_1.default.find({
                createdAt: { $gte: sevenDaysAgo }
            }).sort({ createdAt: -1 });
            return lastWeekThread;
        }
        catch (error) {
            console.log(error);
        }
    }
    async LastMonthThread() {
        try {
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const lastMonthThread = await ThreadSchema_1.default.find({
                createdAt: { $gte: thirtyDaysAgo }
            }).sort({ createdAt: -1 });
            return lastMonthThread;
        }
        catch (error) {
            console.log(error);
        }
    }
    async TotalUsers() {
        try {
            const TotalUsers = await UserSchema_1.default.countDocuments();
            return TotalUsers;
        }
        catch (error) {
            console.log(error);
        }
    }
    async TotalThreads() {
        try {
            const TotalThreads = await ThreadSchema_1.default.countDocuments();
            return TotalThreads;
        }
        catch (error) {
            console.log(error);
        }
    }
    async TotalResources() {
        try {
            const TotalResources = await ResourceSchema_1.default.countDocuments();
            return TotalResources;
        }
        catch (error) {
            console.log(error);
        }
    }
    async TotalNewsAndBlogs() {
        try {
            const TotalNewsAndBlogs = await BlogSchema_1.default.countDocuments();
            return TotalNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
        }
    }
    async TopLikedThreads() {
        try {
            const TopLikedThreads = await ThreadSchema_1.default.find()
                .sort({ likes: -1 });
            return TopLikedThreads;
        }
        catch (error) {
            console.log(error);
        }
    }
    async TopLikedResources() {
        try {
            const TopLikedResources = await ResourceSchema_1.default.find()
                .sort({ likes: -1 });
            return TopLikedResources;
        }
        catch (error) {
            console.log(error);
        }
    }
    async TopLikedNewsAndBlogs() {
        try {
            const TopLikedNewsAndBlogs = await BlogSchema_1.default.find()
                .sort({ likes: -1 });
            return TopLikedNewsAndBlogs;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = AdminRepository;
