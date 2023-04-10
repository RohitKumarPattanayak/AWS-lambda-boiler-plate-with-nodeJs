"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDivisionValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getDivisionValidation = [(0, express_validator_1.query)('search', 'search should not be empty and should be a string').optional().isString()];
