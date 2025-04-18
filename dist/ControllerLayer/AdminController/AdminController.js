"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminController {
    constructor(AdminUsecase) {
        this.AdminUsecase = AdminUsecase;
    }
    async adminInvitation(req, res, next) {
        try {
            const { email } = req.body;
            const adminInvitation = await this.AdminUsecase.adminInvitationForm(email);
            return res.json({
                success: adminInvitation?.success,
                status: adminInvitation?.status,
                data: adminInvitation?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async createUser(req, res, next) {
        try {
            const { fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus, } = req.body;
            if (!fullName ||
                !email ||
                !phoneNumber ||
                !photo ||
                !bio ||
                !countryOfPractice ||
                !medicalQualification ||
                !yearOfGraduation ||
                !hasFormalTrainingInPalliativeCare ||
                !medicalRegistrationAuthority ||
                !medicalRegistrationNumber ||
                !affiliatedPalliativeAssociations ||
                !specialInterestsInPalliativeCare ||
                !role ||
                !password ||
                !registrationStatus) {
                return res.json({
                    success: false,
                    status: 400,
                    data: {
                        message: "Missing required fields."
                    }
                });
            }
            const createUserForm = await this.AdminUsecase.createUserForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus);
            return res.json({
                success: createUserForm?.success,
                status: createUserForm?.status,
                data: createUserForm?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus, } = req.body;
            if (!fullName ||
                !email ||
                !phoneNumber ||
                !photo ||
                !bio ||
                !countryOfPractice ||
                !medicalQualification ||
                !yearOfGraduation ||
                !hasFormalTrainingInPalliativeCare ||
                !medicalRegistrationAuthority ||
                !medicalRegistrationNumber ||
                !affiliatedPalliativeAssociations ||
                !specialInterestsInPalliativeCare ||
                !role ||
                !password ||
                !registrationStatus) {
                return res.json({
                    success: false,
                    status: 400,
                    data: {
                        message: "Missing required fields."
                    }
                });
            }
            const updateUserForm = await this.AdminUsecase.updateUserForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus);
            return res.json({
                success: updateUserForm?.success,
                status: updateUserForm?.status,
                data: updateUserForm?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { userId } = req.body;
            const deleteuser = await this.AdminUsecase.deleteUserForm(userId);
            return res.json({
                success: deleteuser?.success,
                status: deleteuser?.status,
                data: deleteuser?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchUser(req, res, next) {
        try {
            const fetchUser = await this.AdminUsecase.fetchUserForm();
            return res.json({
                success: fetchUser?.success,
                status: fetchUser?.status,
                data: fetchUser?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchThreads(req, res, next) {
        try {
            const fetchThread = await this.AdminUsecase.fetchThreadForm();
            return res.json({
                success: fetchThread?.success,
                status: fetchThread?.status,
                data: fetchThread?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async approveORdeclineThreads(req, res, next) {
        try {
            const { threadId, actionStatus } = req.body;
            const ActionStatus = await this.AdminUsecase.threadActionStatusForm(threadId, actionStatus);
            return res.json({
                success: ActionStatus?.success,
                status: ActionStatus?.status,
                data: ActionStatus?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async editThreads(req, res, next) {
        try {
            const { threadId, title, content, tags } = req.body;
            const editThread = await this.AdminUsecase.editThreadForm(threadId, title, content, tags);
            return res.json({
                success: editThread?.success,
                status: editThread?.status,
                data: editThread?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteThreadComment(req, res, next) {
        try {
            const { threadId, userId } = req.body;
            const deleteUserComment = await this.AdminUsecase.deleteUserCommentForm(threadId, userId);
            return res.json({
                success: deleteUserComment?.success,
                status: deleteUserComment?.status,
                data: deleteUserComment?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteThreads(req, res, next) {
        try {
            const { threadId } = req.body;
            const deleteThread = await this.AdminUsecase.deleteThreadForm(threadId);
            return res.json({
                success: deleteThread?.success,
                status: deleteThread?.status,
                data: deleteThread?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchResource(req, res, next) {
        try {
            const { threadId } = req.body;
            const fetchResource = await this.AdminUsecase.deleteThreadForm(threadId);
            return res.json({
                success: fetchResource?.success,
                status: fetchResource?.status,
                data: fetchResource?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async approveORdeclineResource(req, res, next) {
        try {
            const { resourceId, actionStatus } = req.body;
            const ActionStatus = await this.AdminUsecase.resourceActionStatusForm(resourceId, actionStatus);
            return res.json({
                success: ActionStatus?.success,
                status: ActionStatus?.status,
                data: ActionStatus?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async addNewsAndBlogs(req, res, next) {
        try {
            const { title, content, description, authorId, tags, imageURL, category } = req.body;
            const addNewsAndBlogs = await this.AdminUsecase.AddNewsAndBlogsForm(title, content, authorId, tags, description, imageURL, category);
            return res.json({
                success: addNewsAndBlogs?.success,
                status: addNewsAndBlogs?.status,
                data: addNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async editNewsAndBlogs(req, res, next) {
        try {
            const { _id, title, content, tags, category, imageURL, description } = req.body;
            const editNewsAndBlogs = await this.AdminUsecase.editNewsAndBlogsForm(_id, title, content, tags, category, imageURL, description);
            return res.json({
                success: editNewsAndBlogs?.success,
                status: editNewsAndBlogs?.status,
                data: editNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteNewsAndBlogs(req, res, next) {
        try {
            const { BlogId } = req.body;
            const deleteNewsAndBlogs = await this.AdminUsecase.deleteNewsAndBlogsForm(BlogId);
            return res.json({
                success: deleteNewsAndBlogs?.success,
                status: deleteNewsAndBlogs?.status,
                data: deleteNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchBlogs(req, res, next) {
        try {
            const fetchBlogs = await this.AdminUsecase.fetchBlogsForm();
            return res.json({
                success: fetchBlogs?.success,
                status: fetchBlogs?.status,
                data: fetchBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async approveORdeclineBlogs(req, res, next) {
        try {
            const { _id, actionStatus } = req.body;
            const ActionStatus = await this.AdminUsecase.blogActionStatusForm(_id, actionStatus);
            return res.json({
                success: ActionStatus?.success,
                status: ActionStatus?.status,
                data: ActionStatus?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchCategory(req, res, next) {
        try {
            const fetchCategory = await this.AdminUsecase.fetchCategoryForm();
            return res.json({
                success: fetchCategory?.success,
                status: fetchCategory?.status,
                data: fetchCategory?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async addCategory(req, res, next) {
        try {
            const { category } = req.body;
            const addCategory = await this.AdminUsecase.addCategoryForm(category);
            return res.json({
                success: addCategory?.success,
                status: addCategory?.status,
                data: addCategory?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async editCategory(req, res, next) {
        try {
            const { _id, category } = req.body;
            const editCategory = await this.AdminUsecase.editCategoryForm(_id, category);
            return res.json({
                success: editCategory?.success,
                status: editCategory?.status,
                data: editCategory?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const { _id } = req.body;
            const deleteCategory = await this.AdminUsecase.deleteCategoryForm(_id);
            return res.json({
                success: deleteCategory?.success,
                status: deleteCategory?.status,
                data: deleteCategory?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchPalliative(req, res, next) {
        try {
            const fetchPalliative = await this.AdminUsecase.fetchPalliativeForm();
            return res.json({
                success: fetchPalliative?.success,
                status: fetchPalliative?.status,
                data: fetchPalliative?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async addPalliative(req, res, next) {
        try {
            const { name, location, services, contactDetails } = req.body;
            const addPalliative = await this.AdminUsecase.addPalliativeForm(name, location, services, contactDetails);
            return res.json({
                success: addPalliative?.success,
                status: addPalliative?.status,
                data: addPalliative?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async editPalliative(req, res, next) {
        try {
            const { _id, name, location, services, contactDetails } = req.body;
            const editPalliative = await this.AdminUsecase.editPalliativeForm(_id, name, location, services, contactDetails);
            return res.json({
                success: editPalliative?.success,
                status: editPalliative?.status,
                data: editPalliative?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async removePalliative(req, res, next) {
        try {
            const { unitId } = req.body;
            const removePalliative = await this.AdminUsecase.removePalliativeForm(unitId);
            return res.json({
                success: removePalliative?.success,
                status: removePalliative?.status,
                data: removePalliative?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastDayUserRegistration(req, res, next) {
        try {
            const LastDayUserRegistration = await this.AdminUsecase.LastDayUserRegistrationForm();
            return res.json({
                success: LastDayUserRegistration?.success,
                status: LastDayUserRegistration?.status,
                data: LastDayUserRegistration?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastWeekUserRegistration(req, res, next) {
        try {
            const LastWeekUserRegistration = await this.AdminUsecase.LastWeekUserRegistrationForm();
            return res.json({
                success: LastWeekUserRegistration?.success,
                status: LastWeekUserRegistration?.status,
                data: LastWeekUserRegistration?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastMonthUserRegistration(req, res, next) {
        try {
            const LastMonthUserRegistration = await this.AdminUsecase.LastMonthUserRegistrationForm();
            return res.json({
                success: LastMonthUserRegistration?.success,
                status: LastMonthUserRegistration?.status,
                data: LastMonthUserRegistration?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastDayResource(req, res, next) {
        try {
            const LastDayResource = await this.AdminUsecase.LastDayResourceForm();
            return res.json({
                success: LastDayResource?.success,
                status: LastDayResource?.status,
                data: LastDayResource?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastWeekResource(req, res, next) {
        try {
            const LastWeekResource = await this.AdminUsecase.LastWeekResourceForm();
            return res.json({
                success: LastWeekResource?.success,
                status: LastWeekResource?.status,
                data: LastWeekResource?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastMonthResource(req, res, next) {
        try {
            const LastMonthResource = await this.AdminUsecase.LastMonthResourceForm();
            return res.json({
                success: LastMonthResource?.success,
                status: LastMonthResource?.status,
                data: LastMonthResource?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastDayNewsAndBlogs(req, res, next) {
        try {
            const LastDayNewsAndBlogs = await this.AdminUsecase.LastDayNewsAndBlogsForm();
            return res.json({
                success: LastDayNewsAndBlogs?.success,
                status: LastDayNewsAndBlogs?.status,
                data: LastDayNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastWeekNewsAndBlogs(req, res, next) {
        try {
            const LastWeekNewsAndBlogs = await this.AdminUsecase.LastWeekNewsAndBlogsForm();
            return res.json({
                success: LastWeekNewsAndBlogs?.success,
                status: LastWeekNewsAndBlogs?.status,
                data: LastWeekNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastMonthNewsAndBlogs(req, res, next) {
        try {
            const LastMonthNewsAndBlogs = await this.AdminUsecase.LastMonthNewsAndBlogsForm();
            return res.json({
                success: LastMonthNewsAndBlogs?.success,
                status: LastMonthNewsAndBlogs?.status,
                data: LastMonthNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastDayThread(req, res, next) {
        try {
            const LastDayThread = await this.AdminUsecase.LastDayThreadForm();
            return res.json({
                success: LastDayThread?.success,
                status: LastDayThread?.status,
                data: LastDayThread?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastWeekThread(req, res, next) {
        try {
            const LastWeekThread = await this.AdminUsecase.LastWeekThreadForm();
            return res.json({
                success: LastWeekThread?.success,
                status: LastWeekThread?.status,
                data: LastWeekThread?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchLastMonthThread(req, res, next) {
        try {
            const LastMonthThread = await this.AdminUsecase.LastMonthThreadForm();
            return res.json({
                success: LastMonthThread?.success,
                status: LastMonthThread?.status,
                data: LastMonthThread?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchTotalUsers(req, res, next) {
        try {
            const TotalUsers = await this.AdminUsecase.TotalUsersForm();
            return res.json({
                success: TotalUsers?.success,
                status: TotalUsers?.status,
                data: TotalUsers?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchTotalThreads(req, res, next) {
        try {
            const TotalThreads = await this.AdminUsecase.TotalThreadsForm();
            return res.json({
                success: TotalThreads?.success,
                status: TotalThreads?.status,
                data: TotalThreads?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchTotalResources(req, res, next) {
        try {
            const TotalResources = await this.AdminUsecase.TotalResourcesForm();
            return res.json({
                success: TotalResources?.success,
                status: TotalResources?.status,
                data: TotalResources?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchTotalNewsAndBlogs(req, res, next) {
        try {
            const TotalNewsAndBlogs = await this.AdminUsecase.TotalNewsAndBlogsForm();
            return res.json({
                success: TotalNewsAndBlogs?.success,
                status: TotalNewsAndBlogs?.status,
                data: TotalNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchTopLikedThreads(req, res, next) {
        try {
            const TopLikedThreads = await this.AdminUsecase.TopLikedThreadsForm();
            return res.json({
                success: TopLikedThreads?.success,
                status: TopLikedThreads?.status,
                data: TopLikedThreads?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchTopLikedResources(req, res, next) {
        try {
            const TopLikedResources = await this.AdminUsecase.TopLikedResourcesForm();
            return res.json({
                success: TopLikedResources?.success,
                status: TopLikedResources?.status,
                data: TopLikedResources?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchTopLikedNewsAndBlogs(req, res, next) {
        try {
            const TopLikedNewsAndBlogs = await this.AdminUsecase.TopLikedNewsAndBlogsForm();
            return res.json({
                success: TopLikedNewsAndBlogs?.success,
                status: TopLikedNewsAndBlogs?.status,
                data: TopLikedNewsAndBlogs?.data,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = AdminController;
