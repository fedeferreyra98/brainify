import CommentService from "../services/comment.service.js";
import ServiceService from "../services/service.service.js";
import { handleError } from "../utils/web/error.js";

export const  getCommentsByServiceId = async (req, res) => { 
    try {
        const comments = await CommentService.getCommentsByServiceId(req.params.serviceId);
        res.status(200).send(comments);
    } catch (error) {
        return handleError(res, error);
    };
};

export const  create = async (req, res) => {
    try {
        const {content, rating} = req.body;
        const comment = await CommentService.create(
            req.params.serviceId,
            content,
            rating
        );
        return res.status(201).json({comment});
    } catch (error) {
        return handleError(res, error);
    };
};

export const  update = async (req, res) => {
    try {
        const comment = await CommentService.getCommentById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        const service = await ServiceService.getById(comment.serviceId);
        if (!CommentService.checkUserAuthorization(service.userId, req.user.id)) {
            return res.status(403).json({ message: "No tienes permiso para editar este comentario" });
        }
        const updatedComment = await CommentService.update(
            req.params.commentId,
            req.body.isBlocked
        );
        return res.status(204).json({ updatedComment });
    } catch (error) {
        return handleError(res, error);
    };
}