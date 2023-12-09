import mongoose from "mongoose";

const HiringSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    serviceId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    contactEmail : {
        type : String,
        required : true,
        trim : true,
    },
    message : {
        type : String,
        required : true,
        trim : true,
        maxLength: [255, "Message can not be more than 255 characters"],
    },
    phoneNumber : {
        type : String,
        required : true,
    },
    preferredContactTime : {
        type : String,
        enum : ['Mañana', 'Tarde', 'Noche'],
        required : true,
    },
    contractStatus : {
        type : String,
        enum : ['Pending', 'Accepted', 'Rejected'],
        default : 'Pending',
    },
});

const Hiring = mongoose.model("Hiring", HiringSchema);

export default Hiring;