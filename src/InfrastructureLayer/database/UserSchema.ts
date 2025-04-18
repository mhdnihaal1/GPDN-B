import mongoose, { Schema, Document, Model } from "mongoose";
import IUser from "../../DomainLayer/UserDomain";

const userSchema: Schema<IUser & Document> = new Schema(
  {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phoneNumber: { type: String, required: true },
      photo: { type: String, default: "" }, 
      bio: { type: String, default: "" },
      countryOfPractice: { type: String, required: true },
      medicalQualification: { type: String, required: true },
      yearOfGraduation: { type: Number, required: true },
      hasFormalTrainingInPalliativeCare: { type: Boolean, default: false },
      medicalRegistrationAuthority: { type: String, required: true },
      medicalRegistrationNumber: { type: String, required: true },
      affiliatedPalliativeAssociations: { type: String, default: "" },
      specialInterestsInPalliativeCare: { type: String, default: "" },
      role: { type: String, enum: ["user"], default: "user", immutable: true },
      password: { type: String, required: true },
      registrationStatus: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
    },
  },
  {
    timestamps: true, 
  }
);

const User: Model<IUser & Document> = mongoose.model<IUser & Document>(
     "User",
      userSchema
);

export default User;
