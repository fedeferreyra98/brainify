import multer from 'multer';
import { Router } from 'express';
import { uploadImage, sendEmail } from '../controllers/image.controller.js';

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.single('file'), uploadImage);
router.post('/email', sendEmail);

export default router;