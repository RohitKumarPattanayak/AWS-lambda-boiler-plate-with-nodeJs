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
const appErrors_1 = require("../utils/appErrors");
const successHandler_1 = require("../utils/successHandler");
const models_1 = require("../models");
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const dayjs_1 = __importDefault(require("dayjs"));
const mysql_1 = require("../config/mysql");
const imageUpload_1 = require("../middleware/imageUpload");
const validations_1 = require("../utils/validations");
const attr = [
    'sap_employee_code',
    'first_name',
    'last_name',
    'email',
    'phone',
    'is_active',
    'role_code',
    'daily_contract_hrs',
    'emp_type',
    'photo_url'
];
const getLoggedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const empcode = res.locals.jwt.sap_emp_code;
    const data = yield models_1.Employee.findOne({
        attributes: attr,
        include: [
            {
                model: models_1.Role,
                attributes: ['role_code', ['name', 'role_name']],
                required: true
            }
        ],
        where: { sap_employee_code: empcode, is_active: 1 }
    });
    if (data) {
        let successObj = {
            statusCode: 200,
            message: 'Logged user data',
            data: data
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'invalid'
        });
    }
});
const getstaffAssignedToJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobcode } = req.params;
    const empcode = res.locals.jwt.sap_emp_code;
    let { search, filter, offset, limit } = req.query;
    let EmployeewhereObj = {};
    let JobAllocationWhereObj = {};
    let attendenceQuery = '';
    let checkOutEmployeeCodes = [];
    if (search && search.length !== 0) {
        let validatedSearchStr = (0, validations_1.paramValidator)(search);
        EmployeewhereObj = Object.assign(Object.assign({}, EmployeewhereObj), { [sequelize_1.Op.or]: [
                {
                    sap_employee_code: validatedSearchStr
                },
                {
                    first_name: validatedSearchStr
                },
                {
                    last_name: validatedSearchStr
                }
            ] });
    }
    if (filter && filter !== 'onleave') {
        let validatedFilterStr = (0, validations_1.paramValidator)(filter);
        let getAttendenceFilterArray;
        attendenceQuery = `SELECT
            employee_code,
            in_date_time,
            out_date_time
        FROM
            tbl_attendence as t1
        INNER JOIN (
            SELECT
                MAX(id) as id
            FROM
                tbl_attendence
            WHERE
                job_code = $1
            GROUP BY
                employee_code) as t2 ON
            t1.id = t2.id;`;
        const getAttendenceFilterResponse = yield mysql_1.connection.query(attendenceQuery, {
            bind: [(0, validations_1.paramValidator)(String(jobcode))],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (validatedFilterStr === 'checkin') {
            getAttendenceFilterArray = getAttendenceFilterResponse.map((ele) => {
                if (ele.in_date_time !== null && ele.out_date_time === null) {
                    return ele.employee_code;
                }
            });
            JobAllocationWhereObj = { employee_code: { [sequelize_1.Op.in]: getAttendenceFilterArray } };
        }
        else if (validatedFilterStr === 'checkout') {
            let concatGetAttendenceFilterResponse = [...getAttendenceFilterResponse];
            let filteredGetAttendenceFilterResponse = concatGetAttendenceFilterResponse.map((ele) => {
                if (ele.in_date_time !== null && ele.out_date_time === null) {
                    return ele.employee_code;
                }
            });
            concatGetAttendenceFilterResponse = concatGetAttendenceFilterResponse.filter((ele) => {
                return filteredGetAttendenceFilterResponse.includes(ele.employee_code);
            });
            checkOutEmployeeCodes = [
                ...concatGetAttendenceFilterResponse.map((ele) => {
                    return ele.employee_code;
                })
            ];
            const StaffOnLeaveRes = yield models_1.EmployeeLeaves.findAll({
                attributes: ['employee_code'],
                where: {
                    date: (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD')
                }
            });
            const idsOfStaffOnLeave = StaffOnLeaveRes.map((r) => r.employee_code);
            checkOutEmployeeCodes = [...checkOutEmployeeCodes, ...idsOfStaffOnLeave];
            checkOutEmployeeCodes = checkOutEmployeeCodes.filter(Boolean);
        }
    }
    const maxDailyReport = yield models_1.DailyReport.findOne({
        attributes: [[sequelize_1.Sequelize.fn('MAX', sequelize_1.Sequelize.col('last_report_submitted')), 'last_report_submitted']],
        where: {
            job_code: String(jobcode)
        },
        raw: true
    });
    let getAssignedJobsRes;
    yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.JobAllocation.findOrCreate({
            where: {
                job_code: jobcode,
                employee_code: empcode
            },
            defaults: {
                job_code: jobcode,
                employee_code: empcode
            },
            transaction: t
        });
        getAssignedJobsRes = yield models_1.JobAllocation.findAndCountAll({
            subQuery: false,
            replacements: [jobcode, jobcode],
            attributes: [
                'temp_alloted',
                'temp_start_date',
                'temp_end_date',
                'job_code',
                'id',
                //Remove after frontend testing
                // [
                //     Sequelize.fn(
                //         'IF',
                //         Sequelize.fn(
                //             'FIND_IN_SET',
                //             Sequelize.col('JobAllocation.employee_code'),
                //             Sequelize.literal(`(SELECT
                //             \`Attendence\`.\`employee_code\`
                //         FROM
                //             \`tbl_attendence\` AS \`Attendence\`
                //         LEFT OUTER JOIN \`tbl_employee\` AS \`Employee\` ON
                //             \`Attendence\`.\`employee_code\` = \`Employee\`.\`sap_employee_code\`
                //         LEFT OUTER JOIN \`tbl_role\` AS \`Employee->Role\` ON
                //             \`Employee\`.\`role_code\` = \`Employee->Role\`.\`role_code\`
                //         WHERE
                //             \`Attendence\`.\`in_date_time\` IS NOT NULL
                //             AND \`Attendence\`.\`out_date_time\` IS NULL
                //             AND \`Attendence\`.\`job_code\` != ?
                //             AND \`Employee->Role\`.\`staff_type\` = 0 AND JobAllocation.employee_code = \`Attendence\`.\`employee_code\`
                //         GROUP BY
                //             \`employee_code\`)`)
                //         ),
                //         1,
                //         0
                //     ),
                //     'is_active_on_another_job'
                // ],
                [
                    sequelize_1.Sequelize.literal(`(SELECT COUNT(DISTINCT \`Attendence\`.\`job_code\`) FROM
                        \`tbl_attendence\` AS \`Attendence\`
                    LEFT OUTER JOIN \`tbl_employee\` AS \`Employee\` ON
                        \`Attendence\`.\`employee_code\` = \`Employee\`.\`sap_employee_code\`
                    LEFT OUTER JOIN \`tbl_role\` AS \`Employee->Role\` ON
                        \`Employee\`.\`role_code\` = \`Employee->Role\`.\`role_code\`
                    WHERE
                        \`Attendence\`.\`in_date_time\` IS NOT NULL
                        AND \`Attendence\`.\`out_date_time\` IS NULL
                        AND \`Attendence\`.\`job_code\` != ?
                        AND \`Employee->Role\`.\`staff_type\` = 0 AND JobAllocation.employee_code = \`Attendence\`.\`employee_code\`
                    GROUP BY
                        \`employee_code\`)`),
                    'active_job_count'
                ]
            ],
            include: [
                {
                    model: models_1.Employee,
                    attributes: ['sap_employee_code', 'first_name', 'last_name', 'role_code'],
                    include: [
                        {
                            model: models_1.EmployeeLeaves,
                            attributes: ['date', 'leave_type'],
                            where: {
                                date: (0, dayjs_1.default)((0, dayjs_1.default)()).format('YYYY-MM-DD')
                            },
                            required: filter == 'onleave' ? true : false
                        },
                        {
                            model: models_1.Role
                        },
                        {
                            model: models_1.Attendence,
                            as: 'Attendence',
                            replacements: [
                                jobcode,
                                jobcode,
                                jobcode,
                                new Date().getMonth() + 1,
                                jobcode,
                                new Date().getMonth() + 1,
                                jobcode,
                                maxDailyReport ? maxDailyReport.last_report_submitted : null,
                                maxDailyReport ? maxDailyReport.last_report_submitted : null
                            ],
                            attributes: [
                                [sequelize_1.Sequelize.fn('min', sequelize_1.Sequelize.col('in_date_time')), 'check_in_time'],
                                [
                                    sequelize_1.Sequelize.literal(`(
                                            SELECT
                                                out_date_time
                                            FROM
                                                tbl_attendence as t1
                                            INNER JOIN (
                                                SELECT
                                                    MAX(id) as id
                                                FROM
                                                    tbl_attendence
                                                WHERE
                                                    job_code = ?
                                                GROUP BY
                                                    employee_code) as t2 ON
                                                t1.id = t2.id
                                            WHERE
                                                employee_code = \`Attendence\`.\`employee_code\`)`),
                                    'check_out_time'
                                ],
                                [
                                    sequelize_1.Sequelize.literal(`(
                                            SELECT
                                                in_date_time
                                            FROM
                                                tbl_attendence as t1
                                            INNER JOIN (
                                                SELECT
                                                    MAX(id) as id
                                                FROM
                                                    tbl_attendence
                                                WHERE
                                                    job_code = ?
                                                GROUP BY
                                                    employee_code) as t2 ON
                                                t1.id = t2.id
                                            WHERE
                                                employee_code = \`Attendence\`.\`employee_code\`)`),
                                    'recent_check_in_time'
                                ],
                                [
                                    sequelize_1.Sequelize.literal(`(
                                            SELECT
                                                (IFNULL((SELECT SUM(TIMESTAMPDIFF(SECOND, \`in_date_time\`, \`out_date_time\`))/ 3600 FROM tbl_attendence WHERE job_code = ? AND tbl_attendence.employee_code = te.sap_employee_code AND MONTH(in_date_time) = ?) , 0)) + (IFNULL((SELECT SUM(TIME_TO_SEC(\`hours\`))/ 3600 FROM tbl_attendence_additional_hours WHERE job_code = ? AND tbl_attendence_additional_hours.employee_code = te.sap_employee_code AND MONTH(date) = ?), 0)) as total_hours_worked
                                            FROM
                                                tbl_employee te
                                            LEFT JOIN tbl_attendence tb ON
                                                tb.employee_code = te.sap_employee_code
                                            LEFT JOIN tbl_attendence_additional_hours ta ON
                                                te.\`sap_employee_code\` = ta.\`employee_code\`
                                            LEFT JOIN tbl_job tj ON
                                                tj.\`sap_job_code\` = tb.\`job_code\`
                                            WHERE
                                                tb.job_code = ?
                                                AND tb.employee_code = \`Attendence\`.\`employee_code\`
                                            GROUP BY
                                                tb.employee_code)`),
                                    'total_monthly_hours_worked'
                                ]
                            ],
                            include: [
                                {
                                    model: models_1.Job,
                                    attributes: [],
                                    where: {
                                        status_code: {
                                            [sequelize_1.Op.in]: ['ST01', 'ST02', 'ST03', 'ST06']
                                        }
                                    }
                                }
                            ],
                            where: {
                                job_code: jobcode,
                                [sequelize_1.Op.and]: sequelize_1.Sequelize.literal("1 = case when coalesce(trim(?), '') = '' then 1 else (DATE(Attendence.in_date_time) >= DATE(?)) end")
                            },
                            group: ['employee_code'],
                            separate: true,
                            required: false
                        }
                    ],
                    where: Object.assign({}, EmployeewhereObj)
                }
            ],
            where: Object.assign({ job_code: jobcode, employee_code: { [sequelize_1.Op.notIn]: [...checkOutEmployeeCodes] }, [sequelize_1.Op.or]: [
                    { '$Employee.Role.staff_type$': 0 },
                    { '$Employee.Role.staff_type$': 1, temp_alloted: 0 },
                    {
                        '$Employee.Role.staff_type$': 1,
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
                    }
                ] }, JobAllocationWhereObj),
            transaction: t,
            order: sequelize_1.Sequelize.literal('FIELD(`Employee->Role`.`staff_type`, 0, 1) DESC'),
            offset: offset ? Number(offset) : config_1.default.pagination.offset,
            limit: limit ? Number(limit) : config_1.default.pagination.limit
        });
    }));
    if ((getAssignedJobsRes && getAssignedJobsRes.rows !== null) || getAssignedJobsRes.rows.length !== 0) {
        let successObj = {
            statusCode: 200,
            message: 'Get Staff assigned to a job',
            data: getAssignedJobsRes.rows,
            total_count: getAssignedJobsRes.rows.length
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    else {
        let successObj = {
            statusCode: 200,
            message: 'There are no staff for this job',
            data: [],
            total_count: 0
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
});
const getStaff = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { search, offset, limit } = req.query;
    let whereObj = { is_active: 1 };
    if (search) {
        let validatedSearchStr = (0, validations_1.paramValidator)(search);
        whereObj = Object.assign(Object.assign({}, whereObj), { [sequelize_1.Op.or]: [
                {
                    sap_employee_code: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` }
                },
                {
                    first_name: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` }
                },
                {
                    last_name: { [sequelize_1.Op.like]: `%${validatedSearchStr}%` }
                }
            ] });
    }
    const getStaffRes = yield models_1.Employee.findAndCountAll({
        attributes: attr,
        subQuery: false,
        where: Object.assign({}, whereObj),
        include: [
            {
                model: models_1.Attendence,
                attributes: [
                    [
                        sequelize_1.Sequelize.literal('(SELECT (IFNULL((SELECT (SUM(TIMESTAMPDIFF(SECOND, `in_date_time`, `out_date_time`))/3600) FROM tbl_attendence WHERE tbl_attendence.employee_code = Employee.sap_employee_code AND DATE(created_at) = (CURDATE())) , 0)) + (IFNULL((SELECT SUM(TIME_TO_SEC(`hours`)/3600) FROM tbl_attendence_additional_hours WHERE tbl_attendence_additional_hours.employee_code = Employee.sap_employee_code AND DATE(date) = MONTH(CURDATE())), 0)) as total_hours_worked FROM `tbl_employee` AS `Employee` WHERE `Employee`.`is_active` = 1 AND Employee.sap_employee_code = Attendences.employee_code GROUP BY `sap_employee_code`)'),
                        'total_workedhours_today'
                    ],
                    [
                        sequelize_1.Sequelize.literal('(SELECT (IFNULL((SELECT (SUM(TIMESTAMPDIFF(SECOND, `in_date_time`, `out_date_time`))/3600) FROM tbl_attendence WHERE tbl_attendence.employee_code = Employee.sap_employee_code AND MONTH(created_at) = MONTH(CURDATE())) , 0)) + (IFNULL((SELECT SUM(TIME_TO_SEC(`hours`)/3600) FROM tbl_attendence_additional_hours WHERE tbl_attendence_additional_hours.employee_code = Employee.sap_employee_code AND MONTH(date) = MONTH(CURDATE())), 0)) as total_hours_worked FROM `tbl_employee` AS `Employee` WHERE `Employee`.`is_active` = 1 AND Employee.sap_employee_code = Attendences.employee_code GROUP BY `sap_employee_code`)'),
                        'total_workedhours_month'
                    ]
                ]
            },
            {
                model: models_1.AttendenceAdditionalHours,
                attributes: [
                    [
                        sequelize_1.Sequelize.literal('(SELECT (IFNULL((SELECT (SUM(TIMESTAMPDIFF(SECOND, `in_date_time`, `out_date_time`))/3600) FROM tbl_attendence WHERE tbl_attendence.employee_code = Employee.sap_employee_code AND DATE(created_at) = (CURDATE())) , 0)) + (IFNULL((SELECT SUM(TIME_TO_SEC(`hours`)/3600) FROM tbl_attendence_additional_hours WHERE tbl_attendence_additional_hours.employee_code = Employee.sap_employee_code AND DATE(date) = MONTH(CURDATE())), 0)) as total_hours_worked FROM `tbl_employee` AS `Employee` WHERE `Employee`.`is_active` = 1 AND Employee.sap_employee_code = AttendenceAdditionalHours.employee_code GROUP BY `sap_employee_code`)'),
                        'total_workedhours_today'
                    ],
                    [
                        sequelize_1.Sequelize.literal('(SELECT (IFNULL((SELECT (SUM(TIMESTAMPDIFF(SECOND, `in_date_time`, `out_date_time`))/3600) FROM tbl_attendence WHERE tbl_attendence.employee_code = Employee.sap_employee_code AND MONTH(created_at) = MONTH(CURDATE())) , 0)) + (IFNULL((SELECT SUM(TIME_TO_SEC(`hours`)/3600) FROM tbl_attendence_additional_hours WHERE tbl_attendence_additional_hours.employee_code = Employee.sap_employee_code AND MONTH(date) = MONTH(CURDATE())), 0)) as total_hours_worked FROM `tbl_employee` AS `Employee` WHERE `Employee`.`is_active` = 1 AND Employee.sap_employee_code = AttendenceAdditionalHours.employee_code GROUP BY `sap_employee_code`)'),
                        'total_workedhours_month'
                    ]
                ]
            },
            {
                model: models_1.Role,
                where: {
                    staff_type: {
                        [sequelize_1.Op.eq]: 0
                    }
                }
            }
        ],
        offset: offset ? Number(offset) : config_1.default.pagination.offset,
        limit: limit ? Number(limit) : config_1.default.pagination.limit,
        group: ['sap_employee_code']
    });
    let successObj = {
        statusCode: 200,
        message: 'Get staff api',
        data: getStaffRes.rows
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const addStaff = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobcode } = req.params;
    const { empcode } = req.body;
    let bulkStaff = [];
    let staffList = typeof empcode === 'string' ? [empcode] : [...empcode];
    let createStaff = [];
    let rejectstaff = [];
    for (const staff_code of staffList) {
        let data = yield models_1.JobAllocation.findAndCountAll({
            where: { job_code: jobcode, employee_code: staff_code }
        });
        if (data.count) {
            rejectstaff.push(staff_code);
        }
        else {
            createStaff.push(staff_code);
        }
    }
    for (const staff_code of createStaff) {
        const obj = {
            job_code: jobcode.toString(),
            employee_code: staff_code.toString(),
            temp_alloted: 1
        };
        bulkStaff.push(obj);
    }
    let successObj;
    if (bulkStaff.length) {
        yield models_1.JobAllocation.bulkCreate(bulkStaff);
        successObj = {
            statusCode: rejectstaff.length ? 200 : 201,
            message: rejectstaff.length ? 'Staff is added.' : "successfully allocated staff's.",
            data: {
                created: createStaff,
                rejected: rejectstaff
            }
        };
    }
    else {
        successObj = {
            statusCode: 200,
            message: 'Staff is already added.',
            data: {
                created: createStaff,
                rejected: rejectstaff
            }
        };
    }
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const uplaodImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, imageUpload_1.Upload)(req);
        let successObj = {
            statusCode: 201,
            message: 'sucessfully uploaded',
            data: { img_key: data.key, img_url: data.Location }
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    catch (err) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            description: 'file not uploaded'
        });
    }
});
const getSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { empcode } = req.query;
    let empobj = {};
    if (empcode) {
        empobj = {
            sap_employee_code: empcode
        };
    }
    const data = yield models_1.Employee.findAndCountAll({
        include: [
            {
                model: models_1.Role,
                where: {
                    staff_type: {
                        [sequelize_1.Op.eq]: 1
                    }
                }
            }
        ],
        attributes: attr,
        where: Object.assign({ is_active: 1 }, empobj)
    });
    let successObj = {
        statusCode: 200,
        message: 'Get supervisor list',
        data: data.rows,
        total_count: data.count
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
const addSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { empcode, temp_start_date, temp_end_date, recreate } = req.body;
    const { jobcode } = req.params;
    if (empcode.toString().toLowerCase() == res.locals.jwt.sap_emp_code.toLowerCase()) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            description: 'empcode is the same as logged user! cannot assign as temporary supervisor.'
        });
    }
    if (temp_end_date < temp_start_date) {
        return next(new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            description: 'invalid date'
        }));
    }
    const [job_active, job_owner] = yield Promise.all([
        models_1.Supervisor.findAndCountAll({
            where: {
                employee_code: empcode.toString(),
                job_code: jobcode.toString(),
                temp_alloted: 1,
                [sequelize_1.Op.or]: [
                    {
                        temp_start_date: {
                            [sequelize_1.Op.gte]: String(new Date().toISOString().split('T')[0])
                        }
                    },
                    {
                        temp_end_date: {
                            [sequelize_1.Op.gte]: String(new Date().toISOString().split('T')[0])
                        }
                    }
                ]
            },
            include: [
                {
                    model: models_1.Employee,
                    attributes: ['first_name', 'last_name']
                }
            ],
            attributes: ['id', 'temp_start_date', 'temp_end_date']
        }),
        models_1.Supervisor.findAndCountAll({
            where: {
                employee_code: empcode.toString(),
                job_code: jobcode.toString(),
                temp_alloted: 0
            }
        })
    ]);
    if (job_owner.count) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.BAD_REQUEST,
            description: 'Cannot assign the job owning supervisor as a temporary supervisor.'
        });
    }
    if (job_active.count && Number(recreate) === 0) {
        let successObj1 = {
            statusCode: 200,
            message: `This job ${jobcode} has already been temporarily allocated to supervisor ${empcode} and is active from ${job_active.rows[0].temp_start_date} to ${job_active.rows[0].temp_end_date}.`,
            data: job_active.rows
        };
        successHandler_1.successHandler.handleSuccess(successObj1, res, req);
    }
    else if (job_active.count === 1 && Number(recreate) === 1) {
        try {
            yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                yield models_1.Supervisor.update({
                    employee_code: empcode.toString(),
                    job_code: jobcode.toString(),
                    temp_alloted: 1,
                    temp_start_date: temp_start_date,
                    temp_end_date: temp_end_date
                }, { where: { id: job_active.rows[0].id }, transaction: t });
                yield models_1.JobAllocation.update({
                    temp_start_date: temp_start_date,
                    temp_end_date: temp_end_date
                }, { where: { temp_alloted: 1, employee_code: empcode, job_code: jobcode }, transaction: t });
            }));
            let successObj = {
                statusCode: 201,
                message: 'Overidden Supervisor sucessfully'
            };
            successHandler_1.successHandler.handleSuccess(successObj, res, req);
        }
        catch (error) {
            throw new appErrors_1.AppError({
                httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
                statusCode: httpResponse_1.HttpCode.TRANSACTION_FAILED
            });
        }
    }
    else {
        try {
            yield mysql_1.connection.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                yield models_1.Supervisor.create({
                    employee_code: empcode.toString(),
                    job_code: jobcode.toString(),
                    temp_alloted: 1,
                    temp_start_date: temp_start_date,
                    temp_end_date: temp_end_date
                }, { transaction: t });
                yield models_1.JobAllocation.create({
                    employee_code: empcode.toString(),
                    job_code: jobcode.toString(),
                    temp_alloted: 1,
                    temp_start_date: temp_start_date,
                    temp_end_date: temp_end_date
                }, { transaction: t });
                let successObj = {
                    statusCode: 201,
                    message: 'Allocated Supervisor sucessfully'
                };
                successHandler_1.successHandler.handleSuccess(successObj, res, req);
            }));
        }
        catch (_a) {
            throw new appErrors_1.AppError({
                httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
                statusCode: httpResponse_1.HttpCode.TRANSACTION_FAILED
            });
        }
    }
});
exports.default = {
    getstaffAssignedToJob,
    getStaff,
    getLoggedUser,
    getSupervisor,
    addSupervisor,
    uplaodImage,
    addStaff
};
