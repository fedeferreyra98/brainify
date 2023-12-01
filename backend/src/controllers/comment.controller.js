import CommentService from "../services/comment.service.js";
import ServiceService from "../services/service.service.js";
import { handleError } from "../utils/web/error.js";

export const  getCommentsByServiceId = async (req, res) => { 
    try {
        const comments = await CommentService.getCommentsByServiceId(req.params.serviceId);
        res.status(200).send(comments);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getAllCommentsByServiceId = async (req, res) => {
    try {
        const service = await ServiceService.getById(req.params.serviceId);
        if (!service) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        if (!CommentService.checkUserAuthorization(service.userId, req.user.id)) {
            return res.status(403).json({ message: "No tienes permiso para ver estos comentarios" });
        }

        const comments = await CommentService.getAllCommentsByServiceId(req.params.serviceId);
        return res.status(200).json({ comments });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getAllCommentsByUser = async (req, res) => {
    try {
        const userId = req.params._id;
        const comments = await CommentService.getAllCommentsByUserId(userId);
        return res.status(200).json({ comments });
    } catch (error) {
        return handleError(res, error);
    }
}

export const  create = async (req, res) => {
    try {
        const {content, rating} = req.body;
        const comment = await CommentService.create(
            req.body.serviceId,
            content,
            rating
        );
        return res.status(201).json({comment});
    } catch (error) {
        return handleError(res, error);
    }
};

export const  publish = async (req, res) => {
    try {
        const comment = await CommentService.getCommentById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        const updatedComment = await CommentService.updateCommentStatus( req.params.id );
        return res.status(204).json({ updatedComment });
    } catch (error) {
        return handleError(res, error);
    }
}

export const Delete = async (req, res) => {
    try {
        const commentId = req.params._id;
        const comment = await CommentService.delete(commentId);
        return res.status(200).json({comment});
    } catch (error) {
        return handleError(res, error);
    }
};