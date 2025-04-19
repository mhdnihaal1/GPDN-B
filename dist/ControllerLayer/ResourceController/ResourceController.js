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
class ResourceController {
    constructor(ResourceUsecase) {
        this.ResourceUsecase = ResourceUsecase;
    }
    fetchResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchResource = yield this.ResourceUsecase.FetchResourceForm();
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
    AddResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, fileURL, authorId, category } = req.body;
                const addResources = yield this.ResourceUsecase.AddResourceForm(title, description, fileURL, authorId, category);
                return res.json({
                    success: addResources === null || addResources === void 0 ? void 0 : addResources.success,
                    status: addResources === null || addResources === void 0 ? void 0 : addResources.status,
                    data: addResources === null || addResources === void 0 ? void 0 : addResources.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    EditResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, fileURL, authorId, category } = req.body;
                const editResources = yield this.ResourceUsecase.EditResourceForm(title, description, fileURL, authorId, category);
                return res.json({
                    success: editResources === null || editResources === void 0 ? void 0 : editResources.success,
                    status: editResources === null || editResources === void 0 ? void 0 : editResources.status,
                    data: editResources === null || editResources === void 0 ? void 0 : editResources.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DeleteResource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resourceId } = req.body;
                const deleteResource = yield this.ResourceUsecase.DeleteResourceForm(resourceId);
                return res.json({
                    success: deleteResource === null || deleteResource === void 0 ? void 0 : deleteResource.success,
                    status: deleteResource === null || deleteResource === void 0 ? void 0 : deleteResource.status,
                    data: deleteResource === null || deleteResource === void 0 ? void 0 : deleteResource.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ResourceLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resourceId, userId } = req.body;
                const resourceLike = yield this.ResourceUsecase.ResourceLikeForm(resourceId, userId);
                return res.json({
                    success: resourceLike === null || resourceLike === void 0 ? void 0 : resourceLike.success,
                    status: resourceLike === null || resourceLike === void 0 ? void 0 : resourceLike.status,
                    data: resourceLike === null || resourceLike === void 0 ? void 0 : resourceLike.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ResourceDislike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resourceId, userId } = req.body;
                const resourceDislike = yield this.ResourceUsecase.ResourceDislikeForm(resourceId, userId);
                return res.json({
                    success: resourceDislike === null || resourceDislike === void 0 ? void 0 : resourceDislike.success,
                    status: resourceDislike === null || resourceDislike === void 0 ? void 0 : resourceDislike.status,
                    data: resourceDislike === null || resourceDislike === void 0 ? void 0 : resourceDislike.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ResourceController;
