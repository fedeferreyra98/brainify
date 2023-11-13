import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import uuid from "uuid/v4";

const ServiceSchema = new mongoose.Schema({
    id: uuid.v4(),
    name: String,
    category: String,
    classType: String,
    frequency: String,
    duration: String,
    price: Number,
    description: String,
    provider: {
        id: uuid.v4(),
        firstName: String,
        lastName: String,
        email: String,
        state: String,
    }
});

ServiceSchema.plugin(mongoosePaginate);
const Service = mongoose.model("Service", ServiceSchema);

export default Service;