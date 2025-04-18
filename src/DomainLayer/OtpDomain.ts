
 interface IOtp extends Document {
  _id?: string;
  name?: string;
  email: string;
  phone?: string;
  password?: string;
  otp: number;
  otpGeneratedAt?: Date;
}

export default IOtp;
