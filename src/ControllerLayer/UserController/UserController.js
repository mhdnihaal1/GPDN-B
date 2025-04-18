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
class UserController {
    constructor(UserUsecase) {
        this.UserUsecase = UserUsecase;
    }
    Register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus } = req.body;
                // if (
                // ) {
                //   return res.status(400).json({
                //     success: false,
                //     status:400,
                //     message: "Missing required fields.",
                //   });
                // }
                const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                console.log((_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer, req.file, photo);
                if (!file) {
                    return res.status(400).json({ error: "No file uploaded" });
                }
                // const fileStream = fs.createReadStream(file.path);
                // console.log("file test :" , fileStream)
                return;
                // const result = await storage.createFile(
                //   'your-bucket-id',
                //   ID.unique(),
                //   fileStream,
                //   file.originalname // Pass the name explicitly
                // );
                const registrationForm = yield this.UserUsecase.registrationForm(fullName, email, phoneNumber, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus);
                return res.json({
                    success: registrationForm === null || registrationForm === void 0 ? void 0 : registrationForm.success,
                    status: registrationForm === null || registrationForm === void 0 ? void 0 : registrationForm.status,
                    data: registrationForm === null || registrationForm === void 0 ? void 0 : registrationForm.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // async Login(req: Request, res: Response, next: NextFunction) {
    // try {
    //     const { phoneNumber } = req.body;
    //     const otpSession  = await this.UserUsecase.loginForm( phoneNumber)
    //     console.log('oncontroller',otpSession)
    //   //   const userid = otpSession?.data?.message?.userId;
    //   //   console.log(userId)
    //   //   return null
    //   //   if (otpSession?.userId) {
    //   //     // req.session.otpUserId = otpSession.userId;
    //   // } else {
    //   //     return {
    //   //         success: false,
    //   //         status: 500,
    //   //         data: {
    //   //             message: "Failed to generate OTP.",
    //   //         },
    //   //     };
    //   // }
    //     return res.json({
    //       status: otpSession?.status,
    //       data: otpSession?.data,
    //     });
    // }catch(error){
    //   console.log(error)
    // }
    // }
    // async Verify(req: Request, res: Response, next: NextFunction) {
    //   try {
    //       const { userId , verificationCode } = req.body;
    //       const otpSession = await this.UserUsecase.verifyForm(  userId , verificationCode )
    //         if (otpSession?.userId) {
    //                     // req.session.otp = otpSession.userId;
    //                 } else {
    //                     return {
    //                         success: false,
    //                         status: 500,
    //                         data: {
    //                             message: "Failed to generate OTP.",
    //                         },
    //                     };
    //                 }
    //       // return res.json({
    //       //   status: otpSession?.status,
    //       //   data: otpSession?.data,
    //       // });
    //   }catch(error){
    //     console.log(error)
    //   }
    //   }
    EditUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, fullName, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus, } = req.body;
                if (_id ||
                    !fullName ||
                    !photo ||
                    !bio ||
                    !countryOfPractice ||
                    !medicalQualification ||
                    !yearOfGraduation ||
                    !hasFormalTrainingInPalliativeCare ||
                    !medicalRegistrationAuthority ||
                    !medicalRegistrationNumber ||
                    !affiliatedPalliativeAssociations ||
                    !specialInterestsInPalliativeCare ||
                    !role ||
                    !password ||
                    !registrationStatus) {
                    return res.json({
                        success: false,
                        status: 400,
                        data: {
                            message: "Missing required fields."
                        }
                    });
                }
                const updateUserForm = yield this.UserUsecase.editUserForm(_id, fullName, photo, bio, countryOfPractice, medicalQualification, yearOfGraduation, hasFormalTrainingInPalliativeCare, medicalRegistrationAuthority, medicalRegistrationNumber, affiliatedPalliativeAssociations, specialInterestsInPalliativeCare, role, password, registrationStatus);
                return res.json({
                    success: updateUserForm === null || updateUserForm === void 0 ? void 0 : updateUserForm.success,
                    status: updateUserForm === null || updateUserForm === void 0 ? void 0 : updateUserForm.status,
                    data: updateUserForm === null || updateUserForm === void 0 ? void 0 : updateUserForm.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ResetORForgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, password } = req.body;
                const resetORforgotPassword = yield this.UserUsecase.resetORforgotPasswordForm(_id, password);
                return res.json({
                    success: resetORforgotPassword === null || resetORforgotPassword === void 0 ? void 0 : resetORforgotPassword.success,
                    status: resetORforgotPassword === null || resetORforgotPassword === void 0 ? void 0 : resetORforgotPassword.status,
                    data: resetORforgotPassword === null || resetORforgotPassword === void 0 ? void 0 : resetORforgotPassword.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    VerifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const verifyOtp = yield this.UserUsecase.VerifyOtpForm(otp, email);
                return res.json({
                    success: verifyOtp === null || verifyOtp === void 0 ? void 0 : verifyOtp.success,
                    status: verifyOtp === null || verifyOtp === void 0 ? void 0 : verifyOtp.status,
                    data: verifyOtp === null || verifyOtp === void 0 ? void 0 : verifyOtp.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ContactEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, message } = req.body.formData;
                console.log('am on', req.body, name);
                const ContactEmail = yield this.UserUsecase.ContactEmailForm(name, email, phone, message);
                return res.json({
                    success: ContactEmail === null || ContactEmail === void 0 ? void 0 : ContactEmail.success,
                    status: ContactEmail === null || ContactEmail === void 0 ? void 0 : ContactEmail.status,
                    data: ContactEmail === null || ContactEmail === void 0 ? void 0 : ContactEmail.data,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserController;
