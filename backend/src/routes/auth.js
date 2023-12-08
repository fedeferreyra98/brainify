// @ts-ignore
import express from "express";
import { register, login, requestPasswordReset, resetPassword, changePassword,  validateToken } from "../controllers/authentication.controller.js"; 
import { loginBodyValidator, registerBodyValidator } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
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

//Change password
router.post('/change-password', requireToken, changePassword);
//Validate Token
router.post('/validate-token', validateToken);

export default router;