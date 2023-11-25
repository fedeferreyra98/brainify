import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  content: {
    type: String,
    trim: true,
    maxLength: [255, "El contenido no puede exceder los 255 caracteres"],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  isBlocked: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;