import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from "bcryptjs";

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique : [true, 'Email already exists'],
        required : [true, 'Email is required'],
        trim : true,
    },
    password: {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : String,
        required : true,
    },
    degree : {
        type : String,
        maxLength : [50, 'Degree can not be more than 50 characters'],
        trim : true,
    },
    experience : {
        type : String,
        maxLength : [255, 'Experience can not be more than 255 characters'],
        trim : true,
    },
    profileImage : {
        type : String,
        default : 'default.jpg'
    },
    createdAt: Date,
    updatedAt: Date
    });

    UserSchema.pre('save',  async function(next) {
        const user = this;

        if (!user.isModified('password')) return next();

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            next();
        } catch (error) {
            console.log(error);
            throw new Error("Error while hashing the password");
        }
    });

    UserSchema.methods.comparePassword = async function(password) {
        const user = this;
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            return isMatch;
        } catch (error) {
            console.log(error);
            throw new Error("Error while comparing the password");
        }
    }

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

export default User;