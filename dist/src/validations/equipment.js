"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEquipmentUsageValidation = exports.getEquipmentsValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getEquipmentsValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('serviceCode', 'serviceCode should not be empty').optional().notEmpty()
];
exports.postEquipmentUsageValidation = [
    (0, express_validator_1.body)('data', 'data is required and should be a array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('data.*.equipmentcode', 'equipmentcode is required and should be a string').exists().isString().notEmpty(),
    (0, express_validator_1.body)('data.*.time', 'time is required and should be a string').exists().isString().notEmpty()
];
