// @ts-ignore
import express from "express";
import {getByServiceId, getByUserId, create, updateHiring, attachServiceNameToHiring } from "../controllers/hiring.controller.js";
import { createHiringBodyValidator, updateHiringBodyValidator } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = express.Router();

router.get("/:serviceId", getByServiceId);
router.get("/user/:userId", getByUserId);
router.post("/:serviceId", createHiringBodyValidator, create);
router.patch("/:hiringId", requireToken, updateHiringBodyValidator, updateHiring);
//AttachServiceNameToHiring todo: Buscar una mejor forma de hacer esto
router.post("/attachServiceNameToHiring", attachServiceNameToHiring);

export default router;