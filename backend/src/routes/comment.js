// @ts-ignore
import express from "express";
import {getCommentsByServiceId, getAllCommentsByServiceId, create, update} from "../controllers/comment.controller.js";

const router = express.Router();

// GetByServiceId
router.get("/:serviceId", getCommentsByServiceId);

// GetAllCommentsByServiceId
router.get("/:serviceId/all", getAllCommentsByServiceId);

// Create
router.post("/", create);

// Update
router.put("/:id", update);

export default router;