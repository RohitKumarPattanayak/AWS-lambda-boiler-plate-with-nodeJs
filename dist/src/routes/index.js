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
const models_1 = require("../models");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.default)();
const adminRoute = (0, express_1.default)();
/** Rules of our API */
router.use((req, res, next) => {
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
//connect to the database and sync all the table
(0, models_1.ConnectDB)().then((connectionRes) => {
    global.__loggerType__ = config_1.default.LOGGER_TYPES.db;
    logger_1.default.info('connected to DB, created required tables');
});
router.use('/token', routes_1.auth);
router.use('/jobs', routes_1.job);
router.use('/login', routes_1.login);
router.use('/user', routes_1.user);
router.use('/sync', routes_1.sync);
router.use('/materials', routes_1.material);
router.use('/equipments', routes_1.equipment);
router.use('/quotes', routes_1.quote);
router.use('/division', routes_1.division);
router.use('/config', routes_1.sapconfig);
router.use('/collections', routes_1.collections);
router.use('/catering', routes_1.catering);
//admin panel
router.use('/admin', (0, cors_1.default)({
    origin: '*'
}), routes_1.admin);
(0, swagger_1.default)(router, config_1.default.server.port);
/** Error handling */
router.use((req, res, next) => {
    throw new appErrors_1.AppError({
        httpCode: httpResponse_1.HttpCode.NOT_FOUND,
        description: 'URL not found..',
        path: `${req.protocol}://${req.hostname}${req.originalUrl}`
    });
});
router.use((err, req, res, next) => {
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
router.use((err, req, res, next) => {
    errorHandler_1.errorHandler.handleError(err, res, req);
});
module.exports = router;
