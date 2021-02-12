"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitcoin = void 0;
var express_1 = __importDefault(require("express"));
var Bitcoin = require("../controller/bitcoinController");
var router = express_1.default.Router();
exports.bitcoin = router;
router.put('/bitcoin', Bitcoin.updateBitcoin);
router.get('/bitcoin', Bitcoin.getBitcoin);
//# sourceMappingURL=bitcoin.js.map