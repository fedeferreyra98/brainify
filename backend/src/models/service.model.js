import mongoose from "mongoose";
import Comment from "./comment.model.js";
import Hiring from "./hiring.model.js";
import { categories } from "../database/categories.hardcode.js";

const ServiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type : String,
        required : true,
        trim : true,
        maxLength: [50, "Name can not be more than 50 characters"],
    },
    description : {
        type : String,
        required : true,
        trim : true,
        maxLength: [255, "Description can not be more than 255 characters"],
    },
    category : {
        type : String,
        enum : categories.map((c) => c.toLowerCase()),
        required : true,
    },
    frequency: {
        type: String,
        enum: ['One-time', 'Weekly', 'Monthly'],
        required: true,
    },
    cost: {
        type: Number,
        required: true,
        min: [0.99, "Cost can not be less than 0.99"],
    },
    type : {
        type : String,
        enum : ['Individual', 'Grupal'],
        required : true,
    },
    duration :{
        type: Number,
        required: true,
        min: [0.5, "Duration can not be less than 30 minutes"],
        max: [4, "Duration can not be more than 4 hours"],
    },
    isPublished : {
        type : Boolean,
        default : false,
    },
    totalRatings:{
        type: Number,
        default: 0,
    },
    sumOfRatings:{
        type: Number,
        default: 0,
    },
    averageRating:{
        type: Number,
        default: 0,
    },
});

ServiceSchema.pre("deleteOne", {document: true, query: false}, async function(next){
    const serviceId = this._id;
    await Comment.deleteMany({serviceId});
    await Hiring.deleteMany({serviceId});
    next();
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;