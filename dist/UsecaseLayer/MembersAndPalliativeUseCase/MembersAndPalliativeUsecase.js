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
class MemberAndPalliativeUsecase {
    constructor(MembersAndPalliativeRepository, generateOtp, EncryptPassword, jwtToken, AppWriteOtp, generateEmail) {
        this.MembersAndPalliativeRepository = MembersAndPalliativeRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.AppWriteOtp = AppWriteOtp;
        this.generateEmail = generateEmail;
    }
    FetchDoctorsForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const FetchDoctor = this.MembersAndPalliativeRepository.FetchDoctors();
                if (!FetchDoctor) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch doctor!."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: FetchDoctor,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    SearchDoctorsForm(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchDoctor = this.MembersAndPalliativeRepository.SearchDoctor(searchInp);
                if (!searchDoctor) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to search doctor! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: searchDoctor,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    filterDoctorsForm(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterDoctor = this.MembersAndPalliativeRepository.filterDoctors(filter);
                if (!filterDoctor) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "please try again"
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: filterDoctor,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchPalliativeUnitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPalliativeUnit = yield this.MembersAndPalliativeRepository.fetchPalliativeUnit();
                if (!fetchPalliativeUnit) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to fetch palliative unit!."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: fetchPalliativeUnit,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addPalliativeUnitForm(name, location, services, contactDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PalliativeUnit = { name, location, services, contactDetails };
                const addPalliativeUnit = yield this.MembersAndPalliativeRepository.addPalliativeUnit(PalliativeUnit);
                if (!addPalliativeUnit) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to add palliative unit! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: addPalliativeUnit,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editPalliativeUnitForm(name, location, services, contactDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PalliativeUnit = { name, location, services, contactDetails };
                const editPalliativeUnit = yield this.MembersAndPalliativeRepository.editPalliativeUnit(PalliativeUnit);
                if (!editPalliativeUnit) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to edit palliative unit! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: editPalliativeUnit,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePalliativeUnitForm(UnitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletePalliativeUnit = yield this.MembersAndPalliativeRepository.deletePalliativeUnit(UnitId);
                if (!deletePalliativeUnit) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to delete palliative unit! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: deletePalliativeUnit,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    searchPalliativeUnitForm(searchInp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchPalliativeUnit = yield this.MembersAndPalliativeRepository.searchPalliativeUnit(searchInp);
                if (!searchPalliativeUnit) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to search palliative unit! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: searchPalliativeUnit,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = MemberAndPalliativeUsecase;
