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
const httpResponse_1 = require("../interfaces/httpResponse");
const successHandler_1 = require("../utils/successHandler");
const config_1 = __importDefault(require("../config/config"));
const models_1 = require("../models");
const validations_1 = require("../utils/validations");
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../services/user"));
const ts_md5_1 = require("ts-md5");
const appErrors_1 = require("../utils/appErrors");
const mysql_1 = require("../config/mysql");
const getjobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { search, offset, limit } = req.query;
    let validatedSearchStr;
    let whereObj;
    if (search && search.length !== 0) {
        validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = Object.assign(Object.assign({}, whereObj), { sap_job_code: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` } });
    }
    const [jobs, jobCount, current_job_count] = yield Promise.all([
        yield models_1.Job.findAll({
            attributes: ['id', 'sap_job_code', 'is_location_enable'],
            include: [
                {
                    model: models_1.SapSite,
                    include: [
                        {
                            model: models_1.SapLocation,
                            attributes: ['latitude', 'id', 'longitude']
                        }
                    ],
                    attributes: ['name', 'site_code']
                }
            ],
            where: Object.assign({}, whereObj),
            offset: offset ? Number(offset) : config_1.default.pagination.offset,
            limit: limit ? Number(limit) : config_1.default.pagination.limit
        }),
        yield models_1.Job.count(),
        yield models_1.Job.count({
            where: Object.assign({}, whereObj)
        })
    ]);
    let successObj = {
        statusCode: 200,
        message: 'Successfully fetched jobs.',
        data: { jobs: jobs, current_count: current_job_count },
        total_count: jobCount
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const updateOrAddSiteCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { jobcode } = req.params;
    let body = req.body;
    const jobSite = (yield models_1.Job.findOne({
        where: {
            sap_job_code: jobcode
        },
        raw: true
    })).sap_site_code;
    let upadteObj = Array.isArray(body)
        ? body.map((ele) => {
            ele['site_code'] = jobSite;
            return ele;
        })
        : [Object.assign(Object.assign({}, body), { site_code: jobSite })];
    yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.SapLocation.destroy({
            where: { site_code: jobSite },
            transaction: t
        });
        yield models_1.SapLocation.bulkCreate(upadteObj, { transaction: t, ignoreDuplicates: true });
    }));
    let successObj = {
        statusCode: 201,
        message: `Successfully updated location for ${(0, validations_1.paramValidator)(jobcode)}.`
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const adminLogin = (req, res, next) => {
    let { username, password } = req.body;
    if (username && password) {
        const hashpassword = ts_md5_1.Md5.hashStr(password);
        models_1.AdminUsers.findOne({
            where: {
                username: username,
                password: hashpassword,
                is_active: 1
            },
            raw: true
        })
            .then((empQrrRes) => {
            if (empQrrRes != null && Object.keys(empQrrRes).length !== 0) {
                let userObj = { admin_user_id: empQrrRes.id, type: 'admin' };
                (0, user_1.default)(userObj, (_error, token) => __awaiter(void 0, void 0, void 0, function* () {
                    if (_error) {
                        throw new appErrors_1.AppError({
                            httpCode: httpResponse_1.HttpCode.FORBIDDEN,
                            description: 'Unable to create private JWT.'
                        });
                    }
                    else if (token) {
                        let successObj = {
                            statusCode: 200,
                            message: 'Logged in successfully',
                            data: { admin_id: empQrrRes.id },
                            token
                        };
                        successHandler_1.successHandler.handleSuccess(successObj, res, req);
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
            next(error);
        });
    }
    else {
        next(new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.UNAUTHORIZED,
            description: 'Invalid credentials'
        }));
    }
};
const enableOrDisableLoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobcode, enable } = req.params;
    let updateObj = { is_location_enable: Number(enable) };
    const whereObj = { sap_job_code: (0, validations_1.paramValidator)(jobcode) };
    let jobExists = yield models_1.Job.count({
        where: whereObj
    });
    if (Number.isNaN(Number(enable))) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            description: 'status should be a number.'
        });
    }
    else if (Number(enable) > 1) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            description: 'status should be either 1 or 0.'
        });
    }
    if (!jobExists) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NO_DATA,
            description: 'job does not exists'
        });
    }
    models_1.Job.update(updateObj, {
        where: whereObj
    });
    let successObj = {
        statusCode: 204,
        message: 'updated location status.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
exports.default = { getjobs, updateOrAddSiteCode, adminLogin, enableOrDisableLoc };
