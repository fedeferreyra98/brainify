import userService from "../services/user.service.js";
import {upload} from '../services/cloudinary.js' 

export const getUser = async (req, res) => {
        try {
            const user = await userService.findById(req.userId);
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            return res.json({user})
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    export const getUserPublicData = async (req, res) => {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            const publicProfile = await userService.getPublicProfile(user);
            return res.json({publicProfile})
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    export const updateUser = async (req, res) => {
        try {
            const user = await userService.update(req.userId, req.body);
            res.json({user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    export const updateUserProfileImg = async (req, res) => {
        try {
            const {userId} = req;
            const imageUrl = await upload(req.file.buffer);
            const updatedUser = await userService.update(userId, {profileImgUrl: imageUrl});
            return res.json({user: updatedUser});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }