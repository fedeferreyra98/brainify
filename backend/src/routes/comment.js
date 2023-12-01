// @ts-ignore
import express from "express";
import {getCommentsByServiceId, getAllCommentsByServiceId, getAllCommentsByUser, create, publish, Delete} from "../controllers/comment.controller.js";

const router = express.Router();

// GetByServiceId
router.get("/:serviceId", getCommentsByServiceId);

// GetAllCommentsByServiceId
router.get("/:serviceId/all", getAllCommentsByServiceId);


// GetAllCommentsByUser
router.get("/my/:_id", getAllCommentsByUser);


// Create
router.post("/", create);

// publish
router.put("/publish/:id", publish);

//Delete
router.delete("/rm/:_id", Delete);

export default router;