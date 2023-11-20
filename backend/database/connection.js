import mongoose from "mongoose";
import process from "process";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado a MongoDB");
} catch (error) {
  console.log(error);
}
