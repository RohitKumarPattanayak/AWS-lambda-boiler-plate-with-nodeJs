"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config/config"));
const swagger_1 = __importDefault(require("../utils/swagger"));
const errorHandler_1 = require("../utils/errorHandler");
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("../utils/appErrors");
const logger_1 = __importDefault(require("../utils/logger"));
const routes_1 = require("./routes");
const adminRoute = (0, express_1.default)();
/** Rules of our API */
adminRoute.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    if (!allowedMethods.includes(req.method))
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.METHOD_NOT_ALLOW,
            description: 'Method not allowed.'
        });
    next();
});
//admin panel
adminRoute.use('', routes_1.admin);
(0, swagger_1.default)(adminRoute, config_1.default.server.port);
/** Error handling */
adminRoute.use((req, res, next) => {
    throw new appErrors_1.AppError({
        httpCode: httpResponse_1.HttpCode.NOT_FOUND,
        description: 'URL not found..',
        path: `${req.protocol}://${req.hostname}${req.originalUrl}`
    });
});
adminRoute.use((err, req, res, next) => {
    let status = httpResponse_1.HttpCode.NOT_FOUND;
    if (err && err.name === 'SequelizeValidationError') {
        status = httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR;
    }
    logger_1.default.warn('Error encountered: ' +
        JSON.stringify({
            httpCode: status,
            description: err.message,
            path: `${req.protocol}://${req.hostname}${req.originalUrl}`
        }));
    if (err && err.name === 'SequelizeValidationError')
        next(res.status(status).json({
            httpCode: status,
            description: err.message,
            path: `${req.protocol}://${req.hostname}${req.originalUrl}`
        }));
    else
        next(err);
});
adminRoute.use((err, req, res, next) => {
    errorHandler_1.errorHandler.handleError(err, res, req);
});
module.exports = adminRoute;
