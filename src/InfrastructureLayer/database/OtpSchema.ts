import mongoose, { Model, Schema, Document } from "mongoose";
import IOtp from "../../DomainLayer/OtpDomain";

const otpSchema: Schema = new Schema<IOtp>({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  password: { type: String },
  otp: { type: Number, required: true },
  otpGeneratedAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 180,        
  },
});

const Otp: Model<IOtp & Document> = mongoose.model<IOtp & Document>(
  "Otp",
  otpSchema
);

export default Otp;

