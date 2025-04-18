import mongoose, { Schema, Document, Model } from "mongoose";
import IAdmin from "../../DomainLayer/AdminDomain";

const adminSchema: Schema<IAdmin & Document> = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        password: { type: String, required: true },
        role: {
          type: String,
          enum: ['superadmin', 'moderator', 'editor'],
          required: true,
        },
        permissions: { type: [String], default: [] },
      },
  {
    timestamps: true, 
  }
);

const Admin: Model<IAdmin & Document> = mongoose.model<IAdmin & Document>(
     "Admin",
      adminSchema
);

export default Admin;
