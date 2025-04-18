"use strict";
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
    async FetchResourceForm() {
        try {
            const fetchedResources = this.ResourceRepository.fetchResources();
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
    }
    async AddResourceForm(title, description, fileURL, authorId, category) {
        try {
            const resource = { title, description, fileURL, authorId, category };
            const addedResources = this.ResourceRepository.addResources(resource);
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
    }
    async EditResourceForm(title, description, fileURL, authorId, category) {
        try {
            const resource = { title, description, fileURL, authorId, category };
            const editResources = this.ResourceRepository.editResources(resource);
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
    }
    async DeleteResourceForm(resourceId) {
        try {
            const deleteResources = this.ResourceRepository.deleteResources(resourceId);
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
    }
    async ResourceLikeForm(resourceId, userId) {
        try {
            const Resources = await this.ResourceRepository.findResourcesById(resourceId);
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
            const likeIndex = Resources.likes?.findIndex((id) => id.equals(userObjectId));
            const dislikeIndex = Resources.dislikes?.findIndex((id) => id.equals(userObjectId));
            if (likeIndex !== -1) {
                Resources.like?.splice(likeIndex, 1);
            }
            else {
                Resources.like?.push(userObjectId);
                if (dislikeIndex !== -1) {
                    Resources.dislikes?.splice(dislikeIndex, 1);
                }
            }
            await Resources.save();
            return {
                success: true,
                status: 200,
                data: Resources,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async ResourceDislikeForm(resourceId, userId) {
        try {
            const Resources = await this.ResourceRepository.findResourcesById(resourceId);
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
            const likeIndex = Resources.likes?.findIndex((id) => id.equals(userObjectId));
            const dislikeIndex = Resources.dislikes?.findIndex((id) => id.equals(userObjectId));
            if (dislikeIndex !== -1) {
                Resources.dislike?.splice(dislikeIndex, 1);
            }
            else {
                Resources.dislike?.push(userObjectId);
                if (dislikeIndex !== -1) {
                    Resources.likes?.splice(likeIndex, 1);
                }
            }
            await Resources.save();
            return {
                success: true,
                status: 200,
                data: Resources,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ResourceUsecase;
