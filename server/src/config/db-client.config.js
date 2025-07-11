import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  try {
    if (!dbUri || !dbName) {
      throw new Error("Database Url and Name is required to connect MongoDB.");
    }
    const dbUrl = `${dbUri}/${dbName}`;
    await mongoose.connect(dbUrl);
    mongoose.set("debug", true);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
