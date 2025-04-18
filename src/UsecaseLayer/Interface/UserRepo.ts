import IOtp from "../../DomainLayer/OtpDomain";
import IUser from "../../DomainLayer/UserDomain";    


interface UserRepo {

    findByEmail(email: string): Promise<IUser | any> ;
    AddUser(addNewUser: IUser): Promise<IUser | any> ;
    AddOtp(email: string, otp: number): Promise<IOtp | any> ;
    findUserOtp(email: string): Promise<IOtp | any> ;
    deleteUserOtp(email: string): Promise<void | any> ;
    findUserByNumber(phoneNumber: string): Promise<IUser | any> ;
    
  
}

export default UserRepo;