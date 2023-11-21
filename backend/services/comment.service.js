import commentRepository from "../repositories/comment.repository";

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
        return await commentRepository.create(serviceId, content, rating);
    };

    async getCommentById(commentId) {
        return await commentRepository.getCommentById(commentId);
    };

    async updateCommentStatus(commentId, isBlocked){
        return await commentRepository.updateCommentStatus(commentId, isBlocked);
    };

    checkUserAuthorization(serviceUserId, userId){
        return serviceUserId.toString() === userId.toString();
    };
}
