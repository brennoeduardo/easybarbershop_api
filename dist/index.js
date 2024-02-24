"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./database/env");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
async function start() {
    try {
        await (0, env_1.connect)();
        app.listen(8000, () => {
            console.log('Server is running on 8000');
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
