"use strict";
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
    async registrationForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus) {
        try {
            const ExistingUser = await this.UserRepository.findByEmail(email);
            if (ExistingUser && ExistingUser?.registrationStatus == "pending") {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "User request already send to  admin.",
                    },
                };
            }
            else if (ExistingUser &&
                ExistingUser?.registrationStatus == "approved") {
                return {
                    success: false,
                    status: 400,
                    data: {
                        message: "User already exists.",
                    },
                };
            }
            else if (ExistingUser &&
                ExistingUser?.registrationStatus == "rejected") {
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
                password,
                registrationStatus: validStatus,
            };
            const addNewUser = { ...data };
            const newUser = await this.UserRepository.AddUser(addNewUser);
            return {
                status: 200,
                message: "User send to  admin and created successfully.",
                data: newUser,
            };
        }
        catch (error) {
            console.log(error);
        }
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
    async editUserForm(_id, fullName, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus) {
        try {
            const validRole = role;
            const validStatus = registrationStatus === "pending" ||
                registrationStatus === "approved" ||
                registrationStatus === "rejected"
                ? registrationStatus
                : "pending";
            const data = {
                _id,
                fullName,
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
                password,
                registrationStatus: validStatus,
            };
            const update = { ...data };
            const updatedUser = await this.UserRepository.updateUser(update);
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
    }
    async resetORforgotPasswordForm(_id, password) {
        try {
            const resetORforgotPassword = await this.UserRepository.resetORforgotPassword(_id, password);
            if (!resetORforgotPassword) {
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
                    data: resetORforgotPassword,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async VerifyOtpForm(otp, email) {
        try {
            const userOtp = await this.UserRepository.findUserOtp(email);
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
                await this.UserRepository.deleteUserOtp(email);
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
    }
    async ContactEmailForm(name, email, phone, message) {
        try {
            this.sendEmail.sendContactMail(name, email, phone, message);
            return {
                success: false,
                status: 400,
                data: {
                    message: "Contact mail sended successfully",
                },
            };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = UserUsecase;
