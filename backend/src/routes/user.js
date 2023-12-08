// @ts-ignore
import  express  from 'express';
import {getUser, getUserPublicData, updateUser, updateUserProfileImg} from '../controllers/user.controller.js';
import {requireToken} from '../middlewares/requireToken.js';
import { updateUserBodyValidator } from '../middlewares/validationResultExpress.js';
const router = express.Router();

// Define routes

//Get
router.get('/', requireToken, getUser);
//Get public profile
router.get('/:id', getUserPublicData);
//Update
router.patch('/', requireToken, updateUserBodyValidator, updateUser);
//Update profile image
router.patch('/:id/profileImg', requireToken, updateUserProfileImg); //TODO: Implement multer to upload images

export default router;
