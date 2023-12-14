// @ts-ignore
import express from "express";
import {getCommentsByServiceId, getAllCommentsByServiceId, getTop3CommentsByServiceId, getAllCommentsByUser, create, updateCommentStatus, deleteComment} from "../controllers/comment.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { createCommentBodyValidator } from "../middlewares/validationResultExpress.js";


const router = express.Router();

router.get("/:serviceId", getCommentsByServiceId);
router.get("/:serviceId/all", getAllCommentsByServiceId);
router.get("/:serviceId/top3", getTop3CommentsByServiceId);
router.get("/my/:_id", getAllCommentsByUser); // TODO: Integrar usando ambos controllers para el frontend.
router.post("/:serviceId", createCommentBodyValidator, create);
router.patch("/:commentId", requireToken, updateCommentStatus);
router.delete("/rm/:commentId", requireToken, deleteComment);
export default router;