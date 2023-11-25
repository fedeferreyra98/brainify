import mongoose from "mongoose";

try {
  // eslint-disable-next-line no-undef
  mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado a MongoDB");
} catch (error) {
  console.log(error);
}
