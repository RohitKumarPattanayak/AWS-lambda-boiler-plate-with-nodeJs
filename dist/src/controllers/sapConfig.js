"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const successHandler_1 = require("../utils/successHandler");
const models_1 = require("../models");
const getSapConfig = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getSapConfigRes = yield models_1.SapConfig.findOne({});
    getSapConfigRes['payment_terms'] = yield models_1.PaymentTerms.findAll({
        attributes: ['code', 'term', 'is_accessible']
    });
    let successObj = {
        statusCode: 200,
        message: 'Get Sap configuration Successful',
        data: getSapConfigRes
    };
    successHandler_1.successHandler.handleSuccess(successObj, res, req);
});
exports.default = { getSapConfig };
