// @ts-ignore
import express from "express";

import {GetAllServices, GetServiceById, GetServicesByUserId, Create, Update, Delete} from "../controllers/service.controller.js";

const router = express.Router();

//GetAll
router.get("/", GetAllServices);

//GetById
router.get("/:serviceId", GetServiceById);

//GetByUserId
router.get("/user/:userId", GetServicesByUserId);

//Create
router.post("/", Create);

//Update
router.patch("/:serviceId", Update);

//Delete
router.delete("/:serviceId", Delete);



export default router;