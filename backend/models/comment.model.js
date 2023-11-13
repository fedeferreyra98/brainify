import mongoose from "mongoose";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import uuid from "uuid/v4";

const CommentSchema = new mongoose.Schema({
    id: uuid.v4(),
    username: String,
    serviceName: String,
    commentSummary: String,
    commentBody: String,
    rating: Number,
    date: Date
});

CommentSchema.plugin(mongoosePaginate);
const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;