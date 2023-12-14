// @ts-ignore
import express from "express";

import {GetAllServices, GetServiceById, GetServicesByUser, Create, Update, Delete, GetTop3Services} from "../controllers/service.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { createServiceBodyValidator } from "../middlewares/validationResultExpress.js";

const router = express.Router();


router.get("/", GetAllServices);
router.get("/top3", GetTop3Services);
router.get("/user", requireToken, GetServicesByUser);
router.get("/:serviceId", GetServiceById);
router.post("/", requireToken, createServiceBodyValidator, Create);
router.patch("/:serviceId", requireToken, createServiceBodyValidator, Update);
router.delete("/:serviceId", requireToken , Delete);

export default router;