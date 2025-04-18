interface AppWriteOtpSend {

    sendOTP(phoneNumber: string) :Promise<string>;
}

export default AppWriteOtpSend;