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
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const imageUpload_1 = require("../middleware/imageUpload");
const serviceGroup_1 = __importDefault(require("../models/serviceGroup"));
const collections_1 = require("./collections");
const getCustomerDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    let whereObj;
    if (search) {
        const validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = {
            [sequelize_1.Op.or]: [
                {
                    name: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` }
                },
                {
                    mobile_number: { [sequelize_1.Op.like]: `${validatedSearchStr}%` }
                }
            ]
        };
    }
    let getCustomerDetailsRes = yield models_1.Customer.findAndCountAll({
        attributes: [
            'id',
            'mobile_number',
            'name',
            'address_line_1',
            'address_line_2',
            'city',
            'email',
            'total_outstanding_amount',
            'type',
            'vat',
            'is_vat_applicable',
            'is_company',
            'zipcode',
            'service_group'
        ],
        where: whereObj
    });
    let successObj = {
        statusCode: 200,
        message: 'Get Customer Details Successful',
        data: getCustomerDetailsRes.rows,
        total_count: getCustomerDetailsRes.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postQuote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, start_date, total, job_duration, discount, margin, payment_on_credit, site_visit_require, assigned_supervisor_id, copy_of_quote, payment_terms_code, site_visited_status, QuoteItems } = req.body;
    const { sap_emp_code } = res.locals.jwt;
    yield models_1.Quote.create({
        customer_id,
        start_date,
        total,
        job_duration,
        discount,
        margin,
        payment_on_credit,
        site_visit_require,
        site_visited_status,
        created_supervisor_id: sap_emp_code,
        assigned_supervisor_id,
        status_code: 'ST14',
        payment_terms_code: payment_terms_code ? payment_terms_code : null,
        copy_of_quote: copy_of_quote ? copy_of_quote : 'digital',
        paid: 0,
        assigned_by_id: sap_emp_code,
        QuoteItems
    }, { include: [{ model: models_1.QuoteItem, include: [{ model: models_1.QuoteLineItem }] }] });
    let successObj = {
        statusCode: 201,
        message: 'Successfully created quote.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { mobilenumber, name, email, addressline1, addressline2, type, serviceGroup, is_vat_applicable } = req.body;
    if (type == '') {
        type = null;
    }
    if (serviceGroup == '') {
        serviceGroup = null;
    }
    const checkMobileNumber = yield models_1.Customer.findOne({
        attributes: ['mobile_number'],
        where: { mobile_number: mobilenumber }
    });
    const customerDetailObj = Object.assign({ mobile_number: mobilenumber, name: name, email: email, address_line_1: addressline1, address_line_2: addressline2, type: type, service_group: serviceGroup, is_vat_applicable: is_vat_applicable }, req.body);
    if (checkMobileNumber) {
        yield models_1.Customer.update(customerDetailObj, { where: { mobile_number: mobilenumber } });
        let successObj = {
            statusCode: 201,
            message: 'Successfully updated customer details.'
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        yield models_1.Customer.create(customerDetailObj);
        let successObj = {
            statusCode: 201,
            message: 'Successfully added customer details.'
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
});
const getSupervisorQuotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const empCode = res.locals.jwt.sap_emp_code;
    const { filter, search, offset, limit } = req.query;
    let validateFilter;
    let validatedSearch;
    let whereObj = { assigned_supervisor_id: empCode };
    if (search) {
        validatedSearch = (0, validations_1.paramValidator)(search);
    }
    const StatusCountData = yield models_1.StatusMaster.findAll({
        attributes: ['desc', [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('Quotes.id')), 'total_status_count']],
        include: [
            {
                model: models_1.Quote,
                attributes: ['id'],
                where: whereObj,
                include: [
                    {
                        model: models_1.Customer,
                        attributes: ['name'],
                        where: search ? { name: { [sequelize_1.Op.like]: `%${validatedSearch}%` } } : {}
                    }
                ]
            }
        ],
        where: { type: 'quote' },
        group: ['desc']
    });
    let list = JSON.parse(JSON.stringify(StatusCountData));
    let open_exists = list.map((obj) => obj.desc.toLowerCase() === 'open').includes(true);
    let closed_exists = list.map((obj) => obj.desc.toLowerCase() === 'closed').includes(true);
    let Rejected_exists = list.map((obj) => obj.desc.toLowerCase() === 'rejected').includes(true);
    if (!open_exists) {
        list.push({
            desc: 'Open',
            total_status_count: 0,
            Quotes: []
        });
    }
    if (!closed_exists) {
        list.push({
            desc: 'Closed',
            total_status_count: 0,
            Quotes: []
        });
    }
    if (Rejected_exists) {
        let reject_index = list.indexOf(list.filter((obj) => obj.desc.toLowerCase() === 'rejected')[0]);
        let closed_index = list.indexOf(list.filter((obj) => obj.desc.toLowerCase() === 'closed')[0]);
        list[closed_index].total_status_count += list[reject_index].total_status_count;
        list.splice(reject_index, 1);
    }
    if (filter) {
        validateFilter = (0, validations_1.paramValidator)(filter);
        whereObj = Object.assign(Object.assign({}, whereObj), { status_code: validateFilter === 'open' ? 'ST14' : { [sequelize_1.Op.in]: ['ST15', 'ST16'] } });
    }
    const data = yield models_1.Quote.findAndCountAll({
        where: search
            ? {
                assigned_supervisor_id: empCode,
                [sequelize_1.Op.or]: [{ '$`Customer`.`name`$': { [sequelize_1.Op.like]: `%${validatedSearch}%` } }, { id: { [sequelize_1.Op.like]: `%${validatedSearch}%` } }]
            }
            : whereObj,
        attributes: [
            'id',
            'status_code',
            'assigned_supervisor_id',
            'site_visit_require',
            'created_supervisor_id',
            'site_visited_status',
            'createdAt',
            'updatedAt',
            'total',
            'assigned_by_id'
        ],
        include: [
            {
                model: models_1.StatusMaster,
                attributes: ['desc']
            },
            {
                model: models_1.Customer,
                attributes: ['id', 'customer_code', 'name']
            },
            {
                model: models_1.Employee,
                attributes: ['first_name', 'last_name'],
                as: 'Created_supervisor_name'
            },
            {
                model: models_1.Employee,
                as: 'Assigned_supervisor_name',
                attributes: ['first_name', 'last_name']
            },
            {
                model: models_1.QuoteLog,
                attributes: ['supervisor_code', 'id'],
                include: [
                    {
                        model: models_1.Employee,
                        attributes: ['first_name', 'last_name']
                    }
                ],
                order: [['id', 'DESC']],
                limit: 1
            }
        ],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit,
        order: [['updatedAt', 'DESC']]
    });
    for (let obj of data.rows) {
        let quote_log;
        if (obj.QuoteLogs.length != 0) {
            let quote_log_assigned = yield models_1.QuoteLog.findAll({
                attributes: ['supervisor_code', 'old_quote_obj', 'new_quote_obj'],
                where: {
                    quote_id: obj.id,
                    new_quote_obj: {
                        [sequelize_1.Op.eq]: 'null'
                    },
                    supervisor_code: obj.created_supervisor_id
                },
                limit: 1,
                order: [['id', 'DESC']]
            });
            if (quote_log_assigned.length) {
                quote_log = quote_log_assigned;
            }
            else {
                quote_log = yield models_1.QuoteLog.findAll({
                    attributes: ['supervisor_code', 'old_quote_obj'],
                    where: {
                        quote_id: obj.id,
                        new_quote_obj: {
                            [sequelize_1.Op.ne]: null
                        },
                        supervisor_code: obj.created_supervisor_id
                    },
                    limit: 1,
                    order: [['id', 'ASC']]
                });
            }
            let old_quote = JSON.parse(quote_log[0].old_quote_obj);
            let assigned_by_supervisor = yield models_1.Employee.findOne({
                attributes: ['first_name', 'last_name'],
                where: { sap_employee_code: old_quote.created_supervisor_id }
            });
            obj.dataValues.assigned_by = [];
            obj.dataValues.assigned_by.push(assigned_by_supervisor);
        }
        else {
            obj.dataValues.assigned_by = [];
        }
    }
    let successObj = {
        statusCode: 200,
        message: `Successfully Fetched ${validateFilter} quotes.`,
        data: { quotes: data.rows, Count_details: list },
        total_count: data.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const putQuote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { QuoteItems, total, job_duration, discount, margin, start_date, assigned_supervisor_id, assigned_by_id } = req.body;
    const { quoteId } = req.params;
    const { sap_emp_code } = res.locals.jwt;
    try {
        yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const beforeUpdate = yield models_1.Quote.findOne({
                where: { id: quoteId, assigned_supervisor_id: sap_emp_code },
                include: [{ model: models_1.QuoteItem, include: [{ model: models_1.QuoteLineItem }] }],
                transaction: t
            });
            yield models_1.Quote.update({
                total,
                job_duration,
                discount,
                margin,
                assigned_supervisor_id,
                start_date,
                assigned_by_id,
                created_supervisor_id: sap_emp_code
            }, { where: { id: Number(quoteId), assigned_supervisor_id: sap_emp_code }, returning: true, transaction: t });
            const updatedQuoteItems = QuoteItems.map((ele) => {
                return Object.assign(Object.assign({}, ele), { quote_id: quoteId });
            });
            yield models_1.QuoteItem.destroy({
                where: { quote_id: Number(quoteId) },
                transaction: t
            });
            yield models_1.QuoteItem.bulkCreate(updatedQuoteItems, { include: [{ model: models_1.QuoteLineItem }], transaction: t });
            const afterUpdate = yield models_1.Quote.findOne({
                where: { id: quoteId, assigned_supervisor_id: sap_emp_code },
                include: [{ model: models_1.QuoteItem, include: [{ model: models_1.QuoteLineItem }] }],
                transaction: t
            });
            yield models_1.QuoteLog.create({
                quote_id: beforeUpdate.id,
                date: new Date(),
                supervisor_code: sap_emp_code,
                old_quote_obj: JSON.stringify(beforeUpdate),
                new_quote_obj: JSON.stringify(afterUpdate)
            }, { transaction: t });
            let successObj = {
                statusCode: 201,
                message: 'Successfully updated quote.'
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
const getDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, offset, limit } = req.query;
    let whereObj = { is_active: 1 };
    if (search) {
        const validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = Object.assign(Object.assign({}, whereObj), { name: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` } });
    }
    const getJobDivisionRes = yield models_1.DivisionMaster.findAndCountAll({
        attributes: ['id', 'name'],
        where: whereObj,
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Get Job division Successful',
        data: getJobDivisionRes.rows,
        total_count: getJobDivisionRes.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getInitiationChecklist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceid, offset, limit } = req.query;
    const serviceIdArray = (0, validations_1.paramValidator)(serviceid.toString().split(','), 'number');
    const getChecklistRes = yield models_1.InitiationCheckList.findAndCountAll({
        attributes: ['id', 'service_id', 'checklist'],
        where: {
            service_id: { [sequelize_1.Op.in]: serviceIdArray }
        },
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Get Initiation form data Successful.',
        data: getChecklistRes.rows,
        total_count: getChecklistRes.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getServiceCatalog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    let validatedSearch;
    let result = [];
    if (search) {
        validatedSearch = String((0, validations_1.paramValidator)(search));
    }
    let divisionCount;
    let data;
    [divisionCount, data] = yield Promise.all([
        models_1.DivisionMaster.findAll({
            attributes: ['id', [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('ServiceCatalogs.id')), 'count']],
            order: [['id', 'ASC']],
            include: [
                {
                    model: models_1.ServiceCatalog,
                    attributes: ['service_name'],
                    where: search
                        ? { service_name: { [sequelize_1.Op.like]: `%${validatedSearch}%` }, service_type: 'regular' }
                        : { service_type: 'regular' },
                    required: false
                }
            ],
            group: ['id']
        }),
        models_1.DivisionMaster.findAll({
            attributes: ['id', 'name'],
            order: [['id', 'ASC']],
            include: [
                {
                    model: models_1.ServiceCatalog,
                    attributes: ['id', 'service_code', 'service_name', 'price', 'description'],
                    where: search
                        ? { service_name: { [sequelize_1.Op.like]: `%${validatedSearch}%` }, service_type: 'regular' }
                        : { service_type: 'regular' },
                    required: false
                }
            ]
        })
    ]);
    let sum = 0;
    data.map((value, index) => {
        sum += divisionCount[index].dataValues.count;
        if (value.dataValues.id === 2) {
            value.dataValues.ServiceCatalogs = [];
            result.push(Object.assign(Object.assign({}, value.dataValues), { count: 0 }));
        }
        else {
            result.push(Object.assign(Object.assign({}, value.dataValues), { count: divisionCount[index].dataValues.count }));
        }
    });
    let successObj = {
        statusCode: 200,
        message: 'successfully fetched service catalog',
        data: result,
        total_count: sum
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postInitiationForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    const { QuoteItems, copy_of_quote, init_comments, margin, discount, site_visited_status, total, vat } = req.body;
    const { sap_emp_code } = res.locals.jwt;
    let quoteUpdateObj = { status_code: 'ST16', margin, discount, total, vat };
    if (init_comments) {
        quoteUpdateObj = Object.assign(Object.assign({}, quoteUpdateObj), { init_comments });
    }
    try {
        yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const quoteDetails = yield models_1.Quote.findOne({
                attributes: ['id', 'site_visit_require', 'site_visited_status'],
                where: { id: Number(quoteId), status_code: 'ST14', assigned_supervisor_id: sap_emp_code },
                transaction: t
            });
            if (quoteDetails && quoteDetails.site_visit_require === 1 && quoteDetails.site_visited_status === 0) {
                quoteUpdateObj = Object.assign(Object.assign({}, quoteUpdateObj), { copy_of_quote, site_visited_status, status_code: 'ST14' });
            }
            yield models_1.Quote.update(quoteUpdateObj, {
                where: { id: Number(quoteId), status_code: 'ST14', assigned_supervisor_id: sap_emp_code },
                transaction: t
            });
            yield models_1.QuoteLineItem.destroy({
                where: {
                    quote_item_id: {
                        [sequelize_1.Op.in]: QuoteItems.map((ele) => {
                            return ele.id;
                        })
                    }
                },
                transaction: t
            });
            for (const iterator of QuoteItems) {
                yield models_1.QuoteLineItem.bulkCreate(iterator.QuoteLineItems, { transaction: t });
            }
            let successObj = {
                statusCode: 201,
                message: 'Successfully published the quote.'
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
const getIndividualQuote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { quoteId } = req.params;
    quoteId = yield (0, collections_1.mapSapQuoteIdToId)(quoteId);
    let response = yield models_1.Quote.findOne({
        include: [
            {
                model: models_1.QuoteItem,
                attributes: [
                    'price',
                    'qty',
                    'id',
                    'service_id',
                    [sequelize_1.Sequelize.literal("''"), 'material'],
                    [sequelize_1.Sequelize.literal("''"), 'equipment'],
                    [sequelize_1.Sequelize.literal("''"), 'manpower']
                ],
                include: [
                    {
                        model: models_1.ServiceCatalog,
                        attributes: [
                            'service_name',
                            'service_code',
                            'unit_descriptor',
                            'display_order',
                            'id',
                            'division_id',
                            'service_type'
                        ]
                    }
                ]
            }
        ],
        attributes: [
            'total',
            'vat',
            'payment_on_credit',
            'site_visit_require',
            'start_date',
            'assigned_supervisor_id',
            'copy_of_quote',
            'customer_id',
            'job_duration',
            'margin',
            'discount',
            'payment_terms_code',
            'init_comments',
            'site_visited_status',
            'assigned_by_id'
        ],
        where: { id: Number(quoteId) }
    });
    if (response !== null) {
        for (const iterator of response.QuoteItems) {
            iterator.dataValues.material = yield models_1.QuoteLineItem.findAll({
                attributes: [
                    'id',
                    'quote_item_id',
                    'qty',
                    'unit_descriptor',
                    [sequelize_1.Sequelize.col('MaterialMaster.material_name'), 'material_name'],
                    [sequelize_1.Sequelize.col('MaterialMaster.type'), 'type'],
                    [sequelize_1.Sequelize.col('MaterialMaster.material_code'), 'material_code'],
                    [sequelize_1.Sequelize.col('MaterialMaster.price'), 'price']
                ],
                include: [{ model: models_1.MaterialMaster, attributes: [] }],
                where: {
                    quote_item_id: iterator.dataValues.id,
                    '$MaterialMaster.type$': 'material'
                }
            });
            iterator.dataValues.manpower = yield models_1.QuoteLineItem.findAll({
                attributes: [
                    'id',
                    'quote_item_id',
                    'qty',
                    'unit_descriptor',
                    [sequelize_1.Sequelize.col('MaterialMaster.material_name'), 'material_name'],
                    [sequelize_1.Sequelize.col('MaterialMaster.type'), 'type'],
                    [sequelize_1.Sequelize.col('MaterialMaster.material_code'), 'material_code'],
                    [sequelize_1.Sequelize.col('MaterialMaster.price'), 'price']
                ],
                include: [{ model: models_1.MaterialMaster, attributes: [] }],
                where: {
                    quote_item_id: iterator.dataValues.id,
                    '$MaterialMaster.type$': 'man-power'
                }
            });
            iterator.dataValues.equipment = yield models_1.QuoteLineItem.findAll({
                attributes: [
                    'id',
                    'quote_item_id',
                    'qty',
                    'unit_descriptor',
                    [sequelize_1.Sequelize.col('MaterialMaster.material_name'), 'material_name'],
                    [sequelize_1.Sequelize.col('MaterialMaster.type'), 'type'],
                    [sequelize_1.Sequelize.col('MaterialMaster.material_code'), 'material_code'],
                    [sequelize_1.Sequelize.col('MaterialMaster.price'), 'price']
                ],
                include: [{ model: models_1.MaterialMaster, attributes: [] }],
                where: {
                    quote_item_id: iterator.dataValues.id,
                    '$MaterialMaster.type$': 'equipment'
                }
            });
        }
        let successObj = {
            statusCode: 200,
            message: 'Successfully fetched Quote',
            data: response
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            statusCode: httpResponse_1.HttpCode.NO_DATA
        });
    }
});
const rejectQuote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const updateObj = { status_code: 'ST15' };
    const result = yield models_1.Quote.update(updateObj, {
        where: { id: Number((0, validations_1.paramValidator)(id.toString())) }
    });
    if (result[0]) {
        let successObj = {
            statusCode: 201,
            message: 'Reject quote successful.'
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            statusCode: httpResponse_1.HttpCode.INPUT_ERROR
        });
    }
});
const getAuditTrail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    let attr = ['id', 'total', 'created_supervisor_id', 'assigned_supervisor_id', 'created_at'];
    const getAuditTrailRes = yield models_1.Quote.findOne({
        where: { id: Number((0, validations_1.paramValidator)(quoteId)) },
        attributes: attr
    });
    if (getAuditTrailRes != null && getAuditTrailRes) {
        let successObj = {
            statusCode: 200,
            message: 'Get audit trail by quote id successful.',
            data: getAuditTrailRes
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            statusCode: httpResponse_1.HttpCode.INPUT_ERROR
        });
    }
});
const getQuoteItemsForInitiation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { quoteId } = req.params;
    quoteId = yield (0, collections_1.mapSapQuoteIdToId)(quoteId);
    let response = yield models_1.Quote.findOne({
        include: [
            {
                model: models_1.QuoteItem,
                attributes: ['price', 'id', 'qty', 'service_id'],
                include: [
                    {
                        model: models_1.ServiceCatalog,
                        attributes: [
                            'service_name',
                            'service_code',
                            'unit_descriptor',
                            'display_order',
                            'id',
                            'division_id',
                            'service_type'
                        ]
                    }
                ]
            }
        ],
        attributes: ['margin', 'discount', 'init_comments', 'site_visit_require', 'site_visited_status', 'vat', 'job_duration', 'total'],
        where: { id: Number(quoteId) }
    });
    if (response !== null && response.QuoteItems.length !== 0) {
        for (const iterator of response.QuoteItems) {
            iterator.dataValues['material'] = yield models_1.QuoteLineItem.findAll({
                attributes: [
                    'id',
                    'quote_item_id',
                    'qty',
                    'price',
                    'unit_descriptor',
                    [sequelize_1.Sequelize.col('MaterialMaster.material_name'), 'material_name'],
                    [sequelize_1.Sequelize.col('MaterialMaster.type'), 'type'],
                    [sequelize_1.Sequelize.col('MaterialMaster.material_code'), 'material_code'],
                    [sequelize_1.Sequelize.col('MaterialMaster.price'), 'price']
                ],
                include: [{ model: models_1.MaterialMaster, attributes: [] }],
                where: {
                    quote_item_id: iterator.dataValues.id,
                    '$MaterialMaster.type$': 'material'
                }
            });
            iterator.dataValues['manpower'] = yield models_1.QuoteLineItem.findAll({
                attributes: [
                    'id',
                    'quote_item_id',
                    'qty',
                    'price',
                    'unit_descriptor',
                    [sequelize_1.Sequelize.col('MaterialMaster.material_name'), 'material_name'],
                    [sequelize_1.Sequelize.col('MaterialMaster.type'), 'type'],
                    [sequelize_1.Sequelize.col('MaterialMaster.material_code'), 'material_code'],
                    [sequelize_1.Sequelize.col('MaterialMaster.price'), 'price']
                ],
                include: [{ model: models_1.MaterialMaster, attributes: [] }],
                where: {
                    quote_item_id: iterator.dataValues.id,
                    '$MaterialMaster.type$': 'man-power'
                }
            });
            iterator.dataValues['equipment'] = yield models_1.QuoteLineItem.findAll({
                attributes: [
                    'id',
                    'quote_item_id',
                    'qty',
                    'price',
                    'unit_descriptor',
                    [sequelize_1.Sequelize.col('MaterialMaster.material_name'), 'material_name'],
                    [sequelize_1.Sequelize.col('MaterialMaster.type'), 'type'],
                    [sequelize_1.Sequelize.col('MaterialMaster.material_code'), 'material_code'],
                    [sequelize_1.Sequelize.col('MaterialMaster.price'), 'price']
                ],
                include: [{ model: models_1.MaterialMaster, attributes: [] }],
                where: {
                    quote_item_id: iterator.dataValues.id,
                    '$MaterialMaster.type$': 'equipment'
                }
            });
        }
        let successObj = {
            statusCode: 200,
            message: 'Successfully fetched Quote Items.',
            data: response
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        let successObj = {
            statusCode: 200,
            message: 'Could not find any quote items',
            data: []
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
});
const postCustomCatalog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobdivision, jobname, jobdescription, unit } = req.body;
    const serviceType = 'custom';
    let customCatalogObj = {
        description: jobdescription,
        division_id: jobdivision,
        service_name: jobname,
        service_type: serviceType,
        unit_descriptor: unit
    };
    const customCatalogData = yield models_1.ServiceCatalog.create(customCatalogObj);
    let successObj = {
        statusCode: 201,
        data: JSON.parse(JSON.stringify(customCatalogData)),
        message: 'Successfully added custom catalog.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getInitiationFormData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    const quoteInitChecklist = yield models_1.QuoteInitChecklist.findAll({
        attributes: ['id', 'checklist_id', 'value'],
        include: [{ model: models_1.InitiationCheckList, attributes: ['checklist'] }],
        where: {
            quote_id: Number(quoteId)
        }
    });
    let successObj;
    if (quoteInitChecklist !== null && quoteInitChecklist.length !== 0) {
        successObj = {
            statusCode: 200,
            message: 'Successfully fetched quote data.',
            data: quoteInitChecklist
        };
    }
    else {
        successObj = {
            statusCode: 200,
            message: 'Cannot fetch quote data.',
            data: []
        };
    }
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getInitiationFormImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { quoteId } = req.params;
    quoteId = yield (0, collections_1.mapSapQuoteIdToId)(quoteId);
    const quoteImages = yield models_1.QuoteInitImages.findAll({
        attributes: ['id', 'image_url'],
        where: {
            quote_id: Number(quoteId),
            type: 'init'
        }
    });
    const acceptanceImage = yield models_1.QuoteInitImages.findOne({
        attributes: ['id', 'image_url'],
        where: {
            [sequelize_1.Op.and]: [{ quote_id: Number(quoteId) }, { type: 'approve' }]
        }
    });
    let successObj;
    if (quoteImages !== null && quoteImages.length !== 0) {
        successObj = {
            statusCode: 200,
            message: 'Successfully fetched quote images',
            data: { quoteImages: quoteImages, acceptanceImage: acceptanceImage }
        };
    }
    else {
        successObj = {
            statusCode: 200,
            message: 'Cannot fetch quote images.',
            data: []
        };
    }
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postInitiationFormImagesUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    let ImageArr = [];
    if (req.files && req.files.length !== 0) {
        for (const image of req.files) {
            const data = yield (0, imageUpload_1.MultiUpload)(image);
            ImageArr.push(data);
        }
        let updatedImageArr = ImageArr.map((ele) => {
            return { quote_id: quoteId, image_url: ele.Key };
        });
        yield models_1.QuoteInitImages.bulkCreate(updatedImageArr);
        let successObj = {
            statusCode: 201,
            message: 'Successfully uploaded Initiation form images.'
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            statusCode: httpResponse_1.HttpCode.INPUT_ERROR
        });
    }
});
const getQuoteServiceEstimate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceCode } = req.query;
    const { quote_id, offset, limit } = req.query;
    const service_list = serviceCode.toString().split(',');
    const data = yield models_1.ServiceCatalog.findAll({
        attributes: ['id', 'service_code', 'service_name'],
        where: {
            service_code: { [sequelize_1.Op.in]: service_list }
        },
        raw: true
    });
    for (let obj of data) {
        let job_duration;
        let unit_descriptor = yield models_1.ServiceCatalog.findOne({
            where: { id: obj['id'] },
            attributes: ['unit_descriptor'],
            raw: true
        });
        if (quote_id) {
            job_duration = yield models_1.QuoteItem.findAll({
                attributes: ['qty'],
                where: { service_id: obj['id'], quote_id: quote_id },
                raw: true
            });
        }
        function estimate(item) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield mysql_1.connection.query(`
            SELECT tsi.material_code,IFNULL(tqli.qty, tsi.qty)as qty,tsmm.material_name,tsmm.unit_descriptor,tsmm.price FROM tbl_service_item tsi
            LEFT JOIN tbl_quote_line_item tqli on tqli.material_code = tsi.material_code AND 
            (quote_item_id IN (select id from tbl_quote_item tqi where tqi.quote_id = $1))
            LEFT JOIN tbl_sap_material_master tsmm on tsmm.material_code = tsi.material_code where service_code = $2 AND tsmm.type = $3
            UNION
            SELECT tqli2.material_code ,qty,tsmm2.material_name,tsmm2.unit_descriptor,tsmm2.price FROM tbl_quote_line_item tqli2
            LEFT JOIN tbl_sap_material_master tsmm2 on tsmm2.material_code = tqli2.material_code
            WHERE tqli2.quote_item_id IN (select id from tbl_quote_item  where quote_id = $1)
            AND tsmm2.type = $3
            LIMIT $4 OFFSET $5;
            `, {
                    bind: [
                        quote_id ? quote_id : null,
                        obj['service_code'],
                        item,
                        limit ? String(limit) : String(config_1.default.pagination.limit),
                        offset ? String(offset) : String(config_1.default.pagination.offset)
                    ],
                    type: sequelize_1.QueryTypes.SELECT
                });
            });
        }
        obj['qty'] = quote_id ? job_duration[0].qty : 0;
        obj['unit_descriptor'] = unit_descriptor.unit_descriptor;
        obj['material'] = yield estimate('material');
        obj['equipment'] = yield estimate('equipment');
        obj['manpower'] = yield estimate('man-power');
    }
    let successObj = {
        statusCode: 200,
        message: 'Successfully fetched service estimate.',
        data: data
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getServiceGroupList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, offset, limit } = req.query;
    let whereObj = { is_active: 1 };
    if (search) {
        const validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = Object.assign(Object.assign({}, whereObj), { [sequelize_1.Op.or]: [
                {
                    service_group_code: validatedSearchStr
                },
                {
                    name: validatedSearchStr
                }
            ] });
    }
    let getServiceGroupList = yield serviceGroup_1.default.findAndCountAll({
        attributes: ['id', 'name', 'service_group_code'],
        where: whereObj,
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Get Service group list successful.',
        data: getServiceGroupList.rows,
        total_count: getServiceGroupList.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getCustomerType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    let whereObject = {};
    if (code) {
        const validatedSearchStr = (0, validations_1.paramValidator)(code);
        whereObject = Object.assign(Object.assign({}, whereObject), { code: validatedSearchStr });
    }
    let getCustomerType = yield models_1.CustomerType.findAll({
        where: whereObject,
        attributes: ['code', 'type']
    });
    let successObj = {
        statusCode: 200,
        message: 'successfully fetched customer type data.',
        data: getCustomerType
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
exports.default = {
    getCustomerDetails,
    postCustomer,
    postQuote,
    putQuote,
    getDivision,
    getSupervisorQuotes,
    getServiceCatalog,
    getIndividualQuote,
    getInitiationChecklist,
    postInitiationForm,
    postCustomCatalog,
    rejectQuote,
    getAuditTrail,
    getQuoteItemsForInitiation,
    getInitiationFormData,
    getInitiationFormImages,
    getServiceGroupList,
    postInitiationFormImagesUpload,
    getQuoteServiceEstimate,
    getCustomerType
};
