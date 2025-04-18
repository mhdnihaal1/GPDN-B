import IUser from "../../../DomainLayer/UserDomain";
import UserSchema from "../../database/UserSchema";

import UserRepo from "../../../UsecaseLayer/Interface/UserRepo";
import IOtp from "../../../DomainLayer/OtpDomain";
import OtpSchema from "../../database/OtpSchema";
import BlogSchema from "../../database/BlogSchema";
import IBlog from "../../../DomainLayer/BlogDomain.";

class UserRepository implements UserRepo {


  async findByEmail(email: string): Promise<IUser | any> {
    try {
      const User = await UserSchema.findOne({ email: email });
      return {
        success: false,
        status: 409,
        data:User,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async AddUser(addNewUser: IUser): Promise<IUser | any> {
    try {
      const newUser = new UserSchema(addNewUser);
      const savedUser = await newUser.save();
      return savedUser.toObject() as IUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async AddOtp(email: string, otp: number): Promise<IOtp | any> {
    try {
      const newOtp = new OtpSchema({
        email,
        otp,
        otpGeneratedAt: new Date(),
      });

      const savedOtp = await newOtp.save();
      return savedOtp.toObject() as IOtp;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  
  async updateUser(update: IUser): Promise<IUser | null> {
    try {
      const updatedUser = await UserSchema.findByIdAndUpdate(
        update._id,
        update,
        { new: true }  
      );
  
      return updatedUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  

  async resetORforgotPassword(_id: string, password: string): Promise<IUser | any> {
    try {
      const resetORforgotPassword = await UserSchema.findByIdAndUpdate(
        _id,
       { $set: { password } }, 
       { new: true }
     );
      return resetORforgotPassword;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  

  async findUserOtp(email: string): Promise<IOtp | any> {
    try {
      const UserOtp = await OtpSchema.findOne({ email : email });
      return UserOtp;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteUserOtp(email: string): Promise<IOtp | any> {
    try {
      const deletedUser = await OtpSchema.deleteOne({ email : email });
      return deletedUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  async findUserByNumber(phoneNumber: string): Promise<IUser | any> {
    try{

      const user = await UserSchema.findOne({ phoneNumber: phoneNumber });
      return user;
    }catch(error){
      console.log(error)
    }
  }
}

export default UserRepository;
