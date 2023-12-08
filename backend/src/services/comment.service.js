/* eslint-disable no-unused-vars */
import commentRepository from "../repositories/comment.repository.js";
import serviceRepository from "../repositories/service.repository.js";

class CommentService {
    async getCommentsByServiceId(serviceId){
        let comments =  await commentRepository.getCommentsByServiceId(serviceId);
        if (!comments) {
            throw new Error("Comments not found");
        }
        const publishedComments = comments.map((comment) => {
            if (comment.isBlocked) {
                const { content, ...rest} = comment;
                return rest;
            }
            return comment;
        });
        return publishedComments;
    }

    async getAllCommentsByServiceId(serviceId){
        const comments = await commentRepository.getCommentsByServiceId(serviceId);
        if (!comments) {
            throw new Error("Comments not found");
        }
        return comments;
    }

    async getAllCommentsByUserId(userId) {
        const userServices = await serviceRepository.getByUserId(userId);
        if (!userServices) {
            throw new Error("Services not found");
        }
        const userServicesIds = userServices.map((service) => service._id);
    
        // Fetch comments for each service and flatten the result
        const commentsPromises = userServicesIds.map(serviceId =>
            commentRepository.getCommentsByServiceId(serviceId)
        );
        try {
            const commentsArrays = await Promise.all(commentsPromises);
            const allComments = commentsArrays.flat();
            return allComments;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(serviceId, content, rating){
        return commentRepository.create(serviceId, content, rating);
    }

    async getCommentById(commentId) {
        return commentRepository.getCommentById(commentId);
    }

    async updateCommentStatus(commentId, status){
        return commentRepository.updateCommentStatus(commentId, status);
    }

    async delete(commentId) {
        return commentRepository.delete(commentId);
    }

    checkUserAuthorization(serviceUserId, userId){
        return serviceUserId.toString() === userId.toString();
    }
}
export default new CommentService()
