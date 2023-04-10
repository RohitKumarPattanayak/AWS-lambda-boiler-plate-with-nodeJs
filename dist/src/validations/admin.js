"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginValidation = exports.updateOrAddSiteCodeValidation = exports.getJobsValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getJobsValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
exports.updateOrAddSiteCodeValidation = [
    (0, express_validator_1.body)('*.latitude', 'latitude is required and should be a number.').exists().isNumeric(),
    (0, express_validator_1.body)('*.longitude', 'longitude is required and should be a number.').exists().isNumeric()
];
exports.adminLoginValidation = [
    (0, express_validator_1.body)('username', 'username is required and should be a string.').exists().isString().notEmpty(),
    (0, express_validator_1.body)('password', 'password is required and should be a string.').exists().isString().notEmpty()
];
