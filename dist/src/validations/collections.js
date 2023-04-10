"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupervisorPaymentSummaryValidation = exports.getAllJobsOfQuoteValidation = exports.getAllPaymentStatusValidation = exports.updateJobStatusValidation = exports.postPaymentValidation = void 0;
const express_validator_1 = require("express-validator");
exports.postPaymentValidation = [
    (0, express_validator_1.body)('data.job_code', 'job_code is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('data.payment_mode', 'payment_mode is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('data.amount', 'amount is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('data.customer_id', 'customer_id is required and should be a number').exists().isNumeric().notEmpty()
];
exports.updateJobStatusValidation = [
    (0, express_validator_1.body)('data.copy_of_quote', 'copy_of_quote should not be empty and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('data.id', 'id should not be empty and should be a string').exists().notEmpty()
];
exports.getAllPaymentStatusValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
exports.getAllJobsOfQuoteValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('filter', 'filter should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
exports.getSupervisorPaymentSummaryValidation = [
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
