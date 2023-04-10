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
exports.mapSapQuoteIdToId = void 0;
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("../utils/appErrors");
const successHandler_1 = require("../utils/successHandler");
const models_1 = require("../models");
const config_1 = __importDefault(require("../config/config"));
const validations_1 = require("../utils/validations");
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const imageUpload_1 = require("../middleware/imageUpload");
const paymentTerms_1 = __importDefault(require("../models/paymentTerms"));
const getAllPaymentStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset, limit, search } = req.query;
    const validatedSearch = (0, validations_1.paramValidator)(search);
    let whereObj = {};
    if (validatedSearch) {
        whereObj = {
            [sequelize_1.Op.or]: [
                { '$Customer.customer_code$': validatedSearch },
                {
                    '$Customer.name$': validatedSearch
                }
            ]
        };
    }
    const empCode = res.locals.jwt.sap_emp_code;
    const getPendingCollectionList = yield models_1.Quote.findAndCountAll({
        attributes: ['id', 'sap_quote_id'],
        subQuery: false,
        where: {
            assigned_supervisor_id: empCode,
            '$Jobs.status_code$': 'ST05'
        },
        include: [
            {
                model: models_1.Customer,
                attributes: ['customer_code', 'name', 'total_outstanding_amount'],
                where: Object.assign(Object.assign({}, whereObj), { total_outstanding_amount: { [sequelize_1.Op.gt]: 0 } })
            },
            {
                model: models_1.Job,
                include: [{ model: paymentTerms_1.default, attributes: [] }],
                attributes: [
                    [sequelize_1.Sequelize.literal('`Jobs->PaymentTerm`.`term`'), 'payment_terms'],
                    [
                        sequelize_1.Sequelize.fn('IF', sequelize_1.Sequelize.literal('Jobs.payment_terms_code = "" OR Jobs.payment_terms_code IS NULL'), 0, sequelize_1.Sequelize.fn('TIMESTAMPDIFF', sequelize_1.Sequelize.literal('DAY'), sequelize_1.Sequelize.literal(`CURRENT_TIMESTAMP()`), sequelize_1.Sequelize.fn('DATE_ADD', sequelize_1.Sequelize.literal('`Jobs`.`end_date` , INTERVAL `Jobs->PaymentTerm`.`term` DAY')))),
                        'payment_due_day'
                    ],
                    [
                        sequelize_1.Sequelize.literal('(SELECT COUNT(DISTINCT job_code) FROM tbl_invoice INNER JOIN tbl_job j ON j.sap_job_code = job_code WHERE due_amount > 0 AND  j.sap_quote_id = `Quote`.sap_quote_id AND j.status_code = "ST05")'),
                        'jobCount'
                    ]
                ],
                where: {
                    status_code: {
                        [sequelize_1.Op.in]: ['ST05']
                    },
                    id: {
                        [sequelize_1.Op.in]: sequelize_1.Sequelize.literal('(SELECT MIN(id) FROM tbl_job WHERE status_code = "ST05" AND  sap_quote_id = `Quote`.sap_quote_id)')
                    }
                },
                required: true
            }
        ],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Get pending collection data successful',
        data: getPendingCollectionList.rows,
        total_count: getPendingCollectionList.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getAllJobsOfQuote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    const { search, filter, offset, limit } = req.query;
    const validatedFilter = (0, validations_1.paramValidator)(filter);
    const validatedSearch = (0, validations_1.paramValidator)(search);
    let filterWhereObj = {};
    let whereObj = {};
    let requiredFalseObj = {};
    if (!validatedFilter || validatedFilter == 'overdue' || validatedFilter == 'upcoming') {
        requiredFalseObj = { required: false };
    }
    if (validatedSearch) {
        whereObj = { sap_job_code: validatedSearch };
    }
    const jobData = yield models_1.Job.findAndCountAll({
        attributes: [
            'sap_job_code',
            [
                sequelize_1.Sequelize.fn('IF', sequelize_1.Sequelize.literal('payment_terms_code = "" OR payment_terms_code IS NULL'), 0, sequelize_1.Sequelize.fn('TIMESTAMPDIFF', sequelize_1.Sequelize.literal('DAY'), sequelize_1.Sequelize.literal(`CURRENT_TIMESTAMP()`), sequelize_1.Sequelize.fn('DATE_ADD', sequelize_1.Sequelize.literal('`end_date` , INTERVAL PaymentTerm.term DAY')))),
                'payment_due_day'
            ]
        ],
        where: Object.assign({ sap_quote_id: quoteId, is_oneoff_job: 1, status_code: 'ST05' }, whereObj),
        include: [
            {
                model: models_1.Payment,
                attributes: ['cheque_sap_handover_status', 'cheque_bounce'],
                where: {
                    id: { [sequelize_1.Op.in]: sequelize_1.Sequelize.literal('(SELECT MAX(p.id) FROM tbl_payment p WHERE p.job_code = `Job`.sap_job_code)') }
                },
                required: false
            },
            { model: paymentTerms_1.default, attributes: [] }
        ]
    });
    let filterJobCode = JSON.parse(JSON.stringify(jobData.rows));
    let jobIdList = [];
    const filterFunction = (ele) => {
        let returnCondition;
        if (ele.Payments[0]) {
            returnCondition = ele.Payments[0].cheque_sap_handover_status != 1 && ele.Payments[0].cheque_bounce != 1;
        }
        else {
            returnCondition = true;
        }
        return returnCondition;
    };
    if (validatedFilter == 'overdue') {
        filterJobCode
            .filter((ele) => ele.payment_due_day < 0 && ele.payment_due_day != null && filterFunction(ele))
            .map((ele, index) => {
            jobIdList[index] = ele.sap_job_code;
        });
    }
    if (validatedFilter == 'upcoming') {
        filterJobCode
            .filter((ele) => ele.payment_due_day >= 0 && ele.payment_due_day != null && filterFunction(ele))
            .map((ele, index) => {
            jobIdList[index] = ele.sap_job_code;
        });
    }
    if (validatedFilter == 'upcoming' || validatedFilter == 'overdue') {
        filterWhereObj = {
            sap_job_code: { [sequelize_1.Op.in]: jobIdList }
        };
    }
    const chequeReceived = validatedFilter == 'received' ? { [sequelize_1.Op.and]: [{ cheque_sap_handover_status: 1 }, { cheque_bounce: 0 }] } : {};
    const chequeBounced = validatedFilter == 'bounced' ? { cheque_bounce: 1 } : {};
    const jobListing = yield models_1.Job.findAndCountAll({
        subQuery: false,
        attributes: [
            'sap_job_code',
            'sap_quote_id',
            'end_date',
            [sequelize_1.Sequelize.col('`PaymentTerm`.`term`'), 'payment_terms'],
            [
                sequelize_1.Sequelize.fn('IF', sequelize_1.Sequelize.literal('Job.payment_terms_code = "" OR Job.payment_terms_code IS NULL'), 0, sequelize_1.Sequelize.fn('TIMESTAMPDIFF', sequelize_1.Sequelize.literal('DAY'), sequelize_1.Sequelize.literal(`CURRENT_TIMESTAMP()`), sequelize_1.Sequelize.fn('DATE_ADD', sequelize_1.Sequelize.literal('`end_date` , INTERVAL `PaymentTerm`.`term` DAY')))),
                'payment_due_day'
            ]
        ],
        where: Object.assign(Object.assign({ sap_quote_id: quoteId, is_oneoff_job: 1, status_code: 'ST05' }, whereObj), filterWhereObj),
        include: [
            {
                model: models_1.DivisionMaster,
                attributes: ['id', 'name']
            },
            {
                model: models_1.SapSite,
                attributes: ['site_code', 'name']
            },
            Object.assign({ model: models_1.Payment, attributes: [
                    'id',
                    'job_code',
                    'payment_mode',
                    'cheque_sap_handover_status',
                    'cheque_bounce',
                    [
                        sequelize_1.Sequelize.literal('(SELECT SUM(amount) from `tbl_payment` WHERE `Job`.sap_job_code = `tbl_payment`.job_code AND (`tbl_payment`.cheque_bounce != 1 OR `tbl_payment`.cheque_bounce IS NULL) group by `tbl_payment`.job_code)'),
                        'recent_payment'
                    ]
                ], where: Object.assign(Object.assign(Object.assign({}, chequeReceived), chequeBounced), { id: { [sequelize_1.Op.in]: sequelize_1.Sequelize.literal('(SELECT MAX(p.id) FROM tbl_payment p WHERE p.job_code = `Job`.sap_job_code)') } }) }, requiredFalseObj),
            {
                model: models_1.Quote,
                attributes: ['id', 'sap_quote_id'],
                include: [
                    {
                        model: models_1.Customer,
                        attributes: ['id', 'name', 'customer_code', 'mobile_number', 'email', 'total_outstanding_amount']
                    }
                ]
            },
            {
                model: models_1.Invoice,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {
                    due_amount: { [sequelize_1.Op.gt]: 0 },
                    id: { [sequelize_1.Op.in]: sequelize_1.Sequelize.literal('(SELECT MAX(i.id) FROM tbl_invoice i WHERE i.job_code = `Job`.sap_job_code)') }
                }
            },
            { model: paymentTerms_1.default, attributes: [] }
        ],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit
    });
    let successObj = {
        statusCode: 200,
        message: 'Get Job list for a quote ID successful',
        data: jobListing.rows,
        total_count: jobListing.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getSupervisorPaymentSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset, limit } = req.query;
    const data = yield models_1.Payment.findAndCountAll({
        attributes: ['id', 'payment_mode', 'amount', 'createdAt', 'cheque_sap_handover_status', 'cheque_bounce'],
        where: { collected_employee_code: res.locals.jwt.sap_emp_code },
        include: [
            {
                model: models_1.EmployeeCashWallet,
                attributes: ['id', 'cr_amount', 'dr_amount']
            },
            {
                model: models_1.Job,
                attributes: ['is_oneoff_job'],
                include: [
                    {
                        model: models_1.SapSite,
                        attributes: ['site_code', 'name']
                    },
                    {
                        model: models_1.DivisionMaster,
                        attributes: ['id', 'name']
                    }
                ]
            }
        ],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit,
        order: [['id', 'DESC']]
    });
    let successObj = {
        statusCode: 200,
        message: 'Successfully fetched payment history.',
        data: data.rows,
        total_count: data.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { job_code, payment_mode, amount, customer_id } = req.body.data;
    const { sap_emp_code } = res.locals.jwt;
    let data;
    if (req.file !== undefined && payment_mode === 'cheque') {
        data = yield (0, imageUpload_1.Upload)(req);
    }
    const previousCrAmount = yield models_1.EmployeeCashWallet.findOne({
        attributes: ['balance'],
        where: { employee_code: sap_emp_code },
        order: [['id', 'DESC']],
        raw: true
    });
    try {
        yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Payment.create({
                job_code,
                payment_mode,
                amount,
                image_url: payment_mode === 'cheque' && data ? data.Key : null,
                customer_id,
                collected_employee_code: sap_emp_code,
                EmployeeCashWallets: payment_mode === 'cash' && {
                    employee_code: sap_emp_code,
                    cr_amount: amount,
                    balance: previousCrAmount ? Number(previousCrAmount.balance) + Number(amount) : amount
                }
            }, { include: payment_mode === 'cash' && [models_1.EmployeeCashWallet], transaction: t });
            if (payment_mode === 'cash')
                yield models_1.Customer.decrement({ total_outstanding_amount: amount }, { where: { id: Number(customer_id) }, transaction: t });
            let successObj = {
                statusCode: 201,
                message: 'Successfully created payment.'
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
const getTotalPaymentSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sap_emp_code } = res.locals.jwt;
    const [cashBalanceResponse, chequeCountResponse, totalBalanceResponse] = yield Promise.all([
        models_1.Payment.findAll({
            replacements: [sap_emp_code],
            include: [
                {
                    model: models_1.EmployeeCashWallet,
                    attributes: ['balance'],
                    where: { id: { [sequelize_1.Op.in]: sequelize_1.Sequelize.literal('(SELECT MAX(id) FROM tbl_employee_cash_wallet WHERE employee_code = ?)') } }
                }
            ],
            attributes: [],
            where: {
                collected_employee_code: sap_emp_code,
                payment_mode: 'cash'
            }
        }),
        models_1.Payment.count({
            group: ['collected_employee_code'],
            where: {
                payment_mode: 'cheque',
                cheque_bounce: { [sequelize_1.Op.or]: [0, null] },
                cheque_sap_handover_status: { [sequelize_1.Op.ne]: 1 },
                collected_employee_code: sap_emp_code
            }
        }),
        mysql_1.connection.query(`SELECT
        ((
        SELECT
            CAST(IFNULL(SUM(amount), 0) as DECIMAL(8, 2))
        from
            tbl_payment
        WHERE
            payment_mode = 'cheque'
            AND cheque_sap_handover_status != 1
            AND collected_employee_code = $1
            AND (cheque_bounce != 1
                OR cheque_bounce IS NULL)) + (
        SELECT
            CAST(IFNULL((balance), 0) as DECIMAL(8, 2))
        FROM
            tbl_employee_cash_wallet
        WHERE
            employee_code = $1
            AND id IN (
            SELECT
                MAX(id)
            FROM
                tbl_employee_cash_wallet
            WHERE
                employee_code = $1)
        group by
            employee_code)) as total_balance;`, { bind: [sap_emp_code], type: sequelize_1.QueryTypes.SELECT })
    ]);
    let successObj = {
        statusCode: 201,
        message: 'Successfully fetched total payment summary.',
        data: {
            cash_balance: cashBalanceResponse && cashBalanceResponse[0] ? cashBalanceResponse[0].EmployeeCashWallets[0].balance : 0,
            cheque_count: chequeCountResponse && chequeCountResponse[0] ? chequeCountResponse[0].count : 0,
            total_balance: totalBalanceResponse[0].total_balance
        }
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const mapSapQuoteIdToId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const mapSapQuote = yield models_1.Quote.findOne({
        attributes: ['id'],
        where: {
            [sequelize_1.Op.or]: [{ sap_quote_id: id }, { id: id }]
        },
        raw: true
    });
    if (mapSapQuote)
        return mapSapQuote.id;
});
exports.mapSapQuoteIdToId = mapSapQuoteIdToId;
const updateJobStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { jobcode } = req.params;
        let { copy_of_quote, id } = req.body.data;
        const { sap_emp_code } = res.locals.jwt;
        let data;
        let validatedJobCode = (0, validations_1.paramValidator)(jobcode);
        const mappedId = yield (0, exports.mapSapQuoteIdToId)(id);
        if (req.file !== undefined) {
            data = yield (0, imageUpload_1.Upload)(req);
        }
        yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            let getJobStatusCode = yield models_1.Job.findOne({
                attributes: ['sap_job_code', 'status_code', 'is_oneoff_job'],
                where: { sap_job_code: validatedJobCode },
                transaction: t
            });
            let statusCode = getJobStatusCode.is_oneoff_job ? 'ST05' : 'ST04';
            const beforeUpdate = yield models_1.Quote.findOne({
                where: { id: mappedId },
                transaction: t
            });
            yield models_1.Quote.update({ copy_of_quote: copy_of_quote }, { where: { id: mappedId }, transaction: t });
            const afterUpdate = yield models_1.Quote.findOne({
                where: { id: mappedId },
                transaction: t
            });
            yield models_1.QuoteLog.create({
                quote_id: beforeUpdate.id,
                date: new Date(),
                supervisor_code: sap_emp_code,
                old_quote_obj: JSON.stringify(beforeUpdate),
                new_quote_obj: JSON.stringify(afterUpdate)
            }, { transaction: t });
            yield models_1.Job.update({ status_code: statusCode, spc_form_url: data ? data.Key : null }, {
                where: {
                    sap_job_code: validatedJobCode
                },
                transaction: t
            });
            let successObj = {
                statusCode: 201,
                message: 'Updated Job status successfully.'
            };
            successHandler_1.successHandler.handleSuccess(successObj, res, req);
        }));
    }
    catch (error) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: error.message
        });
    }
});
const getSpcFormUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobCode } = req.params;
    const getSpcFormUrlRes = yield models_1.Job.findOne({
        attributes: ['sap_job_code', 'spc_form_url'],
        where: { sap_job_code: jobCode }
    });
    if (getSpcFormUrlRes != null) {
        let successObj = {
            statusCode: 200,
            message: 'Get SPC form url Successful.',
            data: getSpcFormUrlRes
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
const postAcceptanceProofImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    let data;
    let quoteInitImagesObj = {};
    if (req.file !== undefined) {
        data = yield (0, imageUpload_1.Upload)(req);
    }
    const getQuoteInitImageDetails = yield models_1.QuoteInitImages.findOne({
        attributes: ['quote_id', 'image_url'],
        where: { quote_id: quoteId, type: 'approve' }
    });
    const quoteDetails = JSON.parse(JSON.stringify(getQuoteInitImageDetails));
    if (!quoteDetails) {
        quoteInitImagesObj = {
            image_url: data ? data.Key : null,
            quote_id: quoteId,
            type: 'approve'
        };
        yield models_1.QuoteInitImages.create(quoteInitImagesObj);
    }
    else {
        yield models_1.QuoteInitImages.update({ image_url: data ? data.Key : null }, { where: { quote_id: quoteId, type: 'approve' } });
    }
    let successObj = {
        statusCode: 201,
        message: 'Post acceptance proof image successful.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
let postDivisionMaster = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        let divisions = data.map((obj) => {
            return Object.assign(Object.assign({}, obj), { is_active: 1, is_catering: obj.division_code == 'G2' ? 1 : 0 });
        });
        yield models_1.DivisionMaster.bulkCreate(divisions);
        let successObj = {
            statusCode: 201,
            message: 'created divisions'
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    catch (error) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
            statusCode: httpResponse_1.HttpCode.BAD_REQUEST
        });
    }
});
exports.default = {
    getAllPaymentStatus,
    getTotalPaymentSummary,
    postPayment,
    updateJobStatus,
    getSupervisorPaymentSummary,
    getSpcFormUrl,
    getAllJobsOfQuote,
    postAcceptanceProofImg,
    postDivisionMaster
};
