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
const ResourceSchema_1 = __importDefault(require("../../database/ResourceSchema"));
class ResourceRepository {
    fetchResources() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Resources = yield ResourceSchema_1.default.find();
                return Resources;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    addResources(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newResource = new ResourceSchema_1.default(resource);
                const savedResource = yield newResource.save();
                console.log(savedResource);
                return savedResource;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    editResources(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedResource = yield ResourceSchema_1.default.findByIdAndUpdate(resource._id, { $set: Object.assign({}, resource) }, { new: true });
                return savedResource;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    deleteResources(resourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedResource = yield ResourceSchema_1.default.findByIdAndDelete(resourceId);
                return savedResource;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    findResourcesById(resourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Resource = yield ResourceSchema_1.default.findOne({ _id: resourceId });
                return Resource;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
}
exports.default = ResourceRepository;
