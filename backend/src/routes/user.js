// @ts-ignore
import  express  from 'express';
import multer from 'multer';
import {getUser, getUserPublicData, updateUser, updateUserProfileImg} from '../controllers/user.controller.js';
import {requireToken} from '../middlewares/requireToken.js';
import { updateUserBodyValidator } from '../middlewares/validationResultExpress.js';
const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});


router.get('/', requireToken, getUser);
router.get('/:id', getUserPublicData);
router.patch('/', requireToken, updateUserBodyValidator, updateUser);
router.patch('/:id/profileImg', requireToken, upload.single('file'), updateUserProfileImg);

export default router;
