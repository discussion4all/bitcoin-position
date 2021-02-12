import express, { Request, Response} from 'express';
const UserController = require("../controller/UserController");

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {

    res.send('yo');
});

router.post('/users',UserController.createUser);


export {router as createUserRouter}
