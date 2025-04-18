import { Client, Account, ID } from "node-appwrite";
import AppWriteOtpSend from "../../UsecaseLayer/Interface/AppWriteOtp";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("67d6d15500070be0d761"); 

export const account = new Account(client);


export class AppWriteOtp implements AppWriteOtpSend {

async  sendOTP(phoneNumber: string):Promise<string> {// country code is requires
  try {
    const session = await account.createPhoneToken(ID.unique(), phoneNumber);
    console.log("OTP sent successfully!", session);
    // console.log(session.secret)
     return session?.userId; 
      } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

}


