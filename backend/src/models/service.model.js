import mongoose from "mongoose";
import Comment from "./comment.model.js";
import Hiring from "./hiring.model.js";

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
        maxLength: [50, "El nombre no puede tener más de 50 caracteres"],
    },
    description : {
        type : String,
        required : true,
        trim : true,
        maxLength: [255, "La descripción no puede tener más de 255 caracteres"],
    },
    category : {
        type : String,
        required : true,
    },
    frequency: {
        type: String,
        enum: ['Unica', 'Semanal', 'Mensual'],
        required: true,
    },
    cost: {
        type: Number,
        required: true,
        min: [0.99, "El costo debe ser al menos de $0.99"],
    },
    type : {
        type : String,
        enum : ['Individual', 'Grupal'],
        required : true,
    },
    duration :{
        type: Number,
        required: true,
        min: [0.5, "La Duracion no puede ser menor a 30 minutos"],
        max: [4, "La duracion no puede ser mayor a 4 horas"],
    },
    isPublished : {
        type : Boolean,
        default : false,
    },
    imageUrl: {
        type: String,
        default:"https://res.cloudinary.com/dcmqhvqqw/image/upload/v1702615757/vqtp0oyfqdyw4nw3z5c1.jpg"
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