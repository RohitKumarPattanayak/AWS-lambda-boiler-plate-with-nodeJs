"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuListValidation = exports.postCateringRequestValidation = exports.getMenuSummaryValidation = exports.getMenuForTheDayValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getMenuForTheDayValidation = [(0, express_validator_1.query)('date', 'date should not be empty and should be a string').exists().isDate().notEmpty()];
exports.getMenuSummaryValidation = [];
exports.postCateringRequestValidation = [
    (0, express_validator_1.body)('date', 'date is required.').exists().notEmpty(),
    (0, express_validator_1.body)('CateringMenus', 'CateringMenus is required and should be a array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('CateringMenus.*.sap_menu_code', 'sap_menu_code is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('CateringMenus.*.pax', 'pax is required and should be a number').exists().isNumeric().notEmpty()
];
exports.getMenuListValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
