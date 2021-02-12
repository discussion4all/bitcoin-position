import express, { Request, Response} from 'express';
const Bitcoin = require("../controller/bitcoinController");

const router = express.Router();

router.put('/bitcoin',Bitcoin.updateBitcoin);
router.get('/bitcoin',Bitcoin.getBitcoin);



export {router as bitcoin}
