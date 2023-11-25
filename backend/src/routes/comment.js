// @ts-ignore
import express from "express";
import {getCommentsByServiceId, create, update} from "../controllers/comment.controller.js";

const router = express.Router();

// GetByServiceId
router.get("/", getCommentsByServiceId);

// Create
router.post("/", create);

// Update
router.put("/:id", update);

export default router;