import  express  from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

// Define routes

//GetAll
router.get('/', userController.findAll);

//GetById
router.get('/:id', userController.findById);

//Create
router.post('/', userController.create);

//Update
router.put('/:id', userController.updateUser);

export default router;
