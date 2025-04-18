import mongoose, { Schema, Document, Model, Types } from "mongoose";
import UserRepository from "../../InfrastructureLayer/repository/UserRepository/UserRepository";
import IUser from "../../DomainLayer/UserDomain";
import generateOtp from "../../InfrastructureLayer/services/GenerateOtp";
import EncryptPassword from "../../InfrastructureLayer/services/BcryptPassword";
import SendEmail from "../../InfrastructureLayer/services/SendEmail";
import { AppWriteOtp } from "../../InfrastructureLayer/services/AppWriteOtp";
import { account } from "../../InfrastructureLayer/services/AppWriteOtp";
import JWTToken from "../../InfrastructureLayer/services/GenerateToken";


// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";

class UserUsecase {
  private UserRepository: UserRepository;
  private generateOtp: generateOtp;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private AppWriteOtp: AppWriteOtp;
  private sendEmail: SendEmail;

  constructor(
    UserRepository: UserRepository,
    generateOtp: generateOtp,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    AppWriteOtp: AppWriteOtp,
    sendEmail: SendEmail
  ) {
    this.UserRepository = UserRepository;
    this.generateOtp = generateOtp;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.AppWriteOtp = AppWriteOtp;
    this.sendEmail = sendEmail;
  }
 

  async registrationForm(
    fullName: string,
    email: string,
    phoneNumber: string,
    photo: string,
    bio: string,
    countryOfPractice: string,
    medicalQualification: string,
    yearOfGraduation: number,
    hasFormalTrainingInPalliativeCare: boolean,
    medicalRegistrationAuthority: string,
    medicalRegistrationNumber: string,
    affiliatedPalliativeAssociations: string,
    specialInterestsInPalliativeCare: string,
    role: string,
    password: string,
    registrationStatus: string
  ) {
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
      } else if (
        ExistingUser &&
        ExistingUser?.registrationStatus == "approved"
      ) {
        return {
          success: false,
          status: 400,
          data: {
            message: "User already exists.",
          },
        };
      } else if (
        ExistingUser &&
        ExistingUser?.registrationStatus == "rejected"
      ) {
        return {
          success: false,
          status: 400,
          data: {
            message: "Admin rejected user already. ",
          },
        };
      }
      const validRole = "user" ;

      const validStatus: "pending" | "approved" | "rejected" =
        registrationStatus === "pending" ||
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

      const addNewUser: IUser = { ...data };

      const newUser = await this.UserRepository.AddUser(addNewUser);

      return {
        status: 200,
        message: "User send to  admin and created successfully.",
        data: newUser,
      };
    } catch (error) {
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
  

  async editUserForm(
    _id:string,
    fullName: string, 
    photo: string,
    bio: string,
    countryOfPractice: string,
    medicalQualification: string,
    yearOfGraduation: number,
    hasFormalTrainingInPalliativeCare: boolean,
    medicalRegistrationAuthority: string,
    medicalRegistrationNumber: string,
    affiliatedPalliativeAssociations: string,
    specialInterestsInPalliativeCare: string,
    role: string,
    password: string,
    registrationStatus: string
  ) {
    try {
     
      const validRole = role ;

      const validStatus: "pending" | "approved" | "rejected" =
        registrationStatus === "pending" ||
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

      const update: IUser = { ...data };

      const updatedUser = await this.UserRepository.updateUser(update);

      if(!updatedUser){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to edit user! ,Please try later."
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:updatedUser
          ,
        };
      } 
     
    } catch (error) {
      console.log(error);
    }
  }

  

  
  async resetORforgotPasswordForm(_id:string , password:string) {
    try {

  const resetORforgotPassword = await this.UserRepository.resetORforgotPassword(_id,password);

  if(!resetORforgotPassword){
    return {
      success: false,
      status: 400,
      data:{
        message:"Failed to edit user! ,Please try later."
      },
    };
  }else{
    return {
      success: true,
      status: 200,
      data:resetORforgotPassword
      ,
    };
  } 
 
} catch (error) {
  console.log(error);
}
}

  async VerifyOtpForm(otp: number, email: string) {
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
      } else if (userOtp.otp == otp) {
        await this.UserRepository.deleteUserOtp(email);
        return {
          success: true,
          status: 200,
          data: {
            message: "Correct Otp",
          },
        };
      } else {
        return {
          success: false,
          status: 400,
          data: {
            message: "Incorrect Otp",
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  


  


  async   ContactEmailForm(  name:string , email:string , phone:string , message:string ) {
    try {

      this.sendEmail.sendContactMail(name,email,phone,message);
      return {
        success: false,
        status: 400,
        data: {
          message: "Contact mail sended successfully",
        },
      };

    } catch (error) {
      console.log(error);
    }
  }
}

export default UserUsecase;
