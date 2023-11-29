// @ts-ignore
import express from "express";

import {GetAllServices, GetServiceById, GetServicesByUser, Create, Update, Delete} from "../controllers/service.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { createServiceBodyValidator } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//GetAll
router.get("/", GetAllServices);

//GetById
router.get("/:serviceId", GetServiceById);

//GetByUserId
router.get("/user", requireToken, GetServicesByUser);

//Create
router.post("/", requireToken, createServiceBodyValidator, Create);

//Update
router.patch("/:serviceId", requireToken, createServiceBodyValidator, Update);

//Delete
router.delete("/:serviceId", requireToken , Delete);

export default router;