import express from "express";
import {getAll, getById, getByHiringId, getByRatingRange, create, update, remove} from "../controllers/comment.js";

const router = express.Router();

// GetAll
router.get("/", getAll);

// GetById
router.get("/:id", getById);

// GetByHiringId
router.get("/hiring/:id", getByHiringId);

//GetByRatingRange
router.get("/rating/:min/:max", getByRatingRange);

// Create
router.post("/", create);

// Update
router.put("/:id", update);

// Delete
router.delete("/:id", remove);

export default router;