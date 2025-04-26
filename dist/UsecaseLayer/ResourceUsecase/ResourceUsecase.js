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
class ResourceUsecase {
    constructor(ResourceRepository, generateOtp, EncryptPassword, jwtToken, AppWriteOtp, generateEmail) {
        this.ResourceRepository = ResourceRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.AppWriteOtp = AppWriteOtp;
        this.generateEmail = generateEmail;
    }
    FetchResourceForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchedResources = yield this.ResourceRepository.fetchResources();
                console.log(fetchedResources);
                if (!fetchedResources) {
                    return {
                        success: false,
                        status: 422,
                        data: {
                            message: "Failed to fetch resource! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchedResources,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddResourceForm(title, description, fileURL, authorId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = { title, description, fileURL, authorId, category };
                const addedResources = yield this.ResourceRepository.addResources(resource);
                if (!addedResources) {
                    return {
                        success: false,
                        status: 422,
                        data: {
                            message: "Failed to add resource! ,Please try later."
                        },
                    };
                }
                else {
                    console.log("your are ");
                    return {
                        success: true,
                        status: 200,
                        data: addedResources,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    EditResourceForm(_id, title, description, fileURL, authorId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = { _id, title, description, fileURL, authorId, category };
                const editResources = yield this.ResourceRepository.editResources(resource);
                if (!editResources) {
                    return {
                        success: false,
                        status: 422,
                        data: {
                            message: "Failed to edit resource! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: editResources,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DeleteResourceForm(resourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResources = yield this.ResourceRepository.deleteResources(resourceId);
                if (!deleteResources) {
                    return {
                        success: false,
                        status: 422,
                        data: {
                            message: "Failed to delete resource! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: deleteResources,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ResourceLikeForm(resourceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const Resources = yield this.ResourceRepository.findResourcesById(resourceId);
                if (!Resources) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Resource not found"
                        },
                    };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const likeIndex = (_a = Resources.likes) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const dislikeIndex = (_b = Resources.dislikes) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (likeIndex !== -1) {
                    (_c = Resources.likes) === null || _c === void 0 ? void 0 : _c.splice(likeIndex, 1);
                }
                else {
                    (_d = Resources.likes) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (dislikeIndex !== -1) {
                        (_e = Resources.dislikes) === null || _e === void 0 ? void 0 : _e.splice(dislikeIndex, 1);
                    }
                }
                yield Resources.save();
                return {
                    success: true,
                    status: 200,
                    data: Resources,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ResourceDislikeForm(resourceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const Resources = yield this.ResourceRepository.findResourcesById(resourceId);
                if (!Resources) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Resource not found"
                        },
                    };
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const likeIndex = (_a = Resources.likes) === null || _a === void 0 ? void 0 : _a.findIndex((id) => id.equals(userObjectId));
                const dislikeIndex = (_b = Resources.dislikes) === null || _b === void 0 ? void 0 : _b.findIndex((id) => id.equals(userObjectId));
                if (dislikeIndex !== -1) {
                    (_c = Resources.dislikes) === null || _c === void 0 ? void 0 : _c.splice(dislikeIndex, 1);
                }
                else {
                    (_d = Resources.dislikes) === null || _d === void 0 ? void 0 : _d.push(userObjectId);
                    if (likeIndex !== -1) {
                        (_e = Resources.likes) === null || _e === void 0 ? void 0 : _e.splice(likeIndex, 1);
                    }
                }
                yield Resources.save();
                return {
                    success: true,
                    status: 200,
                    data: Resources,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ResourceUsecase;
