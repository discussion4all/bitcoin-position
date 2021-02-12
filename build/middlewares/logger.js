"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var fs = __importStar(require("fs"));
var getActualRequestDurationInMilliseconds = function (start) {
    var NS_PER_SEC = 1e9; //  convert to nanoseconds
    var NS_TO_MS = 1e6; // convert to milliseconds
    var diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
var logger = function (req, res, next) {
    var current_datetime = new Date();
    var formatted_date = current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    var method = req.method;
    var url = req.url;
    var status = res.statusCode;
    var start = process.hrtime();
    var durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    var log = "[" + formatted_date + "] " + method + ":" + url + " " + status + " " + durationInMilliseconds.toLocaleString() + " ms";
    console.log(log);
    fs.appendFile("request_logs.txt", log + "\n", function (err) {
        if (err) {
            console.log(err);
        }
    });
    next();
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map