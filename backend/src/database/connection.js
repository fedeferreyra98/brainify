import mongoose from "mongoose";

try {
  // eslint-disable-next-line no-undef
  mongoose.connect('mongodb+srv://admin:uade1234@brainifymongo.fcogziw.mongodb.net/');
  console.log("Conectado a MongoDB");
} catch (error) {
  console.log(error);
}
