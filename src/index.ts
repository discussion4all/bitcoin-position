import { app} from "./app";
import {createConnection} from "typeorm";

createConnection().then(() => {
    app.listen(5000, () => {
        console.log('Server is listening on port 5000');
    });
});
