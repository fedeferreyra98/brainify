import  express  from 'express';
import {getUser, getUserPublicData, addUser, updateUser, updateUserProfileImg} from '../controllers/user.controller.js';

const router = express.Router();

// Define routes

//GetById
router.get('/', getUser);

//Get public profile
router.get('/:id', getUserPublicData);

//Create
router.post('/', addUser);

//Update
router.patch('/:id', updateUser);

//Update profile image
router.patch('/:id/profileImg', updateUserProfileImg);

export default router;
