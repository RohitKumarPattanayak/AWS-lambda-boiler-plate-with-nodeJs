"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaterialDataValidation = exports.getSupervisorMaterialsvalidation = exports.materialUsageSummaryValidation = exports.postMaterialUsageValidation = exports.getRequestedMaterialListValidation = exports.postMaterialRequestValidation = void 0;
const express_validator_1 = require("express-validator");
exports.postMaterialRequestValidation = [
    (0, express_validator_1.body)('MaterialRequestItems', 'MaterialRequestItems is required and should be an array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('MaterialRequestItems.*.requested_qty', 'MaterialRequestItems.requested_qty is required and should be a number')
        .exists()
        .isNumeric()
        .notEmpty(),
    (0, express_validator_1.body)('MaterialRequestItems.*.material_code', 'MaterialRequestItems.material_code is required and should be a string')
        .exists()
        .isString()
        .notEmpty(),
    (0, express_validator_1.body)('comment', 'comment should be a string').optional().isString().notEmpty()
];
exports.getRequestedMaterialListValidation = [
    (0, express_validator_1.query)('statusCode', 'statusCode should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
exports.postMaterialUsageValidation = [
    (0, express_validator_1.body)('MaterialLedgerData', 'MaterialLedgerData is required and should be an array').exists().isArray().notEmpty(),
    (0, express_validator_1.body)('MaterialLedgerData.*.quantity', 'MaterialLedgerData.quantity is required and should be a number').exists().isNumeric().notEmpty(),
    (0, express_validator_1.body)('MaterialLedgerData.*.material_code', 'MaterialLedgerData.material_code is required and should be a string')
        .exists()
        .isString()
        .notEmpty()
];
exports.materialUsageSummaryValidation = [
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty()
];
exports.getSupervisorMaterialsvalidation = [(0, express_validator_1.query)('search', 'search should not be empty').optional().notEmpty()];
exports.getMaterialDataValidation = [
    (0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().notEmpty(),
    (0, express_validator_1.query)('offset', 'offset should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('limit', 'limit should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('serviceCode', 'serviceCode should not be empty').optional().notEmpty(),
    (0, express_validator_1.query)('type', 'type should not be empty and should be of type: material, equipment or man-power')
        .isIn(['material', 'equipment', 'man-power'])
        .optional()
        .notEmpty()
];
