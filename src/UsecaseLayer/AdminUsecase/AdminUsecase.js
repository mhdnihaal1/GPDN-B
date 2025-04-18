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
// import { Client, Account, ID } from "appwrite";
// import OtpSession from "../../DomainLayer/OtpSession";
// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";
class AdminUsecase {
    constructor(AdminRepository, generateOtp, EncryptPassword, jwtToken, AppWriteOtp, sendEmail) {
        this.AdminRepository = AdminRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.AppWriteOtp = AppWriteOtp;
        this.sendEmail = sendEmail;
    }
    adminInvitationForm(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.sendEmail.sendInvitationToUser(email);
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "email sended successfully.",
                    },
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createUserForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ExistingUser = yield this.AdminRepository.findByEmail(email);
                if (ExistingUser && (ExistingUser === null || ExistingUser === void 0 ? void 0 : ExistingUser.registrationStatus) == "pending") {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "User request already send to  admin.",
                        },
                    };
                }
                else if (ExistingUser &&
                    (ExistingUser === null || ExistingUser === void 0 ? void 0 : ExistingUser.registrationStatus) == "approved") {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "User already exists.",
                        },
                    };
                }
                else if (ExistingUser &&
                    (ExistingUser === null || ExistingUser === void 0 ? void 0 : ExistingUser.registrationStatus) == "rejected") {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Admin rejected user already. ",
                        },
                    };
                }
                const validRole = "user";
                const validStatus = registrationStatus === "pending" ||
                    registrationStatus === "approved" ||
                    registrationStatus === "rejected"
                    ? registrationStatus
                    : "pending";
                const data = {
                    fullName,
                    email,
                    phoneNumber,
                    photo,
                    bio,
                    countryOfPractice,
                    medicalQualification,
                    yearOfGraduation,
                    hasFormalTrainingInPalliativeCare,
                    medicalRegistrationAuthority,
                    medicalRegistrationNumber,
                    affiliatedPalliativeAssociations,
                    specialInterestsInPalliativeCare,
                    role: validRole,
                    password,
                    registrationStatus: validStatus,
                };
                const addNewUser = Object.assign({}, data);
                const newUser = yield this.AdminRepository.AddUser(addNewUser);
                return {
                    success: true,
                    status: 200,
                    data: {
                        message: "User send to  admin and created successfully.",
                        data: newUser
                    },
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateUserForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validRole = role;
                const validStatus = registrationStatus === "pending" ||
                    registrationStatus === "approved" ||
                    registrationStatus === "rejected"
                    ? registrationStatus
                    : "pending";
                const data = {
                    fullName,
                    email,
                    phoneNumber,
                    photo,
                    bio,
                    countryOfPractice,
                    medicalQualification,
                    yearOfGraduation,
                    hasFormalTrainingInPalliativeCare,
                    medicalRegistrationAuthority,
                    medicalRegistrationNumber,
                    affiliatedPalliativeAssociations,
                    specialInterestsInPalliativeCare,
                    role: validRole,
                    password,
                    registrationStatus: validStatus,
                };
                const update = Object.assign({}, data);
                const updatedUser = yield this.AdminRepository.updateUser(update);
                if (!updatedUser) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to edit user! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: {
                            message: "User updated successfully.",
                            data: updatedUser
                        },
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteUserForm(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield this.AdminRepository.deleteUser(userId);
                if (!deleteUser) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to delete user! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: deleteUser,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchUserForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchUser = yield this.AdminRepository.fetchUser();
                if (!fetchUser) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch user! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchUser,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchThreadForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchThread = yield this.AdminRepository.fetchThread();
                if (!fetchThread) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch thread! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchThread,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    threadActionStatusForm(threadId, actionStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ActionStatus = yield this.AdminRepository.threadActionStatus(threadId, actionStatus);
                if (!ActionStatus) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to change action! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: ActionStatus,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editThreadForm(threadId, tags, content, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thread = { threadId, title, content, tags };
                const editThread = yield this.AdminRepository.editThread(thread);
                if (!editThread) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to edit thread! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: editThread,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteUserCommentForm(threadId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteuserComment = yield this.AdminRepository.deleteUserComment(threadId, userId);
                if (!deleteuserComment) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to delete user comment! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: deleteuserComment,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteThreadForm(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteThread = yield this.AdminRepository.deleteThread(threadId);
                if (!deleteThread) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to delete thread! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: deleteThread,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchResource() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchResource = yield this.AdminRepository.fetchResource();
                if (!fetchResource) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch resource! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchResource,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resourceActionStatusForm(resourceId, actionStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ActionStatus = yield this.AdminRepository.resourceActionStatus(resourceId, actionStatus);
                if (!ActionStatus) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to change  action! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: ActionStatus,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddNewsAndBlogsForm(title, content, authorId, tags, description, imageURL, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsAndBlogs = { title, content, description, tags, authorId, imageURL, category };
                if (!authorId || !title || !content || !tags || !description || !imageURL || !category) {
                    return { success: false, status: 400, data: { Message: "Please fill all required feilds." } };
                }
                const addNewsAndBlogs = yield this.AdminRepository.addNewsAndBlogs(NewsAndBlogs);
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
    editNewsAndBlogsForm(_id, title, content, tags, description, category, imageURL) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsAndBlogs = { _id, title, content, tags, description, imageURL, category };
                if (!_id || !title || !content || !tags || !description || !imageURL || !category) {
                    return { success: false, status: 400, message: "Please fill all required feilds." };
                }
                const editNewsAndBlogs = yield this.AdminRepository.editNewsAndBlogs(NewsAndBlogs);
                console.log(editNewsAndBlogs);
                if (!editNewsAndBlogs) {
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
                        data: editNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteNewsAndBlogsForm(BlogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteNewsAndBlogs = yield this.AdminRepository.deleteNewsAndBlogs(BlogId);
                if (!deleteNewsAndBlogs) {
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
                        data: deleteNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchBlogsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchBlogs = yield this.AdminRepository.fetchBlogs();
                if (!fetchBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch blog! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blogActionStatusForm(_id, actionStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ActionStatus = yield this.AdminRepository.blogActionStatus(_id, actionStatus);
                if (!ActionStatus) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to change action! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: ActionStatus,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchCategoryForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchCategory = yield this.AdminRepository.fetchCategory();
                if (!fetchCategory) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch category! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchCategory,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addCategoryForm(categroy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addCategory = yield this.AdminRepository.addCategory(categroy);
                if (!addCategory) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to add category! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: addCategory,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCategoryForm(_id, categroy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editCategory = yield this.AdminRepository.editCategory(_id, categroy);
                if (!editCategory) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to edit category! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: editCategory,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteCategoryForm(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteCategory = yield this.AdminRepository.deleteCategory(_id);
                if (!deleteCategory) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to delete category! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: deleteCategory,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchPalliativeForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPalliative = yield this.AdminRepository.fetchPalliative();
                if (!fetchPalliative) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch palliative unit! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchPalliative,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addPalliativeForm(name, location, services, contactDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unit = { name, location, services, contactDetails };
                const addPalliative = yield this.AdminRepository.addPalliative(unit);
                if (!addPalliative) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to add palliative unit! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: addPalliative,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editPalliativeForm(_id, name, location, services, contactDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unit = { _id, name, location, services, contactDetails };
                const editPalliative = yield this.AdminRepository.editPalliative(unit);
                if (!editPalliative) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to edit palliative unit! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: editPalliative,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    removePalliativeForm(unitid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removePalliative = yield this.AdminRepository.removePalliative(unitid);
                if (!removePalliative) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to remove palliative unit! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: removePalliative,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayUserRegistrationForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayUserRegistration = yield this.AdminRepository.LastDayUserRegistration();
                if (!LastDayUserRegistration) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last day userRegistration! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastDayUserRegistration,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekUserRegistrationForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekUserRegistration = yield this.AdminRepository.LastWeekUserRegistration();
                if (!LastWeekUserRegistration) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last week userRegistration! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastWeekUserRegistration,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthUserRegistrationForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthUserRegistration = yield this.AdminRepository.LastMonthUserRegistration();
                if (!LastMonthUserRegistration) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last month userRegistration! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastMonthUserRegistration,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayResourceForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayResource = yield this.AdminRepository.LastDayResource();
                if (!LastDayResource) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last day resource! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastDayResource,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekResourceForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekResource = yield this.AdminRepository.LastWeekResource();
                if (!LastWeekResource) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last week resource! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastWeekResource,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthResourceForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthResource = yield this.AdminRepository.LastMonthResource();
                if (!LastMonthResource) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last month resource! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastMonthResource,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayNewsAndBlogsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayNewsAndBlogs = yield this.AdminRepository.LastDayNewsAndBlogs();
                if (!LastDayNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last day NewsAndBlogs! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastDayNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekNewsAndBlogsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekNewsAndBlogs = yield this.AdminRepository.LastWeekNewsAndBlogs();
                if (!LastWeekNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last week NewsAndBlogs! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastWeekNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthNewsAndBlogsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthNewsAndBlogs = yield this.AdminRepository.LastMonthNewsAndBlogs();
                if (!LastMonthNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last month NewsAndBlogs! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastMonthNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastDayThreadForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastDayThread = yield this.AdminRepository.LastDayThread();
                if (!LastDayThread) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last day Thread! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastDayThread,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastWeekThreadForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastWeekThread = yield this.AdminRepository.LastWeekThread();
                if (!LastWeekThread) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last week Thread! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastWeekThread,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    LastMonthThreadForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LastMonthThread = yield this.AdminRepository.LastMonthThread();
                if (!LastMonthThread) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch last month Thread! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: LastMonthThread,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalUsersForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalUsers = yield this.AdminRepository.TotalUsers();
                if (!TotalUsers) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch total users ! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: TotalUsers,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalThreadsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalThreads = yield this.AdminRepository.TotalThreads();
                if (!TotalThreads) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch total Threads! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: TotalThreads,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalResourcesForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalResources = yield this.AdminRepository.TotalResources();
                if (!TotalResources) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch total Resources! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: TotalResources,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TotalNewsAndBlogsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TotalNewsAndBlogs = yield this.AdminRepository.TotalNewsAndBlogs();
                if (!TotalNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch total NewsAndBlogs! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: TotalNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TopLikedThreadsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedThreads = yield this.AdminRepository.TopLikedThreads();
                if (!TopLikedThreads) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch top liked Threads! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: TopLikedThreads,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TopLikedResourcesForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedResources = yield this.AdminRepository.TopLikedResources();
                if (!TopLikedResources) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch top liked Resources! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: TopLikedResources,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    TopLikedNewsAndBlogsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TopLikedNewsAndBlogs = yield this.AdminRepository.TopLikedNewsAndBlogs();
                if (!TopLikedNewsAndBlogs) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch top liked NewsAndBlogs! ,Please try later"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: TopLikedNewsAndBlogs,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = AdminUsecase;
