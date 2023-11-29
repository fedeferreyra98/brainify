// @ts-ignore
import express from "express";
import {getByServiceId, getByUserId, create, updateHiring, attachServiceNameToHiring } from "../controllers/hiring.controller.js";

const router = express.Router();

// GetByServiceId
router.get("/:serviceId", getByServiceId);

// GetByUserId
router.get("/:userId", getByUserId);

// Create
router.post("/:serviceId", create);

// Update
router.put("/:hiringId", updateHiring);

//AttachServiceNameToHiring todo: Buscar una mejor forma de hacer esto
router.post("/attachServiceNameToHiring", attachServiceNameToHiring);

export default router;