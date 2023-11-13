import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import uuid from "uuid/v4";

const HiringSchema = new mongoose.Schema({
    id: uuid.v4(),
    providerId: String,
    service: {
        id: uuid.v4(),
        name: String,
    },
    phoneNumber: String,
    contactRange: String,
    status: String
});

HiringSchema.plugin(mongoosePaginate);
const Hiring = mongoose.model("Hiring", HiringSchema);

export default Hiring;