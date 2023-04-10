"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuoteServiceEstimateValidation = exports.getServiceGroupListValidation = exports.getSupervisorQuotesValidation = exports.getServiceCatalogValidation = exports.getInitiateFormDataValidation = exports.postCustomCatalogValidation = exports.postCustomerValidation = exports.putRejectQuoteValidation = exports.getCustomerDetailsValidation = exports.postInitationFormValidation = exports.putQuoteValidation = exports.postQuoteValidation = void 0;
const express_validator_1 = require("express-validator");
exports.postQuoteValidation = [
    (0, express_validator_1.body)('customer_id', 'customer_id is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('start_date', 'start_date is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('total', 'total is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('margin', 'margin is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('job_duration', 'job_duration is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('discount', 'discount is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('payment_on_credit', 'payment_on_credit is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('site_visit_require', 'site_visit_require is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('assigned_supervisor_id', 'assigned_supervisor_id is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('copy_of_quote', 'copy_of_quote is required and should be a string')
        .if((0, express_validator_1.body)('site_visit_require').equals('0'))
        .exists()
        .isString()
        .notEmpty(),
    (0, express_validator_1.body)('site_visited_status', 'site_visited_status is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems', 'QuoteItems is required and should be a array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.service_id', 'service_id should be a number').optional().isNumeric(),
    (0, express_validator_1.body)('QuoteItems.*.service_name', 'service_name is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.qty', 'qty is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.price', 'price is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems', 'QuoteLineItems is required and should be a array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.material_code', 'material_code is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.qty', 'qty is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.price', 'price is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.unit_descriptor', 'unit_descriptor is required and should be a string')
        .exists()
        .isString()
        .notEmpty()
];
exports.putQuoteValidation = [
    (0, express_validator_1.body)('QuoteItems', 'QuoteItems is required and should be a array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.service_id', 'service_id is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.qty', 'qty is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.price', 'price is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('margin', 'margin is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('discount', 'discount is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('job_duration', 'job_duration is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('total', 'total is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('start_date', 'start_date is required and should be a date').exists().isString().notEmpty(),
    (0, express_validator_1.body)('assigned_supervisor_id', 'assigned_supervisor_id is required and should be a string').exists().isString().notEmpty()
];
exports.postInitationFormValidation = [
    (0, express_validator_1.body)('QuoteItems', 'QuoteItems is required and should be a array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.id', 'id is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.qty', 'qty is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems', 'QuoteLineItems is required and should be a array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.material_code', 'material_code is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.qty', 'qty is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.price', 'price is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.quote_item_id', 'quote_item_id is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('QuoteItems.*.QuoteLineItems.*.unit_descriptor', 'unit_descriptor is required and should be a string')
        .exists()
        .isString()
        .notEmpty(),
    (0, express_validator_1.body)('margin', 'margin is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('discount', 'discount is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('copy_of_quote', 'copy_of_quote should be a string').optional().isString(),
    (0, express_validator_1.body)('init_comments', 'init_comments should be a string').optional().isString(),
    (0, express_validator_1.body)('site_visited_status', 'site_visited_status is required and should be a number').exists().notEmpty().isNumeric()
];
exports.getCustomerDetailsValidation = [(0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty()];
exports.putRejectQuoteValidation = [(0, express_validator_1.body)('id', 'id is required and should be a number').exists().isNumeric().notEmpty()];
exports.postCustomerValidation = [
    (0, express_validator_1.body)('name', 'name should not be empty and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('type', 'type should be a string').optional(),
    (0, express_validator_1.body)('serviceGroup', 'serviceGroup should be a number').optional()
];
exports.postCustomCatalogValidation = [
    (0, express_validator_1.body)('jobdivision', 'jobdivision is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('jobname', 'jobname is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('jobdescription', 'jobdescription is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('unit', 'unit is required and should be a string').exists().isString().notEmpty()
];
exports.getInitiateFormDataValidation = [
    (0, express_validator_1.query)('serviceid', 'serviceid is required and should be a string').exists().isString().notEmpty()
];
exports.getServiceCatalogValidation = [(0, express_validator_1.query)('search', 'search should not be empty').optional().notEmpty()];
exports.getSupervisorQuotesValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('filter', 'filter should not be empty or invalid [open/closed] ').isIn(['open', 'closed']).optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty()
];
exports.getServiceGroupListValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
exports.getQuoteServiceEstimateValidation = [
    (0, express_validator_1.query)('serviceCode', 'service code should not be empty').notEmpty().exists().isString(),
    (0, express_validator_1.query)('quote_id', 'quote_id should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty()
];
