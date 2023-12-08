import Comment from '../models/comment.model.js';
import Service from '../models/service.model.js';

class CommentRepository{

    async getCommentsByServiceId(serviceId){
        try {
            const comments = await Comment.find({ serviceId }).lean().exec();
            return comments;
          } catch (error) {
            // Handle any errors here
            console.error(error);
            throw error; // Optional: Rethrow the error to propagate it to the caller
          }    
    }

    async create(serviceId, content, rating){
        const comment = await Comment.create({serviceId, content, rating});
        const service = await Service.findById(serviceId);
        if (!service) {
            throw new Error('Service not found');
        }
        await updateServiceRatings(service, rating);
        return comment;
    }

    async getCommentById(commentId) {
        return await Comment.findById(commentId).lean();
    }

    async updateCommentStatus(commentId, status){
        const comment = await Comment.findById(commentId);
        comment.isBlocked = status;
        await comment.save();
        return comment; 
    }

    async delete(id){
        const Service = await Comment.findById(id);
        await Service.deleteOne();
    }
}

const updateServiceRatings = async (service, rating) => {
    service.totalRatings += 1;
    service.sumOfRatings += parseInt(rating);
    service.averageRating = parseFloat((service.sumOfRatings / service.totalRatings).toFixed(1));
    await service.save();
}

export default new CommentRepository();