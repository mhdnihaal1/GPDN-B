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
class AdminController { 
    constructor(AdminUsecase) {
        this.AdminUsecase = AdminUsecase;
    }
    adminInvitation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const adminInvitation = yield this.AdminUsecase.adminInvitationForm(email);
                return res.json({
                    success: adminInvitation === null || adminInvitation === void 0 ? void 0 : adminInvitation.success,
                    status: adminInvitation === null || adminInvitation === void 0 ? void 0 : adminInvitation.status,
                    data: adminInvitation === null || adminInvitation === void 0 ? void 0 : adminInvitation.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const createUserForm = yield this.AdminUsecase.createUserForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus);
                return res.json({
                    success: createUserForm === null || createUserForm === void 0 ? void 0 : createUserForm.success,
                    status: createUserForm === null || createUserForm === void 0 ? void 0 : createUserForm.status,
                    data: createUserForm === null || createUserForm === void 0 ? void 0 : createUserForm.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const updateUserForm = yield this.AdminUsecase.updateUserForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus);
                return res.json({
                    success: updateUserForm === null || updateUserForm === void 0 ? void 0 : updateUserForm.success,
                    status: updateUserForm === null || updateUserForm === void 0 ? void 0 : updateUserForm.status,
                    data: updateUserForm === null || updateUserForm === void 0 ? void 0 : updateUserForm.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const deleteuser = yield this.AdminUsecase.deleteUserForm(userId);
                return res.json({
                    success: deleteuser === null || deleteuser === void 0 ? void 0 : deleteuser.success,
                    status: deleteuser === null || deleteuser === void 0 ? void 0 : deleteuser.status,
                    data: deleteuser === null || deleteuser === void 0 ? void 0 : deleteuser.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchUser = yield this.AdminUsecase.fetchUserForm();
                return res.json({
                    success: fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.success,
                    status: fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.status,
                    data: fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchThreads(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchThread = yield this.AdminUsecase.fetchThreadForm();
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
    approveORdeclineThreads(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId, actionStatus } = req.body;
                const ActionStatus = yield this.AdminUsecase.threadActionStatusForm(threadId, actionStatus);
                return res.json({
                    success: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.success,
                    status: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.status,
                    data: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editThreads(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId, title, content, tags } = req.body;
                const editThread = yield this.AdminUsecase.editThreadForm(threadId, title, content, tags);
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
    deleteThreadComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId, userId } = req.body;
                const deleteUserComment = yield this.AdminUsecase.deleteUserCommentForm(threadId, userId);
                return res.json({
                    success: deleteUserComment === null || deleteUserComment === void 0 ? void 0 : deleteUserComment.success,
                    status: deleteUserComment === null || deleteUserComment === void 0 ? void 0 : deleteUserComment.status,
                    data: deleteUserComment === null || deleteUserComment === void 0 ? void 0 : deleteUserComment.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteThreads(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId } = req.body;
                const deleteThread = yield this.AdminUsecase.deleteThreadForm(threadId);
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
    fetchResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threadId } = req.body;
                const fetchResource = yield this.AdminUsecase.deleteThreadForm(threadId);
                return res.json({
                    success: fetchResource === null || fetchResource === void 0 ? void 0 : fetchResource.success,
                    status: fetchResource === null || fetchResource === void 0 ? void 0 : fetchResource.status,
                    data: fetchResource === null || fetchResource === void 0 ? void 0 : fetchResource.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    approveORdeclineResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resourceId, actionStatus } = req.body;
                const ActionStatus = yield this.AdminUsecase.resourceActionStatusForm(resourceId, actionStatus);
                return res.json({
                    success: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.success,
                    status: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.status,
                    data: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, description, authorId, tags, imageURL, category } = req.body;
                const addNewsAndBlogs = yield this.AdminUsecase.AddNewsAndBlogsForm(title, content, authorId, tags, description, imageURL, category);
                return res.json({
                    success: addNewsAndBlogs === null || addNewsAndBlogs === void 0 ? void 0 : addNewsAndBlogs.success,
                    status: addNewsAndBlogs === null || addNewsAndBlogs === void 0 ? void 0 : addNewsAndBlogs.status,
                    data: addNewsAndBlogs === null || addNewsAndBlogs === void 0 ? void 0 : addNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, title, content, tags, category, imageURL, description } = req.body;
                const editNewsAndBlogs = yield this.AdminUsecase.editNewsAndBlogsForm(_id, title, content, tags, category, imageURL, description);
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
    deleteNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { BlogId } = req.body;
                const deleteNewsAndBlogs = yield this.AdminUsecase.deleteNewsAndBlogsForm(BlogId);
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
    fetchBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchBlogs = yield this.AdminUsecase.fetchBlogsForm();
                return res.json({
                    success: fetchBlogs === null || fetchBlogs === void 0 ? void 0 : fetchBlogs.success,
                    status: fetchBlogs === null || fetchBlogs === void 0 ? void 0 : fetchBlogs.status,
                    data: fetchBlogs === null || fetchBlogs === void 0 ? void 0 : fetchBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    approveORdeclineBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, actionStatus } = req.body;
                const ActionStatus = yield this.AdminUsecase.blogActionStatusForm(_id, actionStatus);
                return res.json({
                    success: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.success,
                    status: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.status,
                    data: ActionStatus === null || ActionStatus === void 0 ? void 0 : ActionStatus.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchCategory = yield this.AdminUsecase.fetchCategoryForm();
                return res.json({
                    success: fetchCategory === null || fetchCategory === void 0 ? void 0 : fetchCategory.success,
                    status: fetchCategory === null || fetchCategory === void 0 ? void 0 : fetchCategory.status,
                    data: fetchCategory === null || fetchCategory === void 0 ? void 0 : fetchCategory.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.body;
                const addCategory = yield this.AdminUsecase.addCategoryForm(category);
                return res.json({
                    success: addCategory === null || addCategory === void 0 ? void 0 : addCategory.success,
                    status: addCategory === null || addCategory === void 0 ? void 0 : addCategory.status,
                    data: addCategory === null || addCategory === void 0 ? void 0 : addCategory.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, category } = req.body;
                const editCategory = yield this.AdminUsecase.editCategoryForm(_id, category);
                return res.json({
                    success: editCategory === null || editCategory === void 0 ? void 0 : editCategory.success,
                    status: editCategory === null || editCategory === void 0 ? void 0 : editCategory.status,
                    data: editCategory === null || editCategory === void 0 ? void 0 : editCategory.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body;
                const deleteCategory = yield this.AdminUsecase.deleteCategoryForm(_id);
                return res.json({
                    success: deleteCategory === null || deleteCategory === void 0 ? void 0 : deleteCategory.success,
                    status: deleteCategory === null || deleteCategory === void 0 ? void 0 : deleteCategory.status,
                    data: deleteCategory === null || deleteCategory === void 0 ? void 0 : deleteCategory.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchPalliative(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPalliative = yield this.AdminUsecase.fetchPalliativeForm();
                return res.json({
                    success: fetchPalliative === null || fetchPalliative === void 0 ? void 0 : fetchPalliative.success,
                    status: fetchPalliative === null || fetchPalliative === void 0 ? void 0 : fetchPalliative.status,
                    data: fetchPalliative === null || fetchPalliative === void 0 ? void 0 : fetchPalliative.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addPalliative(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, location, services, contactDetails } = req.body;
                const addPalliative = yield this.AdminUsecase.addPalliativeForm(name, location, services, contactDetails);
                return res.json({
                    success: addPalliative === null || addPalliative === void 0 ? void 0 : addPalliative.success,
                    status: addPalliative === null || addPalliative === void 0 ? void 0 : addPalliative.status,
                    data: addPalliative === null || addPalliative === void 0 ? void 0 : addPalliative.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editPalliative(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, name, location, services, contactDetails } = req.body;
                const editPalliative = yield this.AdminUsecase.editPalliativeForm(_id, name, location, services, contactDetails);
                return res.json({
                    success: editPalliative === null || editPalliative === void 0 ? void 0 : editPalliative.success,
                    status: editPalliative === null || editPalliative === void 0 ? void 0 : editPalliative.status,
                    data: editPalliative === null || editPalliative === void 0 ? void 0 : editPalliative.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    removePalliative(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unitId } = req.body;
                const removePalliative = yield this.AdminUsecase.removePalliativeForm(unitId);
                return res.json({
                    success: removePalliative === null || removePalliative === void 0 ? void 0 : removePalliative.success,
                    status: removePalliative === null || removePalliative === void 0 ? void 0 : removePalliative.status,
                    data: removePalliative === null || removePalliative === void 0 ? void 0 : removePalliative.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastDayUserRegistration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayUserRegistration = yield this.AdminUsecase.LastDayUserRegistrationForm();
                return res.json({
                    success: LastDayUserRegistration === null || LastDayUserRegistration === void 0 ? void 0 : LastDayUserRegistration.success,
                    status: LastDayUserRegistration === null || LastDayUserRegistration === void 0 ? void 0 : LastDayUserRegistration.status,
                    data: LastDayUserRegistration === null || LastDayUserRegistration === void 0 ? void 0 : LastDayUserRegistration.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastWeekUserRegistration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekUserRegistration = yield this.AdminUsecase.LastWeekUserRegistrationForm();
                return res.json({
                    success: LastWeekUserRegistration === null || LastWeekUserRegistration === void 0 ? void 0 : LastWeekUserRegistration.success,
                    status: LastWeekUserRegistration === null || LastWeekUserRegistration === void 0 ? void 0 : LastWeekUserRegistration.status,
                    data: LastWeekUserRegistration === null || LastWeekUserRegistration === void 0 ? void 0 : LastWeekUserRegistration.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastMonthUserRegistration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthUserRegistration = yield this.AdminUsecase.LastMonthUserRegistrationForm();
                return res.json({
                    success: LastMonthUserRegistration === null || LastMonthUserRegistration === void 0 ? void 0 : LastMonthUserRegistration.success,
                    status: LastMonthUserRegistration === null || LastMonthUserRegistration === void 0 ? void 0 : LastMonthUserRegistration.status,
                    data: LastMonthUserRegistration === null || LastMonthUserRegistration === void 0 ? void 0 : LastMonthUserRegistration.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastDayResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayResource = yield this.AdminUsecase.LastDayResourceForm();
                return res.json({
                    success: LastDayResource === null || LastDayResource === void 0 ? void 0 : LastDayResource.success,
                    status: LastDayResource === null || LastDayResource === void 0 ? void 0 : LastDayResource.status,
                    data: LastDayResource === null || LastDayResource === void 0 ? void 0 : LastDayResource.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastWeekResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekResource = yield this.AdminUsecase.LastWeekResourceForm();
                return res.json({
                    success: LastWeekResource === null || LastWeekResource === void 0 ? void 0 : LastWeekResource.success,
                    status: LastWeekResource === null || LastWeekResource === void 0 ? void 0 : LastWeekResource.status,
                    data: LastWeekResource === null || LastWeekResource === void 0 ? void 0 : LastWeekResource.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastMonthResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthResource = yield this.AdminUsecase.LastMonthResourceForm();
                return res.json({
                    success: LastMonthResource === null || LastMonthResource === void 0 ? void 0 : LastMonthResource.success,
                    status: LastMonthResource === null || LastMonthResource === void 0 ? void 0 : LastMonthResource.status,
                    data: LastMonthResource === null || LastMonthResource === void 0 ? void 0 : LastMonthResource.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastDayNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayNewsAndBlogs = yield this.AdminUsecase.LastDayNewsAndBlogsForm();
                return res.json({
                    success: LastDayNewsAndBlogs === null || LastDayNewsAndBlogs === void 0 ? void 0 : LastDayNewsAndBlogs.success,
                    status: LastDayNewsAndBlogs === null || LastDayNewsAndBlogs === void 0 ? void 0 : LastDayNewsAndBlogs.status,
                    data: LastDayNewsAndBlogs === null || LastDayNewsAndBlogs === void 0 ? void 0 : LastDayNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastWeekNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekNewsAndBlogs = yield this.AdminUsecase.LastWeekNewsAndBlogsForm();
                return res.json({
                    success: LastWeekNewsAndBlogs === null || LastWeekNewsAndBlogs === void 0 ? void 0 : LastWeekNewsAndBlogs.success,
                    status: LastWeekNewsAndBlogs === null || LastWeekNewsAndBlogs === void 0 ? void 0 : LastWeekNewsAndBlogs.status,
                    data: LastWeekNewsAndBlogs === null || LastWeekNewsAndBlogs === void 0 ? void 0 : LastWeekNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastMonthNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthNewsAndBlogs = yield this.AdminUsecase.LastMonthNewsAndBlogsForm();
                return res.json({
                    success: LastMonthNewsAndBlogs === null || LastMonthNewsAndBlogs === void 0 ? void 0 : LastMonthNewsAndBlogs.success,
                    status: LastMonthNewsAndBlogs === null || LastMonthNewsAndBlogs === void 0 ? void 0 : LastMonthNewsAndBlogs.status,
                    data: LastMonthNewsAndBlogs === null || LastMonthNewsAndBlogs === void 0 ? void 0 : LastMonthNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastDayThread(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayThread = yield this.AdminUsecase.LastDayThreadForm();
                return res.json({
                    success: LastDayThread === null || LastDayThread === void 0 ? void 0 : LastDayThread.success,
                    status: LastDayThread === null || LastDayThread === void 0 ? void 0 : LastDayThread.status,
                    data: LastDayThread === null || LastDayThread === void 0 ? void 0 : LastDayThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastWeekThread(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekThread = yield this.AdminUsecase.LastWeekThreadForm();
                return res.json({
                    success: LastWeekThread === null || LastWeekThread === void 0 ? void 0 : LastWeekThread.success,
                    status: LastWeekThread === null || LastWeekThread === void 0 ? void 0 : LastWeekThread.status,
                    data: LastWeekThread === null || LastWeekThread === void 0 ? void 0 : LastWeekThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchLastMonthThread(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthThread = yield this.AdminUsecase.LastMonthThreadForm();
                return res.json({
                    success: LastMonthThread === null || LastMonthThread === void 0 ? void 0 : LastMonthThread.success,
                    status: LastMonthThread === null || LastMonthThread === void 0 ? void 0 : LastMonthThread.status,
                    data: LastMonthThread === null || LastMonthThread === void 0 ? void 0 : LastMonthThread.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchTotalUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalUsers = yield this.AdminUsecase.TotalUsersForm();
                return res.json({
                    success: TotalUsers === null || TotalUsers === void 0 ? void 0 : TotalUsers.success,
                    status: TotalUsers === null || TotalUsers === void 0 ? void 0 : TotalUsers.status,
                    data: TotalUsers === null || TotalUsers === void 0 ? void 0 : TotalUsers.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchTotalThreads(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalThreads = yield this.AdminUsecase.TotalThreadsForm();
                return res.json({
                    success: TotalThreads === null || TotalThreads === void 0 ? void 0 : TotalThreads.success,
                    status: TotalThreads === null || TotalThreads === void 0 ? void 0 : TotalThreads.status,
                    data: TotalThreads === null || TotalThreads === void 0 ? void 0 : TotalThreads.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchTotalResources(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalResources = yield this.AdminUsecase.TotalResourcesForm();
                return res.json({
                    success: TotalResources === null || TotalResources === void 0 ? void 0 : TotalResources.success,
                    status: TotalResources === null || TotalResources === void 0 ? void 0 : TotalResources.status,
                    data: TotalResources === null || TotalResources === void 0 ? void 0 : TotalResources.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchTotalNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalNewsAndBlogs = yield this.AdminUsecase.TotalNewsAndBlogsForm();
                return res.json({
                    success: TotalNewsAndBlogs === null || TotalNewsAndBlogs === void 0 ? void 0 : TotalNewsAndBlogs.success,
                    status: TotalNewsAndBlogs === null || TotalNewsAndBlogs === void 0 ? void 0 : TotalNewsAndBlogs.status,
                    data: TotalNewsAndBlogs === null || TotalNewsAndBlogs === void 0 ? void 0 : TotalNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchTopLikedThreads(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedThreads = yield this.AdminUsecase.TopLikedThreadsForm();
                return res.json({
                    success: TopLikedThreads === null || TopLikedThreads === void 0 ? void 0 : TopLikedThreads.success,
                    status: TopLikedThreads === null || TopLikedThreads === void 0 ? void 0 : TopLikedThreads.status,
                    data: TopLikedThreads === null || TopLikedThreads === void 0 ? void 0 : TopLikedThreads.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchTopLikedResources(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedResources = yield this.AdminUsecase.TopLikedResourcesForm();
                return res.json({
                    success: TopLikedResources === null || TopLikedResources === void 0 ? void 0 : TopLikedResources.success,
                    status: TopLikedResources === null || TopLikedResources === void 0 ? void 0 : TopLikedResources.status,
                    data: TopLikedResources === null || TopLikedResources === void 0 ? void 0 : TopLikedResources.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchTopLikedNewsAndBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedNewsAndBlogs = yield this.AdminUsecase.TopLikedNewsAndBlogsForm();
                return res.json({
                    success: TopLikedNewsAndBlogs === null || TopLikedNewsAndBlogs === void 0 ? void 0 : TopLikedNewsAndBlogs.success,
                    status: TopLikedNewsAndBlogs === null || TopLikedNewsAndBlogs === void 0 ? void 0 : TopLikedNewsAndBlogs.status,
                    data: TopLikedNewsAndBlogs === null || TopLikedNewsAndBlogs === void 0 ? void 0 : TopLikedNewsAndBlogs.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = AdminController;
