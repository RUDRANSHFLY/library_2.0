"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
let app = null;
async function handler(req, res) {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        await app.init();
    }
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp(req, res);
}
//# sourceMappingURL=index.js.map