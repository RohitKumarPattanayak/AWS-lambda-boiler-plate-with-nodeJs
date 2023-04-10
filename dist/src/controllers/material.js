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
const validations_1 = require("../utils/validations");
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("../utils/appErrors");
const successHandler_1 = require("../utils/successHandler");
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const mysql_1 = require("../config/mysql");
const serviceItem_1 = __importDefault(require("../models/serviceItem"));
const postMaterialRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MaterialRequestItems, comment } = req.body;
    const { sap_emp_code } = res.locals.jwt;
    const result = yield models_1.MaterialRequest.bulkCreate([
        {
            requested_by_employee_code: sap_emp_code,
            comment,
            status_code: 'ST07',
            MaterialRequestItems
        }
    ], { include: [models_1.MaterialRequestItem], ignoreDuplicates: true });
    let successObj = {
        statusCode: 201,
        message: 'Successfully created a material request.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getSupervisorMaterials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, offset, limit } = req.query;
    let validatedSearch;
    const empCode = res.locals.jwt.sap_emp_code;
    let data;
    if (search) {
        validatedSearch = (0, validations_1.paramValidator)(search);
    }
    data = yield models_1.EmpMaterialBin.findAndCountAll({
        include: [
            {
                model: models_1.MaterialMaster,
                attributes: ['material_name', 'material_code', 'image_url'],
                where: search
                    ? {
                        [sequelize_1.Op.or]: [
                            {
                                material_name: validatedSearch
                            },
                            {
                                material_code: validatedSearch
                            }
                        ]
                    }
                    : {}
            }
        ],
        where: {
            employee_code: empCode
        },
        attributes: ['current_qty'],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Successfully fetched logged supervisors materials.',
        data: data.rows,
        total_count: data.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const materialUsageSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product } = req.params;
    const { offset, limit } = req.query;
    const empCode = res.locals.jwt.sap_emp_code;
    let whereObj = { supervisor_emp_code: empCode };
    let product_id;
    let id_exists;
    let data;
    if (product) {
        product_id = (0, validations_1.paramValidator)(product);
        whereObj = Object.assign(Object.assign({}, whereObj), { material_code: product_id });
    }
    data = yield models_1.MaterialLedger.findAndCountAll({
        where: whereObj,
        attributes: ['createdAt', 'type', 'material_request_id', 'quantity'],
        include: [
            {
                model: models_1.Job,
                attributes: ['sap_site_code'],
                include: [
                    {
                        model: models_1.SapSite,
                        attributes: ['name']
                    },
                    {
                        model: models_1.DivisionMaster,
                        attributes: ['name']
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Successfully fetched metirial summary usage.',
        data: data.rows,
        total_count: data.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getMaterialWithType = (search, offset, limit, serviceCode, type, division_id = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    let whereObj = { is_active: 1, type: !type ? 'material' : type };
    let serviceItemWhereObj = {};
    let includeObj = {};
    if (division_id) {
        let validatedDivisionStr = (0, validations_1.paramValidator)(division_id);
        whereObj = Object.assign(Object.assign({}, whereObj), { division_id: validatedDivisionStr });
    }
    if (search) {
        let validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = Object.assign(Object.assign({}, whereObj), { [sequelize_1.Op.or]: [
                {
                    material_code: validatedSearchStr
                },
                {
                    material_name: validatedSearchStr
                }
            ] });
    }
    if (serviceCode) {
        serviceItemWhereObj = { '$ServiceItems.service_code$': (0, validations_1.paramValidator)(serviceCode) };
        includeObj = {
            include: [
                { model: serviceItem_1.default, attributes: ['qty'] },
                {
                    model: models_1.QuoteLineItem,
                    attributes: ['price', 'qty']
                }
            ]
        };
    }
    const getMaterialsRes = yield models_1.MaterialMaster.findAndCountAll(Object.assign(Object.assign({ attributes: { exclude: ['createdAt', 'updatedAt', 'type', 'is_active'] }, subQuery: false, where: Object.assign(Object.assign({}, whereObj), serviceItemWhereObj) }, includeObj), { offset: offset ? Number(offset) : config_1.default.pagination.offset, limit: limit ? Number(limit) : config_1.default.pagination.limit }));
    let resultObj = [];
    JSON.parse(JSON.stringify(getMaterialsRes.rows)).map((ele, index) => {
        resultObj[index] = {
            material_code: ele.material_code,
            material_name: ele.material_name,
            price: ele.price,
            image_url: ele.image_url,
            unit_descriptor: ele.unit_descriptor,
            qty: null
        };
        if (serviceCode && ele.ServiceItems.length) {
            resultObj[index].qty = ele.ServiceItems[0].qty;
        }
    });
    return { resultObj: resultObj, totalCount: getMaterialsRes.count };
});
const getMaterialData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, offset, limit, serviceCode, type, division_id } = req.query;
    const materialData = yield getMaterialWithType(search, offset, limit, serviceCode, type, division_id);
    let successObj = {
        statusCode: 200,
        message: `Get ${type} Successful`,
        data: materialData.resultObj,
        total_count: materialData.totalCount
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getRequestedMaterialList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { statusCode, offset, limit } = req.query;
    const { sap_emp_code } = res.locals.jwt;
    const [openStatusCount, approvedStatusCount, rejectedStatusCount, deliveredStatusCount] = yield Promise.all([
        models_1.MaterialRequest.count({
            attributes: [[sequelize_1.Sequelize.literal('DISTINCT SUM(COUNT(MaterialRequest.id)) OVER()'), 'count']],
            include: [{ model: models_1.StatusMaster }],
            where: {
                requested_by_employee_code: sap_emp_code,
                '$MaterialRequest.status_code$': { [sequelize_1.Op.in]: ['ST07'] }
            },
            group: ['MaterialRequest.status_code']
        }),
        models_1.MaterialRequest.count({
            attributes: [[sequelize_1.Sequelize.literal('DISTINCT SUM(COUNT(MaterialRequest.id)) OVER()'), 'count']],
            include: [{ model: models_1.StatusMaster }],
            where: {
                requested_by_employee_code: sap_emp_code,
                '$StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST08', 'ST09', 'ST10'] }
            },
            group: ['MaterialRequest.status_code']
        }),
        models_1.MaterialRequest.count({
            attributes: [[sequelize_1.Sequelize.literal('DISTINCT SUM(COUNT(MaterialRequest.id)) OVER()'), 'count']],
            include: [{ model: models_1.StatusMaster }],
            where: {
                requested_by_employee_code: sap_emp_code,
                '$StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST12', 'ST13'] }
            },
            group: ['MaterialRequest.status_code']
        }),
        models_1.MaterialRequest.count({
            attributes: [[sequelize_1.Sequelize.literal('DISTINCT SUM(COUNT(MaterialRequest.id)) OVER()'), 'count']],
            include: [{ model: models_1.StatusMaster }],
            where: {
                requested_by_employee_code: sap_emp_code,
                '$StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST11'] }
            },
            group: ['MaterialRequest.status_code']
        })
    ]);
    let data = {};
    let material_request_count = {};
    if (statusCode === 'ST07' || !statusCode) {
        let [openStatusRequests, open_material_request_count] = yield Promise.all([
            yield models_1.MaterialRequestItem.findAll({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('requested_qty')), 'requested_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST07'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`'],
                offset: offset ? Number(offset) : config_1.default.pagination.offset,
                limit: limit ? Number(limit) : config_1.default.pagination.limit,
                order: [['id', 'DESC']]
            }),
            yield models_1.MaterialRequestItem.count({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('requested_qty')), 'requested_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST07'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`']
            })
        ]);
        data = Object.assign(Object.assign({}, data), { open_requests: openStatusRequests });
        material_request_count = Object.assign(Object.assign({}, material_request_count), { open_material_request_count: open_material_request_count.length });
    }
    if (statusCode === 'ST08' || !statusCode) {
        let [approvedStatusRequests, approved_material_request_count] = yield Promise.all([
            yield models_1.MaterialRequestItem.findAll({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('approved_qty')), 'approved_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST08', 'ST09', 'ST10'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`'],
                order: [['created_at', 'DESC']],
                offset: offset ? Number(offset) : config_1.default.pagination.offset,
                limit: limit ? Number(limit) : config_1.default.pagination.limit
            }),
            yield models_1.MaterialRequestItem.findAll({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('approved_qty')), 'approved_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST08', 'ST09', 'ST10'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`']
            })
        ]);
        data = Object.assign(Object.assign({}, data), { approved_requests: approvedStatusRequests });
        material_request_count = Object.assign(Object.assign({}, material_request_count), { approved_material_request_count: approved_material_request_count.length });
    }
    if (statusCode === 'ST13' || !statusCode) {
        let [rejectedStatusRequests, rejected_material_request_count] = yield Promise.all([
            yield models_1.MaterialRequestItem.findAll({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('rejected_qty')), 'rejected_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST12', 'ST13'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`'],
                order: [['created_at', 'DESC']],
                offset: offset ? Number(offset) : config_1.default.pagination.offset,
                limit: limit ? Number(limit) : config_1.default.pagination.limit
            }),
            yield models_1.MaterialRequestItem.findAll({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('rejected_qty')), 'rejected_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST12', 'ST13'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`']
            })
        ]);
        data = Object.assign(Object.assign({}, data), { rejected_requests: rejectedStatusRequests });
        material_request_count = Object.assign(Object.assign({}, material_request_count), { rejected_material_request_count: rejected_material_request_count.length });
    }
    if (statusCode === 'ST11' || !statusCode) {
        let [deliveredStatusRequests, delivered_material_request_count] = yield Promise.all([
            yield models_1.MaterialRequestItem.findAll({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('delivered_qty')), 'delivered_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST11'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`'],
                order: [['created_at', 'DESC']],
                offset: offset ? Number(offset) : config_1.default.pagination.offset,
                limit: limit ? Number(limit) : config_1.default.pagination.limit
            }),
            yield models_1.MaterialRequestItem.findAll({
                attributes: {
                    include: [[sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('delivered_qty')), 'delivered_qty']]
                },
                include: [
                    {
                        model: models_1.MaterialRequest,
                        attributes: ['requested_by_employee_code'],
                        include: [{ model: models_1.StatusMaster, attributes: ['status_code', 'desc'] }]
                    },
                    { model: models_1.MaterialMaster, attributes: ['material_code', 'material_name', 'unit_descriptor'] }
                ],
                where: {
                    '$MaterialRequest.StatusMaster.type$': 'materialrequest',
                    '$MaterialRequest.StatusMaster.status_code$': { [sequelize_1.Op.in]: ['ST11'] },
                    '$MaterialRequest.requested_by_employee_code$': sap_emp_code
                },
                group: ['request_id', '`MaterialRequestItem`.`material_code`']
            })
        ]);
        data = Object.assign(Object.assign({}, data), { delivered_requests: deliveredStatusRequests });
        material_request_count = Object.assign(Object.assign({}, material_request_count), { delivered_material_request_count: delivered_material_request_count.length });
    }
    if (data != null && Object.keys(data).length !== 0) {
        let successObj = {
            statusCode: 200,
            message: 'Successfully fetched material request list.',
            data: Object.assign(Object.assign({}, data), { count: Object.assign({ open_count: openStatusCount[0] ? openStatusCount[0].count : 0, approved_count: approvedStatusCount[0] ? approvedStatusCount[0].count : 0, rejected_count: rejectedStatusCount[0] ? rejectedStatusCount[0].count : 0, delivered_count: deliveredStatusCount[0] ? deliveredStatusCount[0].count : 0 }, material_request_count) })
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else if (data != null && Object.keys(data).length !== 0) {
        let successObj = {
            statusCode: 200,
            message: 'Successfully material request list.',
            data: []
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
});
const getCompleteSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.Job.findAndCountAll({
            attributes: ['sap_job_code'],
            include: [
                {
                    model: models_1.SapSite,
                    attributes: ['site_code', ['name', 'sap_site_name']]
                },
                {
                    model: models_1.DivisionMaster,
                    attributes: [['name', 'sap_division_name']]
                }
            ]
        });
        res.send(data);
    }
    catch (error) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            description: error.message
        });
    }
});
const postMaterialUsage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MaterialLedgerData } = req.body;
    const { jobCode } = req.params;
    const { sap_emp_code } = res.locals.jwt;
    let MaterialLedgerInsertData = MaterialLedgerData.map((ele) => {
        return Object.assign(Object.assign({}, ele), { type: 'used', supervisor_emp_code: sap_emp_code, job_code: jobCode });
    });
    try {
        yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.MaterialLedger.bulkCreate(MaterialLedgerInsertData, { transaction: t });
            for (const element of MaterialLedgerData) {
                yield models_1.EmpMaterialBin.decrement({ current_qty: element.quantity }, { where: { employee_code: sap_emp_code, material_code: element.material_code }, transaction: t });
            }
            let successObj = {
                statusCode: 201,
                message: 'Successfully updated material usage.'
            };
            successHandler_1.successHandler.handleSuccess(successObj, res, req);
        }));
    }
    catch (error) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
            statusCode: httpResponse_1.HttpCode.TRANSACTION_FAILED
        });
    }
});
const getInHandMaterialPrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sap_emp_code } = res.locals.jwt;
    try {
        let total = yield mysql_1.connection.query(`SELECT IFNULL(SUM(mb.\`current_qty\` * mm.\`price\`), 0)
            AS total 
            FROM tbl_emp_material_bin mb
            LEFT JOIN tbl_sap_material_master mm 
            ON mb.material_code = mm.material_code
            WHERE employee_code= $1`, { bind: [String(sap_emp_code)], type: sequelize_1.QueryTypes.SELECT });
        let successObj = {
            statusCode: 200,
            message: 'Get total price Successful',
            data: total[0]
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    catch (error) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
            statusCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR
        });
    }
});
const getEquipments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, offset, limit, serviceCode } = req.query;
    const equipmentData = yield getMaterialWithType(search, offset, limit, serviceCode, 'equipment');
    let successObj = {
        statusCode: 200,
        message: 'Get Equipment Successful',
        data: equipmentData.resultObj,
        total_count: equipmentData.totalCount
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postEquipmentUsage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let equipmentArray = req.body.data;
    const jobCode = req.params.jobid;
    const { sap_emp_code } = res.locals.jwt;
    const equipmentUsageObj = [];
    equipmentArray.map((equipment) => {
        let { equipmentcode, time } = equipment;
        let hrs = time.split(':')[0];
        let mins = time.split(':')[1];
        hrs = parseInt(hrs) + Math.trunc(parseInt(mins) / 60);
        mins = mins % 60;
        if (sap_emp_code && (hrs || mins) && hrs < 24 && jobCode && equipmentcode && time != '00:00') {
            equipmentUsageObj.push({
                job_code: (0, validations_1.paramValidator)(jobCode),
                material_code: equipmentcode,
                supervisor_emp_code: sap_emp_code,
                hrs: hrs,
                mins: mins,
                date: new Date()
            });
        }
        else {
            throw new appErrors_1.AppError({
                httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
                statusCode: httpResponse_1.HttpCode.INPUT_ERROR
            });
        }
    });
    yield models_1.EquipmentUsage.bulkCreate(equipmentUsageObj);
    let successObj = {
        statusCode: 201,
        message: 'Successfully created equipment usage request.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
exports.default = {
    postMaterialRequest,
    getSupervisorMaterials,
    materialUsageSummary,
    getMaterialData,
    getCompleteSummary,
    postMaterialUsage,
    getRequestedMaterialList,
    getInHandMaterialPrice,
    getEquipments,
    postEquipmentUsage
};
