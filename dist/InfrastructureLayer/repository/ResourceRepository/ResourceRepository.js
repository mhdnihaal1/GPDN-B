"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceSchema_1 = __importDefault(require("../../database/ResourceSchema"));
class ResourceRepository {
    async fetchResources() {
        try {
            const Resources = await ResourceSchema_1.default.find();
            return Resources;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async addResources(resource) {
        try {
            const newResource = new ResourceSchema_1.default(resource);
            const savedResource = await newResource.save();
            return savedResource;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async editResources(resource) {
        try {
            const savedResource = await ResourceSchema_1.default.findByIdAndUpdate(resource._id, { $set: { ...resource } }, { new: true });
            return savedResource;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteResources(resourceId) {
        try {
            const savedResource = await ResourceSchema_1.default.findByIdAndDelete(resourceId);
            return savedResource;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findResourcesById(resourceId) {
        try {
            const Resource = await ResourceSchema_1.default.findOne({ _id: resourceId });
            return Resource;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
exports.default = ResourceRepository;
