import mongoose, { Schema, Document, Model } from "mongoose";
import ICategory from "../../DomainLayer/CategoryDomain";

const categorySchema: Schema<ICategory & Document> = new Schema(
    {
      category: { type: String, required: true },
    },
    { timestamps: true } 
  );

const Category: Model<ICategory & Document> = mongoose.model<ICategory & Document>(
     "Category",
      categorySchema
);

export default Category;
