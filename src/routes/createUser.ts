import express, { Request, Response} from 'express';
import {getMongoRepository} from "typeorm";
import {User} from "../entity/User";

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {

    res.send('yo');
});

export {router as createUserRouter}
