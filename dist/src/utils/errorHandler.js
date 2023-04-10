"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("./appErrors");
const exitHandler_1 = require("./exitHandler");
const logger_1 = __importDefault(require("./logger"));
// import { Sentry } from '../index'
const Sentry = __importStar(require("@sentry/node"));
const config_1 = __importDefault(require("../config/config"));
class ErrorHandler {
    handleError(error, response, request) {
        if (!error.stack.includes('Sequelize')) {
            if (this.isTrustedError(error)) {
                global.__loggerType__ = config_1.default.LOGGER_TYPES.caught;
                this.handleTrustedError(error, response, request);
            }
            else {
                global.__loggerType__ = config_1.default.LOGGER_TYPES.uncaught;
                this.handleUntrustedError(error, response, request);
            }
        }
        else {
            global.__loggerType__ = config_1.default.LOGGER_TYPES.db;
            this.handleTrustedError(error, response, request);
        }
    }
    isTrustedError(error) {
        if (error instanceof appErrors_1.AppError) {
            return error.isOperational;
        }
        return false;
    }
    handleTrustedError(error, response, request, CustomError) {
        Sentry.captureException({
            error: this.getCustomErrorData(CustomError, error, response, request)
        });
        response.status(error.httpCode).json({
            error: this.getCustomErrorData(CustomError, error, response, request)
        });
    }
    handleUntrustedError(error, response, request) {
        if (response) {
            const untrustedErrorObj = {
                info: 'Application encountered an untrusted error.',
                message: error === null || error === void 0 ? void 0 : error.message,
                path: `${request.protocol}://${request.hostname}${request.originalUrl}`
            };
            logger_1.default.error('Untrusted Error: ' + JSON.stringify(untrustedErrorObj));
            Sentry.captureException({
                error: {
                    message: 'Internal server error',
                    statusCode: 500,
                    path: `${request.protocol}://${request.hostname}${request.originalUrl}`
                }
            });
            response.status(httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR).json({
                error: {
                    message: 'Internal server error',
                    statusCode: 500,
                    path: `${request.protocol}://${request.hostname}${request.originalUrl}`
                }
            });
        }
        exitHandler_1.exitHandler.handleExit(1);
    }
    getCustomErrorData(CustomError, error, response, request) {
        let message = error.message;
        let statusCode = error.statusCode;
        switch (error.statusCode) {
            case 403:
                message = 'User not found / No access to APP yet.';
                break;
            case 1001:
                message = 'Invalid Duplicate Entry';
                break;
            case 1002:
                message = 'Invalid Input';
                break;
            case 1003:
                message = 'No Content';
                break;
            case 1004:
                message = 'Transaction Failed';
                break;
            case 1005:
                message =
                    'Date and time input exceeds 24 hours. Kindly provide a check-out date and time within 24 hours of the checked-in date and time.';
            default:
                message = message;
                break;
        }
        return Object.assign({
            message: message,
            statusCode: statusCode,
            path: `${request.protocol}://${request.hostname}${request.originalUrl}`
        }, CustomError);
    }
}
exports.errorHandler = new ErrorHandler();
