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
// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";
class UserUsecase {
    constructor(UserRepository, generateOtp, EncryptPassword, jwtToken, AppWriteOtp, sendEmail) {
        this.UserRepository = UserRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.AppWriteOtp = AppWriteOtp;
        this.sendEmail = sendEmail;
    }
    registrationForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ExistingUser = yield this.UserRepository.findByEmail(email);
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
                const EncryptPass = yield this.EncryptPassword.encryptPassword(password);
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
                    password: EncryptPass,
                    registrationStatus: validStatus,
                };
                const addNewUser = Object.assign({}, data);
                const newUser = yield this.UserRepository.AddUser(addNewUser);
                return {
                    status: 200,
                    message: "User send to  admin and created successfully.",
                    data: newUser,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // async loginForm(phoneNumber: string) {
    //   try {
    //     const findUserByNumber =
    //       await this.UserRepository.findUserByNumber(phoneNumber);
    //     if (
    //       findUserByNumber &&
    //       findUserByNumber?.registrationStatus == "pending"
    //     ) {
    //       console.log(1);
    //       return {
    //         success: false,
    //         status: 409,
    //         data: {
    //           message: "Admin didn't accept request yet.",
    //         },
    //       };
    //     } else if (
    //       findUserByNumber &&
    //       findUserByNumber?.registrationStatus == "rejected"
    //     ) {
    //       console.log(1);
    //       return {
    //         success: false,
    //         status: 409,
    //         data: {
    //           message: "Admin rejected your request !",
    //         },
    //       };
    //     } else if (findUserByNumber) {
    //       console.log(12);
    //       const otpSession = await this.AppWriteOtp.sendOTP(phoneNumber);
    //       return {
    //         success: true,
    //         status: 200,
    //         data: {
    //           message: otpSession,
    //         },
    //       };
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // async verifyForm(userId: string, verificationCode: string) {
    //   try {
    //     const session = await account.createSession(userId, verificationCode);
    //     console.log("last session  ", session);
    //     return session;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    editUserForm(_id, fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`
        _id: ${_id}
        fullName: ${fullName}
        email: ${email}
        phoneNumber: ${phoneNumber}
        photo: ${photo}
        bio: ${bio}
        countryOfPractice: ${countryOfPractice}
        medicalQualification: ${medicalQualification}
        yearOfGraduation: ${yearOfGraduation}
        hasFormalTrainingInPalliativeCare: ${hasFormalTrainingInPalliativeCare}
        medicalRegistrationAuthority: ${medicalRegistrationAuthority}
        medicalRegistrationNumber: ${medicalRegistrationNumber}
        affiliatedPalliativeAssociations: ${affiliatedPalliativeAssociations}
        specialInterestsInPalliativeCare: ${specialInterestsInPalliativeCare}
        password: ${password}
      `);
                if (password) {
                    password = yield this.EncryptPassword.encryptPassword(password);
                }
                console.log(password);
                const data = {
                    _id,
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
                    password,
                };
                const update = Object.assign({}, data);
                const updatedUser = yield this.UserRepository.updateUser(update);
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
                        data: updatedUser,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resetORforgotPasswordForm(_id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const EncryptPass = yield this.EncryptPassword.encryptPassword(password);
                const resetORforgotPassword = yield this.UserRepository.resetORforgotPassword(_id, EncryptPass);
                if (!resetORforgotPassword) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Failed to change resetORforgot password! ,Please try later."
                        },
                    };
                }
                else {
                    return {
                        success: true,
                        status: 200,
                        data: resetORforgotPassword,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    VerifyOtpForm(otp, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userOtp = yield this.UserRepository.findUserOtp(email);
                if (!userOtp) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Otp expired",
                        },
                    };
                }
                else if (userOtp.otp == otp) {
                    yield this.UserRepository.deleteUserOtp(email);
                    return {
                        success: true,
                        status: 200,
                        data: {
                            message: "Correct Otp",
                        },
                    };
                }
                else {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Incorrect Otp",
                        },
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ContactEmailForm(name, email, phone, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const mail = emailRegex.test(email);
                if (!mail) {
                    return {
                        success: false,
                        status: 400,
                        data: {
                            message: "Enter a valid email",
                        },
                    };
                }
                this.sendEmail.sendContactMail(name, email, phone, message);
                return {
                    success: true,
                    status: 200,
                    data: {
                        message: "Contact mail sended successfully",
                    },
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserUsecase;
