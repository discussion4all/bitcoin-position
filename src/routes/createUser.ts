import express, { Request, Response} from 'express';
const UserController = require("../controller/UserController");

const router = express.Router();

router.get('/users/:id',UserController.getUser);

router.post('/users',UserController.createUser);

router.put('/users/:id',UserController.updateUser);

export {router as createUserRouter}
