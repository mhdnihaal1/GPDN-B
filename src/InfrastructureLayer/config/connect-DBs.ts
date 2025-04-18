import mongoose from "mongoose";
// import { DB_NAME } from "./constant";

const connectDB = async () => {
  try {
    // const  mongo_uri =
    //        process.env.MONGODB_URI;

    if (process.env.MONGODB_URI) {
         await mongoose.connect(process.env.MONGODB_URI);
    }

  } catch (error) {
           const err: Error = error as Error;
           console.log("Error connecting to MongoDB", err);
           process.exit(1);
  }
};

export { connectDB };
 