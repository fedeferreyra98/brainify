import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import uuid from "uuid/v4";

const ProviderSchema = new mongoose.Schema({
    Id : uuid.v4(),
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    title: String,
    experience: String,
    profilePicture: String,
});

ProviderSchema.plugin(mongoosePaginate);
const Provider = mongoose.model("Provider", ProviderSchema);

export default Provider;
