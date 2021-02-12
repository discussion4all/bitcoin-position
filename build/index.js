"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var typeorm_1 = require("typeorm");
typeorm_1.createConnection().then(function () {
    app_1.app.listen(5000, function () {
        console.log('Server is listening on port 5000');
    });
});
//# sourceMappingURL=index.js.map