"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../services/user"));
const ts_md5_1 = require("ts-md5");
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("../utils/appErrors");
const successHandler_1 = require("../utils/successHandler");
const logger_1 = __importDefault(require("../utils/logger"));
const models_1 = require("../models");
const config_1 = __importDefault(require("../config/config"));
const getToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.query;
        let jwtObj = null;
        if (params && params.adminId) {
            // refresh token for admin panel
            const adminIdexists = yield models_1.AdminUsers.count({
                where: { id: Number(params.adminId) }
            });
            if (adminIdexists) {
                jwtObj = { admin_user_id: params.adminId, type: 'admin' };
            }
            else {
                throw new appErrors_1.AppError({
                    httpCode: httpResponse_1.HttpCode.FORBIDDEN,
                    description: 'Could not create JWT token.'
                });
            }
        }
        if (params && params.empcode) {
            jwtObj = { _sap_employee_code: params.empcode };
        }
        (0, user_1.default)(jwtObj, (_error, token) => {
            if (_error) {
                throw new appErrors_1.AppError({
                    httpCode: httpResponse_1.HttpCode.FORBIDDEN,
                    description: 'Could not create JWT token.'
                });
            }
            else if (token) {
                let successObj = {
                    statusCode: 200,
                    message: 'Successfully created token.',
                    token: token,
                    data: { enable_forgot_password: config_1.default.server.enable_forgot_password === 'TRUE' ? true : false }
                };
                successHandler_1.successHandler.handleSuccess(successObj, res, req);
            }
        });
    }
    catch (error) {
        console.log(error);
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.UNAUTHORIZED,
            description: 'User not found / No access to APP yet.'
        });
    }
});
const login = (req, res, next) => {
    try {
        let { empcode, password } = req.body;
        if (empcode && password) {
            const hashpassword = ts_md5_1.Md5.hashStr(password);
            models_1.Employee.findOne({
                where: {
                    sap_employee_code: empcode,
                    password: hashpassword,
                    is_active: 1,
                    has_app_access: 1
                },
                raw: true
            })
                .then((empQrrRes) => {
                if (empQrrRes != null && Object.keys(empQrrRes).length !== 0) {
                    let userObj = { _sap_employee_code: empQrrRes.sap_employee_code };
                    (0, user_1.default)(userObj, (_error, token) => __awaiter(void 0, void 0, void 0, function* () {
                        if (_error) {
                            logger_1.default.error('Unable to create token ' + _error);
                            throw new appErrors_1.AppError({
                                httpCode: httpResponse_1.HttpCode.FORBIDDEN,
                                description: 'Unable to create private JWT.'
                            });
                        }
                        else if (token) {
                            userObj['key'] = true;
                            (0, user_1.default)(userObj, (_error, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
                                if (_error) {
                                    logger_1.default.error('Unable to create key ' + _error);
                                    throw new appErrors_1.AppError({
                                        httpCode: httpResponse_1.HttpCode.FORBIDDEN,
                                        description: 'Unable to create a key.'
                                    });
                                }
                                else if (refreshToken) {
                                    let latestKey = empQrrRes.key;
                                    let latestHash = empQrrRes.password;
                                    let updateObject = {
                                        last_login_ts: new Date()
                                    };
                                    if (latestKey === null) {
                                        latestKey = refreshToken;
                                        updateObject['key'] = refreshToken;
                                    }
                                    yield models_1.Employee.update(updateObject, {
                                        where: { sap_employee_code: empcode }
                                    });
                                    let successObj = {
                                        statusCode: 200,
                                        key: latestKey,
                                        hashpassword: latestHash,
                                        message: 'Logged in successfully',
                                        token
                                    };
                                    successHandler_1.successHandler.handleSuccess(successObj, res, req);
                                }
                            }));
                        }
                    }));
                }
                else {
                    throw new appErrors_1.AppError({
                        httpCode: httpResponse_1.HttpCode.UNAUTHORIZED,
                        description: 'User not found / No access to APP yet.'
                    });
                }
            })
                .catch((error) => {
                logger_1.default.error('Error in Login API ' + error.message);
                next(error);
            });
        }
        else {
            next(new appErrors_1.AppError({
                httpCode: httpResponse_1.HttpCode.UNAUTHORIZED,
                description: 'Invalid credentials'
            }));
        }
    }
    catch (error) {
        console.log(error);
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.UNAUTHORIZED,
            description: 'User not found / No access to APP yet.'
        });
    }
};
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empcode } = req.params;
        const { key } = req.body;
        const result = yield models_1.Employee.findOne({
            where: {
                sap_employee_code: empcode,
                key,
                is_active: 1,
                has_app_access: 1
            },
            raw: true
        });
        if (result != null && Object.keys(result).length !== 0) {
            (0, user_1.default)({ _sap_employee_code: empcode }, (_error, token) => {
                if (_error) {
                    throw new appErrors_1.AppError({
                        httpCode: httpResponse_1.HttpCode.FORBIDDEN,
                        description: 'Could not create JWT token.'
                    });
                }
                else if (token) {
                    let successObj = {
                        statusCode: 201,
                        message: 'Successfully refreshed token.',
                        token: token
                    };
                    successHandler_1.successHandler.handleSuccess(successObj, res, req);
                }
            });
        }
        else {
            throw new appErrors_1.AppError({
                httpCode: httpResponse_1.HttpCode.UNAUTHORIZED,
                description: 'User not found / No access to APP yet.'
            });
        }
    }
    catch (error) {
        console.log(error);
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.UNAUTHORIZED,
            description: 'User not found / No access to APP yet.'
        });
    }
});
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { empCode } = req.params;
    let validate = yield models_1.Employee.findOne({
        where: { sap_employee_code: empCode },
        raw: true
    });
    let data;
    data = {
        verify: validate ? true : false,
        key: validate ? validate.key : ''
    };
    let successObj = {
        statusCode: 200,
        message: 'verified user successfully',
        data: data
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sap_emp_code = res.locals.jwt.sap_emp_code;
    const { new_password, empcode, key } = req.body;
    let hashedPass = ts_md5_1.Md5.hashStr(new_password);
    let updateObj = { password: hashedPass };
    let employee_details = sap_emp_code
        ? yield models_1.Employee.findOne({
            where: { sap_employee_code: sap_emp_code }
        })
        : yield models_1.Employee.findOne({
            where: { sap_employee_code: empcode.toString().toUpperCase(), key: key }
        });
    if (employee_details && employee_details.is_active && employee_details.has_app_access) {
        yield models_1.Employee.update(updateObj, {
            where: { sap_employee_code: sap_emp_code ? sap_emp_code : empcode.toString().toUpperCase() }
        });
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.FORBIDDEN,
            statusCode: httpResponse_1.HttpCode.FORBIDDEN
        });
    }
    let successObj = {
        statusCode: 200,
        message: 'Successfully updated employee password.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
exports.default = { getToken, login, refreshToken, verifyUser, changePassword };
