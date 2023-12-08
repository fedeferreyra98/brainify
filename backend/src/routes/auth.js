// @ts-ignore
import express from "express";
import { register, login, requestPasswordReset, resetPassword, validateToken } from "../controllers/authentication.controller.js"; 
import { loginBodyValidator, registerBodyValidator } from "../middlewares/validationResultExpress.js";
const router = express.Router();

// Define routes

//Register
router.post('/register', registerBodyValidator, register);

//Login
router.post('/login', loginBodyValidator, login);

//Request password reset
router.post('/request-password-reset', requestPasswordReset);

//Reset password
router.post('/reset-password', resetPassword);

//Validate Token
router.post('/validate-token', validateToken);

export default router;