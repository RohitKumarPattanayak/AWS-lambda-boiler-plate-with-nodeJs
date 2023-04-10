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
const appErrors_1 = require("../utils/appErrors");
const httpResponse_1 = require("../interfaces/httpResponse");
const models_1 = require("../models");
const successHandler_1 = require("../utils/successHandler");
const config_1 = __importDefault(require("../config/config"));
const validations_1 = require("../utils/validations");
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const imageUpload_1 = require("../middleware/imageUpload");
const dayjs_1 = __importDefault(require("dayjs"));
const getAssignedJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { search, filter, offset, limit } = req.query;
    const { sap_emp_code } = res.locals.jwt;
    let validatedSearchStr;
    let filterCondition;
    let whereObj;
    whereObj = {
        status_code: { [sequelize_1.Op.in]: ['ST01', 'ST02', 'ST03', 'ST06'] },
        [sequelize_1.Op.and]: [
            {
                start_date: {
                    [sequelize_1.Op.or]: [{ [sequelize_1.Op.lte]: String(new Date().toISOString().split('T')[0]) }, { [sequelize_1.Op.eq]: null }]
                }
            },
            {
                end_date: {
                    [sequelize_1.Op.or]: [{ [sequelize_1.Op.gte]: String(new Date().toISOString().split('T')[0]) }, { [sequelize_1.Op.eq]: null }]
                }
            }
        ]
    };
    if (search && search.length !== 0) {
        validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = Object.assign(Object.assign({}, whereObj), { [sequelize_1.Op.or]: [
                {
                    sap_job_code: validatedSearchStr
                },
                {
                    '$DivisionMaster.name$': validatedSearchStr
                }
            ] });
    }
    if (filter) {
        filterCondition = {
            status_code: { [sequelize_1.Op.in]: String(filter).split(',') }
        };
    }
    const jobs = yield models_1.Job.findAll({
        replacements: [sap_emp_code, sap_emp_code, sap_emp_code, sap_emp_code, sap_emp_code, sap_emp_code],
        attributes: {
            exclude: ['sap_site_code', 'status_code', 'createdAt', 'updatedAt'],
            include: [
                [
                    sequelize_1.Sequelize.literal(`(SELECT
                            (SUM(amount))
                        from
                            \`tbl_payment\`
                        WHERE
                            \`Job\`.sap_job_code = \`tbl_payment\`.job_code
                            AND (\`tbl_payment\`.cheque_bounce != 1
                                OR \`tbl_payment\`.cheque_bounce IS NULL))`),
                    'total_pre_payment'
                ],
                [
                    sequelize_1.Sequelize.literal(`	(
                            SELECT
                                IF((
                                SELECT
                                    (last_report_submitted)
                                FROM
                                    tbl_daily_report
                                WHERE
                                    \`Job\`.\`sap_job_code\` = tbl_daily_report.\`job_code\`
                                    AND submitted_by_employee_code = ?
                                ORDER BY
                                    id DESC
                                limit 1) IS NOT NULL,
                                1,
                                0))`),
                    'is_daily_report_submitted'
                ],
                [
                    sequelize_1.Sequelize.literal(`	(
                                SELECT
                                    (due_amount)
                                FROM
                                    tbl_invoice
                                WHERE
                                    \`Job\`.\`sap_job_code\` = tbl_invoice.\`job_code\`
                                ORDER BY
                                    id DESC
                                limit 1)`),
                    'due_amount'
                ]
            ]
        },
        subQuery: false,
        include: [
            {
                model: models_1.Supervisor,
                attributes: ['upload_essential', 'temp_start_date'],
                include: [{ model: models_1.Employee, attributes: [], include: [{ model: models_1.Attendence, attributes: [] }] }],
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            temp_alloted: 1,
                            [sequelize_1.Op.and]: [
                                {
                                    temp_start_date: {
                                        [sequelize_1.Op.lte]: String(new Date().toISOString().split('T')[0])
                                    }
                                },
                                {
                                    temp_end_date: {
                                        [sequelize_1.Op.gte]: String(new Date().toISOString().split('T')[0])
                                    }
                                }
                            ]
                        },
                        {
                            temp_alloted: 0
                        }
                    ],
                    employee_code: sap_emp_code
                }
            },
            {
                model: models_1.SapSite,
                include: [
                    {
                        model: models_1.SapLocation,
                        attributes: ['latitude', 'id', 'longitude']
                    }
                ],
                attributes: ['name', 'site_code']
            },
            {
                model: models_1.StatusMaster,
                where: filterCondition,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: models_1.DivisionMaster,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: models_1.Quote,
                attributes: ['customer_id'],
                include: [{ model: models_1.Customer, attributes: ['customer_code', 'name', 'email', 'mobile_number', 'total_outstanding_amount'] }]
            }
        ],
        group: ['sap_job_code'],
        where: Object.assign({}, whereObj),
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit,
        order: sequelize_1.Sequelize.literal("FIELD(`Job`.status_code, 'ST01', 'ST03', 'ST02') DESC")
    });
    const jobCount = yield models_1.Job.count({
        include: [
            {
                model: models_1.Supervisor,
                attributes: ['upload_essential'],
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            temp_alloted: 1,
                            [sequelize_1.Op.and]: [
                                {
                                    temp_start_date: {
                                        [sequelize_1.Op.lte]: String(new Date().toISOString().split('T')[0])
                                    }
                                },
                                {
                                    temp_end_date: {
                                        [sequelize_1.Op.gte]: String(new Date().toISOString().split('T')[0])
                                    }
                                }
                            ]
                        },
                        {
                            temp_alloted: 0
                        }
                    ],
                    employee_code: sap_emp_code
                }
            },
            {
                model: models_1.StatusMaster,
                where: filterCondition,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: models_1.DivisionMaster,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ],
        where: Object.assign({}, whereObj)
    });
    if (jobs != null && jobs.length !== 0) {
        let successObj = {
            statusCode: 200,
            message: 'Successfully fetched jobs.',
            data: jobs,
            total_count: Number(jobCount)
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else if (jobs != null && jobs.length === 0) {
        let successObj = {
            statusCode: 200,
            message: 'Successfully fetched jobs.',
            data: [],
            total_count: 0
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
const getJobStatusWithCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    let validatedSearch;
    let data;
    let pendingResponseList = [];
    if (search) {
        validatedSearch = String((0, validations_1.paramValidator)(search));
    }
    const empCode = res.locals.jwt.sap_emp_code;
    const statusList = yield models_1.StatusMaster.findAndCountAll({
        attributes: ['status_code', 'desc'],
        where: { type: 'job', status_code: { [sequelize_1.Op.notIn]: ['ST04', 'ST05'] } }
    });
    statusList.rows.forEach((obj) => {
        data = models_1.Job.findAndCountAll({
            where: {
                status_code: obj.status_code,
                [sequelize_1.Op.and]: [
                    sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('date', sequelize_1.Sequelize.col('start_date')), '<=', (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD')),
                    sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('date', sequelize_1.Sequelize.col('end_date')), '>=', (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD'))
                ]
            },
            include: [
                {
                    model: models_1.Supervisor,
                    where: {
                        [sequelize_1.Op.or]: [
                            {
                                temp_alloted: 1,
                                [sequelize_1.Op.and]: [
                                    {
                                        temp_start_date: {
                                            [sequelize_1.Op.lte]: String(new Date().toISOString().split('T')[0])
                                        }
                                    },
                                    {
                                        temp_end_date: {
                                            [sequelize_1.Op.gte]: String(new Date().toISOString().split('T')[0])
                                        }
                                    }
                                ]
                            },
                            {
                                temp_alloted: 0
                            }
                        ],
                        employee_code: empCode
                    }
                },
                {
                    model: models_1.DivisionMaster,
                    where: search != undefined ? { name: validatedSearch } : {}
                }
            ]
        });
        pendingResponseList.push(data);
    });
    let result = yield Promise.all(pendingResponseList);
    let finalResult = statusList.rows.map((obj, index) => {
        return {
            status_code: obj.status_code,
            status_name: obj.desc,
            count: result[index].count
        };
    });
    let successObj = {
        statusCode: 200,
        message: 'Successfully fetched filters with count.',
        data: finalResult,
        total_count: finalResult.length
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const hasAllStaffCheckedOut = (jobCode) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Attendence.count({
        include: [{ model: models_1.Employee, include: [{ model: models_1.Role }] }],
        where: {
            in_date_time: { [sequelize_1.Op.ne]: null },
            out_date_time: null,
            '$Employee.Role.staff_type$': 0,
            job_code: String(jobCode)
        }
    });
});
const postAttendence = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { checkInTime, checkOutTime, inComment, outComment, checkOutEmployeeCodes } = JSON.parse(req.body.data);
    let { checkInEmployeeCodes } = JSON.parse(req.body.data);
    const { jobCode } = req.params;
    const { sap_emp_code } = res.locals.jwt;
    let data;
    if (req.file !== undefined) {
        data = yield (0, imageUpload_1.Upload)(req);
    }
    let employeeObj = [];
    if (checkInTime && !outComment && !checkOutTime && checkInEmployeeCodes) {
        yield models_1.Job.update({ status_code: 'ST02' }, {
            where: {
                sap_job_code: String(jobCode),
                is_oneoff_job: 0,
                status_code: 'ST01'
            }
        });
        yield models_1.Job.update({ status_code: 'ST03' }, {
            where: {
                sap_job_code: String(jobCode),
                is_oneoff_job: 1,
                status_code: 'ST01'
            }
        });
        const maxDailyReport = yield models_1.DailyReport.findOne({
            attributes: [[sequelize_1.Sequelize.fn('MAX', sequelize_1.Sequelize.col('id')), 'id']],
            where: {
                job_code: String(jobCode),
                submitted_by_employee_code: sap_emp_code,
                [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.and]: [{ date: (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD') }, { last_report_submitted: { [sequelize_1.Op.ne]: null } }]
                    },
                    { last_report_submitted: null }
                ]
            },
            raw: true
        });
        let dailyReportSubmitted = yield models_1.DailyReport.findAll({
            attributes: [[sequelize_1.Sequelize.fn('date', sequelize_1.Sequelize.col('last_report_submitted')), 'last_report_submitted']],
            where: {
                id: maxDailyReport ? maxDailyReport.id : null
            }
        });
        if (!dailyReportSubmitted || dailyReportSubmitted.length === 0) {
            yield models_1.DailyReport.create({
                job_code: String(jobCode),
                session_start_datetime: checkInTime,
                submitted_by_employee_code: sap_emp_code,
                date: (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD')
            });
        }
        for (const iterator of checkInEmployeeCodes) {
            employeeObj.push({
                employee_code: iterator,
                job_code: (0, validations_1.paramValidator)(String(jobCode)),
                in_comment: inComment,
                in_date_time: checkInTime,
                in_photo_url: data && data.Key,
                in_modified_employee_code: sap_emp_code
            });
        }
        const response = yield models_1.Attendence.bulkCreate(employeeObj);
        let successObj = {
            statusCode: 201,
            message: 'Successfully updated attendence.',
            data: response
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else if (!checkInTime && !inComment && checkOutTime && checkOutEmployeeCodes) {
        const response = yield models_1.Attendence.update({
            out_comment: outComment,
            out_date_time: checkOutTime,
            out_photo_url: data && data.Key,
            out_modified_employee_code: sap_emp_code
        }, {
            where: {
                employee_code: checkOutEmployeeCodes,
                job_code: (0, validations_1.paramValidator)(String(jobCode)),
                out_date_time: null,
                in_date_time: { [sequelize_1.Op.ne]: null },
                [sequelize_1.Op.and]: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('TIMESTAMPADD', sequelize_1.Sequelize.literal('DAY'), 0, new Date(checkOutTime)), '<=', sequelize_1.Sequelize.fn('TIMESTAMPADD', sequelize_1.Sequelize.literal('DAY'), 1, sequelize_1.Sequelize.col('in_date_time')))
            }
        });
        const hasAllStaffCheckedOutResponse = yield hasAllStaffCheckedOut(jobCode);
        if (hasAllStaffCheckedOutResponse === 0) {
            yield models_1.DailyReport.update({ session_end_datetime: checkOutTime }, {
                where: {
                    job_code: String(jobCode),
                    last_report_submitted: null,
                    submitted_by_employee_code: sap_emp_code
                }
            });
        }
        if (response[0] !== 0) {
            let successObj = {
                statusCode: 201,
                message: 'Successfully updated attendence.'
            };
            successHandler_1.successHandler.handleSuccess(successObj, res, req);
        }
        else {
            throw new appErrors_1.AppError({
                httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
                statusCode: httpResponse_1.HttpCode.BAD_TIME_INPUT
            });
        }
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            statusCode: httpResponse_1.HttpCode.INPUT_ERROR
        });
    }
});
const getStaffWorkingHours = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset, limit } = req.query;
    const { jobCode } = req.params;
    const maxDailyReport = yield models_1.DailyReport.findOne({
        attributes: [[sequelize_1.Sequelize.fn('MAX', sequelize_1.Sequelize.col('last_report_submitted')), 'last_report_submitted']],
        where: {
            job_code: String(jobCode)
        },
        raw: true
    });
    const staffSummary = yield mysql_1.connection.query(`SELECT
            COUNT(DISTINCT te.\`sap_employee_code\`) as staff_count,
            (
            SELECT
                (((IFNULL((SELECT SUM(TIMESTAMPDIFF(SECOND, \`in_date_time\`, \`out_date_time\`)) FROM tbl_attendence WHERE job_code = $2 AND ((tj.is_oneoff_job = 0 AND (1 = case when coalesce(trim($3), '') = '' then 1 else (DATE(in_date_time) >= DATE($3)) end)) OR tj.is_oneoff_job = 1)  AND tbl_attendence.employee_code = te.sap_employee_code) , 0)) 
                + (IFNULL((SELECT SUM(TIME_TO_SEC(\`hours\`)) FROM tbl_attendence_additional_hours WHERE job_code = $2 AND ((tj.is_oneoff_job = 0 AND (1 = case when coalesce(trim($3), '') = '' then 1 else (DATE(date) >= DATE($3)) end)) OR tj.is_oneoff_job = 1)  AND tbl_attendence_additional_hours.employee_code = te.sap_employee_code), 0))))) as total_hours_worked
        FROM
            tbl_employee te
        LEFT JOIN tbl_attendence tb ON
            tb.employee_code = te.sap_employee_code
        LEFT JOIN tbl_attendence_additional_hours ta ON
            te.\`sap_employee_code\` = ta.\`employee_code\`
        LEFT JOIN tbl_job tj ON
            tj.\`sap_job_code\` = tb.\`job_code\` 
        WHERE
            tb.job_code = $2 AND ((tj.is_oneoff_job = 0 AND (1 = case when coalesce(trim($3), '') = '' then 1 else (DATE(tb.in_date_time) >= DATE($3)) end)) OR tj.is_oneoff_job = 1) 
        group by
            tb.employee_code;`, {
        bind: [
            (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD'),
            (0, validations_1.paramValidator)(String(jobCode)),
            maxDailyReport ? maxDailyReport.last_report_submitted : null
        ],
        type: sequelize_1.QueryTypes.SELECT
    });
    const isOneOffJob = yield models_1.Job.findOne({ attributes: ['is_oneoff_job'], where: { sap_job_code: jobCode } });
    let staffHours = [];
    let data = {};
    if (!(isOneOffJob === null || isOneOffJob === void 0 ? void 0 : isOneOffJob.is_oneoff_job)) {
        staffHours = yield mysql_1.connection.query(`SELECT
               te.\`sap_employee_code\`,
               te.\`first_name\`,
               te.\`last_name\`,
               (IFNULL((SELECT SUM(TIMESTAMPDIFF(SECOND, \`in_date_time\`, \`out_date_time\`)) FROM tbl_attendence WHERE job_code = $2 AND (1 = case when coalesce(trim($5), '') = '' then 1 else (DATE(in_date_time) >= DATE($5)) end) AND tbl_attendence.employee_code = te.sap_employee_code) , 0)) 
               + (IFNULL((SELECT SUM(TIME_TO_SEC(\`hours\`)) FROM tbl_attendence_additional_hours WHERE job_code = $2 AND (1 = case when coalesce(trim($5), '') = '' then 1 else (DATE(date) >= DATE($5)) end) AND tbl_attendence_additional_hours.employee_code = te.sap_employee_code), 0)) as total_hours_worked
           FROM
               tbl_employee te
           LEFT JOIN tbl_attendence tb ON
               tb.employee_code = te.sap_employee_code
           LEFT JOIN tbl_attendence_additional_hours ta ON
               te.\`sap_employee_code\` = ta.\`employee_code\`
           LEFT JOIN tbl_job tj ON
               tj.\`sap_job_code\` = tb.\`job_code\`
           WHERE
               tb.job_code = $2 AND (1 = case when coalesce(trim($5), '') = '' then 1 else (DATE(tb.in_date_time) >= DATE($5)) end)
           GROUP BY
               tb.employee_code
           LIMIT $3 OFFSET $4;`, {
            bind: [
                (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD'),
                (0, validations_1.paramValidator)(String(jobCode)),
                limit ? String(limit) : String(config_1.default.pagination.limit),
                offset ? String(offset) : String(config_1.default.pagination.offset),
                maxDailyReport ? maxDailyReport.last_report_submitted : null
            ],
            type: sequelize_1.QueryTypes.SELECT
        });
        data = { staff_hour_list: (0, validations_1.hourMinuteParser)(staffHours) };
    }
    else {
        const [jobStartDate, jobEndDate, invoiceSummary] = yield Promise.all([
            models_1.Attendence.findOne({
                attributes: ['in_date_time'],
                replacements: [jobCode],
                include: [{ model: models_1.Employee }],
                where: {
                    job_code: jobCode,
                    id: { [sequelize_1.Op.in]: sequelize_1.Sequelize.literal('(SELECT MIN(id) from tbl_attendence where job_code = ?)') }
                },
                raw: true
            }),
            models_1.Attendence.findOne({
                attributes: ['in_date_time', 'out_date_time'],
                replacements: [jobCode],
                include: [{ model: models_1.Employee }],
                where: {
                    job_code: jobCode,
                    id: { [sequelize_1.Op.in]: sequelize_1.Sequelize.literal('(SELECT MAX(id) from tbl_attendence where job_code = ?)') }
                },
                raw: true
            }),
            models_1.Invoice.findOne({
                replacements: [jobCode, jobCode],
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                    include: [
                        [
                            sequelize_1.Sequelize.literal(`(
                        SELECT
                            SUM(pre_payment)
                        FROM
                            tbl_invoice
                        WHERE
                            job_code = ?
                        group by
                            job_code)`),
                            'pre_payment'
                        ]
                    ]
                },
                where: {
                    job_code: String(jobCode)
                },
                order: [['id', 'DESC']]
            })
        ]);
        data = {
            job_date: {
                job_start_date: jobStartDate ? jobStartDate.in_date_time : '',
                last_working_date: jobEndDate
                    ? jobEndDate.out_date_time === null
                        ? jobEndDate === null || jobEndDate === void 0 ? void 0 : jobEndDate.in_date_time
                        : jobEndDate === null || jobEndDate === void 0 ? void 0 : jobEndDate.out_date_time
                    : ''
            },
            invoice_summary: invoiceSummary ? invoiceSummary : {}
        };
    }
    let successObj;
    const staffHoursAndCount = {
        total_hours_worked: (0, validations_1.hourMinuteParser)(staffSummary.reduce((n, { total_hours_worked }) => n + parseInt(total_hours_worked), 0)),
        staff_count: staffSummary.reduce((n, { staff_count }) => n + staff_count, 0)
    };
    data = Object.assign(Object.assign({}, data), { staff_summary: staffHoursAndCount });
    successObj = {
        statusCode: 201,
        message: 'Successfully fetched staff working hours.',
        data
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postAdditionalHours = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { empCode, jobCode, hours, comments } = req.body;
    const { sap_emp_code } = res.locals.jwt;
    yield models_1.AttendenceAdditionalHours.create({
        employee_code: empCode,
        job_code: jobCode,
        hours: hours,
        date: new Date(),
        modified_employee_code: sap_emp_code,
        comments
    });
    let successObj = {
        statusCode: 201,
        message: 'Successfully added additional hours.'
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const getDailySummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobcode } = req.params;
    let whereObj = { supervisor_emp_code: res.locals.jwt.sap_emp_code };
    let validatedJobId;
    if (jobcode) {
        validatedJobId = (0, validations_1.paramValidator)(jobcode);
        whereObj = Object.assign(Object.assign({}, whereObj), { job_code: validatedJobId });
    }
    const maxDailyReport = yield models_1.DailyReport.findOne({
        attributes: [[sequelize_1.Sequelize.fn('MAX', sequelize_1.Sequelize.col('last_report_submitted')), 'last_report_submitted']],
        where: {
            job_code: String(jobcode)
        },
        raw: true
    });
    const recent_Submitted_date = maxDailyReport.last_report_submitted;
    const [jobData, materialData, equipmentData, paymentDetails] = yield Promise.all([
        models_1.Job.findAndCountAll({
            attributes: ['sap_job_code', 'createdAt'],
            where: { sap_job_code: validatedJobId.toString() },
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
        }),
        models_1.MaterialLedger.findAndCountAll({
            where: Object.assign(Object.assign({}, whereObj), { type: 'used', [sequelize_1.Op.and]: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('date', sequelize_1.Sequelize.col('createdAt')), '>', recent_Submitted_date ? (0, dayjs_1.default)(recent_Submitted_date).format('YYYY-MM-DD') : 0) }),
            attributes: ['material_code', [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('quantity')), 'total_quantity']],
            group: ['material_code'],
            include: [
                {
                    model: models_1.MaterialMaster,
                    attributes: ['material_name']
                }
            ]
        }),
        models_1.EquipmentUsage.findAndCountAll({
            attributes: ['material_code', [sequelize_1.Sequelize.literal(`SUM(hrs * 60 + mins)`), 'total_min']],
            include: [
                {
                    model: models_1.MaterialMaster,
                    attributes: ['material_name'],
                    where: { type: 'equipment' }
                }
            ],
            where: Object.assign(Object.assign({}, whereObj), { [sequelize_1.Op.and]: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('date', sequelize_1.Sequelize.col('createdAt')), '>', recent_Submitted_date ? (0, dayjs_1.default)(recent_Submitted_date).format('YYYY-MM-DD') : 0) }),
            group: ['material_code']
        }),
        models_1.Payment.findAll({
            where: { job_code: jobcode },
            attributes: ['job_code', [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('amount')), 'pre_payment']],
            group: ['job_code']
        })
    ]);
    const data = {
        job_details: jobData.rows,
        material_summary: materialData.rows,
        equipment_summary: equipmentData.rows,
        Payment_summary: paymentDetails,
        recent_report_Submitted_date: (0, dayjs_1.default)(recent_Submitted_date).format('YYYY-MM-DD'),
        total_count: jobData.count
    };
    let successObj = {
        statusCode: 200,
        message: 'Fetched complete daily summary',
        data: data,
        total_count: jobData.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const postSubmitReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobCode } = req.body;
    const { sap_emp_code } = res.locals.jwt;
    const response = yield models_1.DailyReport.update({ last_report_submitted: new Date() }, {
        where: {
            last_report_submitted: null,
            submitted_by_employee_code: sap_emp_code,
            job_code: String(jobCode)
        }
    });
    if (response[0] !== 0) {
        let successObj = {
            statusCode: 201,
            message: 'Successfully submitted daily report.'
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            statusCode: httpResponse_1.HttpCode.ALREADY_PRESENT
        });
    }
});
exports.default = {
    getAssignedJobs,
    getJobStatusWithCount,
    postAttendence,
    getStaffWorkingHours,
    postAdditionalHours,
    getDailySummary,
    postSubmitReport
};
