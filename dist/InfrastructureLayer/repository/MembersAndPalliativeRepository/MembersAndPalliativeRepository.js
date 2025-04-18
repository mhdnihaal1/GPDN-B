"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitSchema_1 = __importDefault(require("../../database/UnitSchema."));
const UserSchema_1 = __importDefault(require("../../database/UserSchema"));
class MembersAndPalliativeRepository {
    async FetchDoctors() {
        try {
            const FetchDoctors = await UserSchema_1.default.find();
            return FetchDoctors;
        }
        catch (error) {
            console.log(error);
        }
    }
    async SearchDoctor(searchInp) {
        try {
            const searchDoctors = await UserSchema_1.default.find({
                fullName: { $regex: searchInp, $options: "i" },
            });
            return searchDoctors;
        }
        catch (error) {
            console.log(error);
        }
    }
    async filterDoctors(filter) {
        try {
            const filterDoctors = await UserSchema_1.default.find({ fullName: filter });
            return filterDoctors;
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchPalliativeUnit() {
        try {
            const fetchPalliativeUnit = await UnitSchema_1.default.find();
            return fetchPalliativeUnit;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addPalliativeUnit(PalliativeUnit) {
        try {
            const newPalliativeUnit = new UnitSchema_1.default(PalliativeUnit);
            const savedPalliativeUnit = await newPalliativeUnit.save();
            return savedPalliativeUnit;
        }
        catch (error) {
            console.log(error);
        }
    }
    async editPalliativeUnit(PalliativeUnit) {
        try {
            const editPalliativeUnit = await UnitSchema_1.default.findByIdAndUpdate(PalliativeUnit._id, { $set: { ...PalliativeUnit } }, { new: true });
            return editPalliativeUnit;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deletePalliativeUnit(UnitId) {
        try {
            const deletePalliativeUnit = await UnitSchema_1.default.findByIdAndDelete(UnitId);
            return deletePalliativeUnit;
        }
        catch (error) {
            console.log(error);
        }
    }
    async searchPalliativeUnit(searchInp) {
        try {
            const searchPalliativeUnit = await UnitSchema_1.default.find({
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
    }
}
exports.default = MembersAndPalliativeRepository;
