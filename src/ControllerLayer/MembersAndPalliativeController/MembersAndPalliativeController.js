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
class MembersAndPalliativeController {
    constructor(MembersAndPalliativeUseCase) {
        this.MembersAndPalliativeUseCase = MembersAndPalliativeUseCase;
    }
    fetchDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchedDoctors = yield this.MembersAndPalliativeUseCase.FetchDoctorsForm();
                return res.json({
                    success: fetchedDoctors === null || fetchedDoctors === void 0 ? void 0 : fetchedDoctors.success,
                    status: fetchedDoctors === null || fetchedDoctors === void 0 ? void 0 : fetchedDoctors.status,
                    data: fetchedDoctors === null || fetchedDoctors === void 0 ? void 0 : fetchedDoctors.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    searchDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchInp } = req.body;
                const searchDoctors = yield this.MembersAndPalliativeUseCase.SearchDoctorsForm(searchInp);
                return res.json({
                    success: searchDoctors === null || searchDoctors === void 0 ? void 0 : searchDoctors.success,
                    status: searchDoctors === null || searchDoctors === void 0 ? void 0 : searchDoctors.status,
                    data: searchDoctors === null || searchDoctors === void 0 ? void 0 : searchDoctors.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    filterDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filter } = req.body;
                const filterDoctor = yield this.MembersAndPalliativeUseCase.filterDoctorsForm(filter);
                return res.json({
                    success: filterDoctor === null || filterDoctor === void 0 ? void 0 : filterDoctor.success,
                    status: filterDoctor === null || filterDoctor === void 0 ? void 0 : filterDoctor.status,
                    data: filterDoctor === null || filterDoctor === void 0 ? void 0 : filterDoctor.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchPalliativeUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPalliativeUnit = yield this.MembersAndPalliativeUseCase.fetchPalliativeUnitForm();
                return res.json({
                    success: fetchPalliativeUnit === null || fetchPalliativeUnit === void 0 ? void 0 : fetchPalliativeUnit.success,
                    status: fetchPalliativeUnit === null || fetchPalliativeUnit === void 0 ? void 0 : fetchPalliativeUnit.status,
                    data: fetchPalliativeUnit === null || fetchPalliativeUnit === void 0 ? void 0 : fetchPalliativeUnit.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addPalliativeUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, location, services, contactDetails } = req.body;
                const addPalliativeUnit = yield this.MembersAndPalliativeUseCase.addPalliativeUnitForm(name, location, services, contactDetails);
                return res.json({
                    success: addPalliativeUnit === null || addPalliativeUnit === void 0 ? void 0 : addPalliativeUnit.success,
                    status: addPalliativeUnit === null || addPalliativeUnit === void 0 ? void 0 : addPalliativeUnit.status,
                    data: addPalliativeUnit === null || addPalliativeUnit === void 0 ? void 0 : addPalliativeUnit.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editPalliativeUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, location, services, contactDetails } = req.body;
                const editPalliativeUnit = yield this.MembersAndPalliativeUseCase.editPalliativeUnitForm(name, location, services, contactDetails);
                return res.json({
                    success: editPalliativeUnit === null || editPalliativeUnit === void 0 ? void 0 : editPalliativeUnit.success,
                    status: editPalliativeUnit === null || editPalliativeUnit === void 0 ? void 0 : editPalliativeUnit.status,
                    data: editPalliativeUnit === null || editPalliativeUnit === void 0 ? void 0 : editPalliativeUnit.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePalliativeUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { UnitId } = req.body;
                const deletePalliativeUnit = yield this.MembersAndPalliativeUseCase.deletePalliativeUnitForm(UnitId);
                return res.json({
                    success: deletePalliativeUnit === null || deletePalliativeUnit === void 0 ? void 0 : deletePalliativeUnit.success,
                    status: deletePalliativeUnit === null || deletePalliativeUnit === void 0 ? void 0 : deletePalliativeUnit.status,
                    data: deletePalliativeUnit === null || deletePalliativeUnit === void 0 ? void 0 : deletePalliativeUnit.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    searchPalliativeUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchInp } = req.body;
                const searchPalliativeUnit = yield this.MembersAndPalliativeUseCase.searchPalliativeUnitForm(searchInp);
                return res.json({
                    success: searchPalliativeUnit === null || searchPalliativeUnit === void 0 ? void 0 : searchPalliativeUnit.success,
                    status: searchPalliativeUnit === null || searchPalliativeUnit === void 0 ? void 0 : searchPalliativeUnit.status,
                    data: searchPalliativeUnit === null || searchPalliativeUnit === void 0 ? void 0 : searchPalliativeUnit.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = MembersAndPalliativeController;
