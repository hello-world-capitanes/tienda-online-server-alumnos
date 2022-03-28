"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_CONFIG = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envArgument = process.argv.find(arg => arg.startsWith("env"));
const ENVIRONMENT = (_b = (_a = envArgument === null || envArgument === void 0 ? void 0 : envArgument.substring(4)) === null || _a === void 0 ? void 0 : _a.split("'")) === null || _b === void 0 ? void 0 : _b.join("");
const envFile = (!ENVIRONMENT ? '.env' : `.env.${ENVIRONMENT}`);
const envPath = path_1.default.resolve(__dirname, `../environments/${envFile}`);
dotenv_1.default.config({ path: envPath });
const PORT = process.env.SERVER_PORT;
exports.ENV_CONFIG = { ENVIRONMENT, PORT };
