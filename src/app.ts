import express, {Request, Response} from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {logger} from "./middlewares/logger";

import {createUserRouter} from "./routes/createUser";


const app = express();
app.use(json());
app.use(logger);

app.get('/', (req: Request, res: Response) => {
    res.send('Yo');
});

app.use(createUserRouter);

app.all('*', (req: Request, res: Response) => {
    res.send(404);
});

export {app};
