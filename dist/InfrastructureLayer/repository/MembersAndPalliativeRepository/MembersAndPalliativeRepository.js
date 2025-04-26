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
const UnitSchema_1 = __importDefault(require("../../database/UnitSchema."));
const UserSchema_1 = __importDefault(require("../../database/UserSchema"));
class MembersAndPalliativeRepository {
    FetchDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const FetchDoctors = yield UserSchema_1.default.find();
                return FetchDoctors;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    SearchDoctor(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchDoctors = yield UserSchema_1.default.find({
                    fullName: { $regex: searchInp, $options: "i" },
                });
                return searchDoctors;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    filterDoctors(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(filter);
                const filterDoctors = yield UserSchema_1.default.find({
                    fullName: { $regex: filter, $options: "i" },
                });
                return filterDoctors;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchPalliativeUnit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPalliativeUnit = yield UnitSchema_1.default.find();
                return fetchPalliativeUnit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addPalliativeUnit(PalliativeUnit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPalliativeUnit = new UnitSchema_1.default(PalliativeUnit);
                const savedPalliativeUnit = yield newPalliativeUnit.save();
                return savedPalliativeUnit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editPalliativeUnit(PalliativeUnit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editPalliativeUnit = yield UnitSchema_1.default.findByIdAndUpdate(PalliativeUnit._id, { $set: Object.assign({}, PalliativeUnit) }, { new: true });
                return editPalliativeUnit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePalliativeUnit(UnitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletePalliativeUnit = yield UnitSchema_1.default.findByIdAndDelete(UnitId);
                return deletePalliativeUnit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    searchPalliativeUnit(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchPalliativeUnit = yield UnitSchema_1.default.find({
                    $or: [
                        { name: { $regex: searchInp, $options: "i" } },
                        { location: { $regex: searchInp, $options: "i" } },
                        { services: { $regex: searchInp, $options: "i" } }
                    ]
                });
                return searchPalliativeUnit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = MembersAndPalliativeRepository;
