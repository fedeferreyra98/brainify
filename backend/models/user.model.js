import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: Date,
    updatedAt: Date
    });

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

export default User;