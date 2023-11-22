import Comment from '../models/comment.model.js';
import Service from '../models/service.model.js';

class CommentRepository{

    async getCommentsByServiceId(serviceId){
        return await Comment.findById({serviceId}).lean();
    };

    async create(serviceId, content, rating){
        const comment = await Comment.create({serviceId, content, rating});
        const service = await Service.findById(serviceId);
        if (!service) {
            throw new Error('Service not found');
        }
        await updateServiceRatings(service, rating);
        return comment;
    };

    async getCommentById(commentId) {
        return await Comment.findById(commentId).lean();
    };

    async updateCommentStatus(commentId, isBlocked){
        const comment = await Comment.findById(commentId);
        comment.isBlocked = isBlocked;
        await comment.save();
        return comment;
    };
}

const updateServiceRatings = async (service, rating) => {
    service.totalRatings += 1;
    service.sumOfRatings += parseInt(rating);
    service.averageRating = parseFloat(service.sumOfRatings / service.totalRatings).toFixed(1);
    await service.save();
}

export default new CommentRepository();