import commentRepository from "../repositories/comment.repository.js";

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

    async create(serviceId, content, rating){
        return commentRepository.create(serviceId, content, rating);
    }

    async getCommentById(commentId) {
        return commentRepository.getCommentById(commentId);
    }

    async updateCommentStatus(commentId, isBlocked){
        return commentRepository.updateCommentStatus(commentId, isBlocked);
    }

    checkUserAuthorization(serviceUserId, userId){
        return serviceUserId.toString() === userId.toString();
    }
}
export default new CommentService()
