import userService from "../services/user.service.js";
import {upload} from '../services/cloudinary.js' 

class UserController {
    async getUser(req, res) {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            return res.json({user})
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    async getUserPublicData(req, res) {
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

    async addUser(req, res) {
        try {
            const user = await userService.create(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.update(req.params.id, req.body);
            res.json({user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    async updateUserProfileImg(req, res) {
        try {
            const userId = req;
            const imageUrl = await upload(req.file.buffer);
            const updatedUser = await userService.update(userId, {profileImgUrl: imageUrl});
            return res.json({user: updatedUser});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}

export default new UserController();