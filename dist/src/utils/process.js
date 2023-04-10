"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const errorHandler_1 = require("./errorHandler");
const exitHandler_1 = require("./exitHandler");
const logger_1 = __importDefault(require("./logger"));
process.on('unhandledRejection', (reason) => {
    global.__loggerType__ = config_1.default.LOGGER_TYPES.uncaught;
    logger_1.default.http(`Unhandled Rejection: ${reason.message || reason}`);
    throw new Error(reason.message || reason);
});
process.on('uncaughtException', (error) => {
    global.__loggerType__ = config_1.default.LOGGER_TYPES.uncaught;
    logger_1.default.http(`Uncaught Exception: ${error.message}`);
    errorHandler_1.errorHandler.handleError(error);
});
process.on('SIGTERM', () => {
    global.__loggerType__ = config_1.default.LOGGER_TYPES.uncaught;
    logger_1.default.http(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
    exitHandler_1.exitHandler.handleExit(0);
});
process.on('SIGINT', () => {
    global.__loggerType__ = config_1.default.LOGGER_TYPES.uncaught;
    logger_1.default.http(`Process ${process.pid} received SIGINT: Exiting with code 0`);
    exitHandler_1.exitHandler.handleExit(0);
});
