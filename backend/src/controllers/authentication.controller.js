import AuthenticationService from "../services/authentication.service.js";
import { verifyToken } from "../utils/tokenManager.js";
import {handleError} from "../utils/web/error.js";
import {sendPasswordResetEmail} from "../services/sendGrid.service.js";
// @ts-ignore
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password, phoneNumber} = req.body;
        const leanUser = await AuthenticationService.createUser({
            firstName, 
            lastName, 
            email, 
            password, 
            phoneNumber,
            degree: "",
            experience: "",});
        const {token, expiresIn} = await AuthenticationService.authenticateUser(leanUser._id);
        return res.status(201).json({user: leanUser, jwt: {token, expiresIn}});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already exists"});
        }
        return handleError(res, error);
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await AuthenticationService.findUserByEmail(email);
        if (user === null) {
            return res.status(404).json({ errors: [
                {
                message: "User does not exist",
                },
            ]
        })

    }
        const isMatch = await AuthenticationService.comparePassword(user, password);
        if (!isMatch) {
            return res.status(404).json({ errors: [
                {
                message: "Invalid credentials",
                },
            ]
        });
    }
        const {token, expiresIn} = await AuthenticationService.authenticateUser(user._id);
        return res.json({user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            degree: user.degree,
            experience: user.experience,
            profileImgUrl: user.profileImage,
            }, 
            jwt: {
                token, 
                expiresIn,
            }});
    } catch (error) {
        return handleError(res, error);
    }
}

export const requestPasswordReset = async (req, res) => {
    try {
        const {email} = req.body;
        console.log(email);

        const user = await AuthenticationService.findUserByEmail(email);
        if (user){
            await sendPasswordResetEmail(user);
        }
        return res.json({
            message: "If the email exists, a password reset link will be sent to it shortly",
        });
        } catch (error) {
            return handleError(res, error);
        }
    };

export const resetPassword = async (req, res) => {
    try {
        const {token, password} = req.body;
        // eslint-disable-next-line no-undef
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await AuthenticationService.findUserById(userId);
        if (!user) {
            return res.status(404).json({errors: [{message: "User not found"}]});
        }
        user.password = password;
        await user.save();
        return res.json({message: "Password reset successful"});
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({errors: [{message: "Token expired"}]});
        }
        return handleError(res, error);
    }
};

export const changePassword = async (req, res) => {
    try {
        console.log('AUTH CONTROLLER:', 'req.body:', req);
        const {originalPass, newPass} = req.body;
        console.log('AUTH CONTROLLER:', 'originalPass:', originalPass,'newPass:' , newPass);
        const userId = req.userId
        const user = await AuthenticationService.findUserById(userId);
        if (!user) {
            return res.status(404).json({errors: [{message: "User not found"}]});
        }
        await AuthenticationService.changePassword(userId, originalPass, newPass)
        return res.json({message: "Password changed successfuly"});
    } catch (error) {
        return handleError(res, error);
    }
};

export const validateToken = async (req, res) => {
    if (verifyToken(req.body.token).valid){
        return res.json({valid: true});
    } else {
        return res.status(401).json({valid: false});
    }
};