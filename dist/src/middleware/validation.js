"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("../utils/appErrors");
const validation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            description: errors.array({ onlyFirstError: true })[0].msg
        });
    }
    next();
};
exports.default = validation;
