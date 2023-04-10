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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const config_1 = __importDefault(require("../config/config"));
const axiosHelper_1 = __importDefault(require("../services/axiosHelper"));
const syncCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let customerDetailsSapResponse = yield axiosHelper_1.default.postAPI('RESTAdapter/onstaging/customer', { DATE: '' });
    customerDetailsSapResponse = Array.isArray(customerDetailsSapResponse.data.MT_CUSTOMER_RESPONSE.RecordSet.Record)
        ? customerDetailsSapResponse.data.MT_CUSTOMER_RESPONSE.RecordSet.Record
        : [customerDetailsSapResponse.data.MT_CUSTOMER_RESPONSE.RecordSet.Record];
    console.log(customerDetailsSapResponse);
    const updatedCustomerDetailsResponse = customerDetailsSapResponse.map((ele) => {
        return {
            customer_code: ele.CustomerCode,
            address_line_1: ele.AddressOne,
            address_line_2: ele.AddressTwo,
            name: ele.CustomerName,
            total_outstanding_amount: String(ele.OutstandingAmount),
            type: ele.CustomerType === '' ? null : ele.CustomerType,
            payment_terms_code: ele.PaymentTerms === '' ? null : ele.PaymentTerms,
            mobile_number: ele.Mobile,
            service_group: ele.CustomerGroup === '' ? null : ele.CustomerGroup
        };
    });
    try {
        yield models_1.Customer.bulkCreate(updatedCustomerDetailsResponse, {
            updateOnDuplicate: [
                'customer_code',
                'address_line_1',
                'email',
                'name',
                'total_outstanding_amount',
                'type',
                'payment_terms_code',
                'mobile_number',
                'updatedAt',
                'type'
            ]
        });
    }
    catch (error) {
        global.__loggerType__ = config_1.default.LOGGER_TYPES.rabbitmqLogs;
        console.log(error.message);
    }
});
exports.default = {
    syncCustomer
};
