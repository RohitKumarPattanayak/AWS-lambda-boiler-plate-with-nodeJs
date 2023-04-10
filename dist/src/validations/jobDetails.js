"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getstaffValidation = exports.addstaffValidation = exports.addSupervisorValidation = exports.getstaffAssignedToJobValidation = exports.getJobStatusWithCountValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getJobStatusWithCountValidation = [(0, express_validator_1.query)('search', 'search should be a string').optional().notEmpty()];
exports.getstaffAssignedToJobValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('filter', 'filter should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty()
];
exports.addSupervisorValidation = [
    (0, express_validator_1.body)('empcode', 'empcode is required and should be a string').exists().notEmpty().isString(),
    (0, express_validator_1.body)('temp_start_date', 'temp_start_date is required and should be a string').exists().notEmpty().isString(),
    (0, express_validator_1.body)('temp_end_date', 'temp_end_date is required and should be a string').exists().notEmpty().isString(),
    (0, express_validator_1.body)('recreate', 'recreate is required and should be a number').exists().notEmpty().isNumeric()
];
exports.addstaffValidation = [(0, express_validator_1.body)('empcode', 'empcode should not be empty and must be a array').exists().notEmpty().isArray()];
exports.getstaffValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty()
];
