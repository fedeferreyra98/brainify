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
<<<<<<< HEAD
router.get("/user/:userId", requireToken, GetServicesByUser);
=======
router.get("/user", requireToken, GetServicesByUser);
>>>>>>> dfb6964 (Feat(service): Implements middleware authentication in service endpoints)

//Create
router.post("/", requireToken, createServiceBodyValidator, Create);

//Update
router.patch("/:serviceId", requireToken, createServiceBodyValidator, Update);

//Delete
<<<<<<< HEAD
router.delete("/:serviceId", requireToken, Delete);
=======
router.delete("/:serviceId", requireToken , Delete);
>>>>>>> dfb6964 (Feat(service): Implements middleware authentication in service endpoints)



export default router;