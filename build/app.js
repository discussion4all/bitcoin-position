"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var body_parser_1 = require("body-parser");
var logger_1 = require("./middlewares/logger");
var createUser_1 = require("./routes/createUser");
var bitcoin_1 = require("./routes/bitcoin");
var app = express_1.default();
exports.app = app;
app.use(body_parser_1.json());
app.use(logger_1.logger);
app.get('/', function (req, res) {
    res.send('Yo');
});
app.use(createUser_1.createUserRouter);
app.use(bitcoin_1.bitcoin);
app.all('*', function (req, res) {
    res.send(404);
});
//# sourceMappingURL=app.js.map