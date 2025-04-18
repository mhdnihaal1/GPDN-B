
  import mongoose, { Schema, Document, Model } from "mongoose";
import IUnit from "../../DomainLayer/UnitDomain";

const unitSchema: Schema<IUnit & Document> = new Schema(
    {
      name: { type: String, required: true },
      location: { type: String, required: true },
      services: { type: String, required: true },
      contactDetails: { type: String, required: true },
    },
    { timestamps: true }  
  );

const Unit: Model<IUnit & Document> = mongoose.model<IUnit & Document>(
     "Unit",
     unitSchema
);

export default Unit;
