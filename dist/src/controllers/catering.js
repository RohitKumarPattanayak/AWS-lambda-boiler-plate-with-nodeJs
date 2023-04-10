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
const successHandler_1 = require("../utils/successHandler");
const models_1 = require("../models");
const sequelize_typescript_1 = require("sequelize-typescript");
const dayjs_1 = __importDefault(require("dayjs"));
const sequelize_1 = require("sequelize");
const validations_1 = require("../utils/validations");
const config_1 = __importDefault(require("../config/config"));
const getMenuForTheDay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    const { jobCode } = req.params;
    let data = {};
    const cateringType = yield models_1.Job.findOne({
        attributes: ['catering_type'],
        where: {
            sap_job_code: String(jobCode)
        }
    });
    function Menu(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.CateringMenu.findAll({
                attributes: ['id', 'meal_type', 'type', 'date'],
                include: [
                    {
                        model: models_1.SapMenu,
                        attributes: ['sap_menu_code', 'sap_menu_desc']
                    }
                ],
                where: {
                    job_code: (0, validations_1.paramValidator)(jobCode),
                    meal_type: type,
                    type: String(cateringType.catering_type),
                    [sequelize_1.Op.and]: sequelize_typescript_1.Sequelize.where(sequelize_typescript_1.Sequelize.fn('date', sequelize_typescript_1.Sequelize.col('date')), '=', String(date))
                },
                group: ['CateringMenu.sap_menu_code']
            });
        });
    }
    let [breakfastResponse, lunchResponse, dinnerResponse] = yield Promise.all([Menu('breakfast'), Menu('lunch'), Menu('dinner')]);
    data = {
        breakfast: breakfastResponse,
        lunch: lunchResponse,
        dinner: dinnerResponse
    };
    let successObj = {
        statusCode: 200,
        message: 'Successfully fetched menu for the day.',
        data: data
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getMenuSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobCode } = req.params;
    const { sap_emp_code } = res.locals.jwt;
    const maxDailyReport = yield models_1.DailyReport.findOne({
        attributes: [[sequelize_typescript_1.Sequelize.fn('MAX', sequelize_typescript_1.Sequelize.col('last_report_submitted')), 'last_report_submitted']],
        where: {
            job_code: String(jobCode)
        },
        raw: true
    });
    const cateringType = yield models_1.Job.findOne({
        attributes: ['catering_type'],
        where: {
            sap_job_code: String(jobCode)
        },
        raw: true
    });
    console.log(maxDailyReport.last_report_submitted);
    console.log((0, dayjs_1.default)(maxDailyReport.last_report_submitted).format('YYYY-MM-DD'));
    const response = yield models_1.CateringMenu.findAll({
        attributes: ['id', [sequelize_typescript_1.Sequelize.fn('SUM', sequelize_typescript_1.Sequelize.col('pax')), 'pax']],
        include: [
            {
                model: models_1.CateringRequest,
                attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'type', 'job_code'] },
                include: [{ model: models_1.Job, attributes: [] }]
            },
            { model: models_1.SapMenu, attributes: ['sap_menu_code', 'sap_menu_name', 'price'] }
        ],
        where: {
            '$CateringRequest.job_code$': String(jobCode),
            '$CateringRequest.type$': cateringType.catering_type,
            '$CateringRequest.requested_by_employee_code$': sap_emp_code,
            [sequelize_1.Op.or]: [
                {
                    [sequelize_1.Op.and]: sequelize_typescript_1.Sequelize.where(sequelize_typescript_1.Sequelize.fn('date', sequelize_typescript_1.Sequelize.col('CateringRequest.date')), '>=', maxDailyReport.last_report_submitted ? (0, dayjs_1.default)(maxDailyReport.last_report_submitted).format('YYYY-MM-DD') : 0),
                    '$CateringRequest.Job.is_oneoff_job$': 0
                },
                { '$CateringRequest.Job.is_oneoff_job$': 1 }
            ]
        },
        group: ['SapMenu.sap_menu_code']
    });
    if (response && response.length !== 0) {
        let successObj = {
            statusCode: 200,
            message: 'Successfully fetched menu summary.',
            data: response
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        let successObj = {
            statusCode: 200,
            message: 'Could not fetch menu summary.',
            data: []
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
});
const postCateringRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobCode } = req.params;
    const empCode = res.locals.jwt.sap_emp_code;
    const body = req.body;
    const { CateringMenus } = req.body;
    const job = yield models_1.Job.findOne({
        where: { sap_job_code: jobCode },
        raw: true
    });
    yield models_1.CateringRequest.create({
        requested_by_employee_code: empCode,
        job_code: jobCode,
        date: body.date,
        type: job.catering_type.toString(),
        created_by: 'mobile',
        CateringMenus
    }, { include: [{ model: models_1.CateringMenu }] });
    let successObj = {
        statusCode: 201,
        message: 'Sucessfully created custom catering request'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getMenuList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, limit, offset } = req.query;
    let whereObj;
    if (search) {
        const validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = {
            [sequelize_1.Op.or]: [
                {
                    sap_menu_code: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` }
                },
                {
                    sap_menu_desc: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` }
                }
            ]
        };
    }
    let data = yield models_1.SapMenu.findAndCountAll({
        where: search ? whereObj : {},
        attributes: ['sap_menu_code', 'sap_menu_desc'],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Sucessfully fetched menu list.',
        data: data.rows,
        total_count: data.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
exports.default = { getMenuForTheDay, getMenuSummary, postCateringRequest, getMenuList };
