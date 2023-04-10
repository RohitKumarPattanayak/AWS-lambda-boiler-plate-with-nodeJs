"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobStatusWithCountValidation = exports.getSupervisorValidation = exports.postAdditionalHoursValidation = exports.postSubmitReportValidation = exports.getAssignedJobsValidation = exports.getStaffWorkingHoursValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getStaffWorkingHoursValidation = [
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty()
];
exports.getAssignedJobsValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('filter', 'filter should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty()
];
exports.postSubmitReportValidation = [(0, express_validator_1.body)('jobCode', 'jobCode is required and should be a string').exists().notEmpty().isString()];
exports.postAdditionalHoursValidation = [
    (0, express_validator_1.body)('empCode', 'empCode is required and should be a string').exists().notEmpty().isString(),
    (0, express_validator_1.body)('jobCode', 'jobCode is required and should be a string').exists().notEmpty().isString(),
    (0, express_validator_1.body)('hours', 'hours is required and should be a string').exists().notEmpty().isString(),
    (0, express_validator_1.body)('comments', 'comments should be a string').optional().isString()
];
exports.getSupervisorValidation = [(0, express_validator_1.query)('empcode', 'empcode is required.').optional().notEmpty()];
exports.getJobStatusWithCountValidation = [(0, express_validator_1.query)('search', 'search is required and should be a string').optional().notEmpty()];
