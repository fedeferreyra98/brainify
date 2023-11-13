import express from "express";
import { getAll, getById, create, update, remove } from "../controllers/hirings";

const router = express.Router();

// GetAll
router.get("/", getAll);

// GetById
router.get("/:id", getById);

// Create
router.post("/", create);

// Update
router.put("/:id", update);

// Delete
router.delete("/:id", remove);

export default router;