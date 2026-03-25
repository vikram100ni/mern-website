import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    (await mongoose.connect(process.env.MONGO_URI),
      {
        serverSelectionTimeoutMS: 5000,
      });
    console.log("database connected successfully");
  } catch (error) {
    console.log("db error", error.message);
  }
};
