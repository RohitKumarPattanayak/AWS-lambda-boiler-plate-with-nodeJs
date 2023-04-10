"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidation = exports.changePasswordValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = [
    (0, express_validator_1.body)('empcode', 'empcode is required').exists().isString().notEmpty(),
    (0, express_validator_1.body)('password', 'password is required').exists().isString().notEmpty()
];
exports.changePasswordValidation = [
    (0, express_validator_1.body)('empcode', 'empcode is required and should be a string.').exists().isString(),
    (0, express_validator_1.body)('new_password', 'password is required').exists().isString().notEmpty(),
    (0, express_validator_1.body)('key', 'key is required').exists().isString()
];
exports.refreshTokenValidation = [(0, express_validator_1.body)('key', 'key is required and should be a string').exists().isString().notEmpty()];
