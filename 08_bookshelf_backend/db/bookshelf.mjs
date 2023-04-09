import mongoose from "mongoose";
import env from "dotenv";
env.config();
const uri = process.env.MONGO_URI;
export default mongoose.connect(uri);