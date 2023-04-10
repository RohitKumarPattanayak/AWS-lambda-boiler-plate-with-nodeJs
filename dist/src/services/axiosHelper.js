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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const postConfig = {
    baseUrl: config_1.default.sapApiUrl,
    auth: config_1.default.sapApiAuth,
    headers: {},
    method: 'post'
};
const postAPI = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)(Object.assign(Object.assign({}, postConfig), { url: `${postConfig.baseUrl}/${url}`, data }));
        return {
            status: response.status,
            data: response.data
        };
    }
    catch (error) {
        return {
            status: error.response.status,
            data: error.response.data
        };
    }
});
const getConfig = {
    baseUrl: config_1.default.sapApiUrl,
    auth: config_1.default.sapApiAuth,
    headers: {},
    method: 'get'
};
const getAPI = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)(Object.assign(Object.assign({}, getConfig), { url: `${getConfig.baseUrl}/${url}` }));
        return {
            status: response.status,
            data: response.data
        };
    }
    catch (error) {
        return {
            status: error.status,
            data: error.response
        };
    }
});
const putConfig = {
    baseUrl: config_1.default.sapApiUrl,
    auth: config_1.default.sapApiAuth,
    headers: {},
    method: 'put'
};
const putAPI = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)(Object.assign(Object.assign({}, putConfig), { url: `${putConfig.baseUrl}/${url}`, data }));
        return {
            status: response.status,
            data: response.data
        };
    }
    catch (error) {
        return {
            status: error.status,
            data: error.response
        };
    }
});
const patchConfig = {
    baseUrl: config_1.default.sapApiUrl,
    auth: config_1.default.sapApiAuth,
    headers: {},
    method: 'patch'
};
const patchAPI = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)(Object.assign(Object.assign({}, patchConfig), { url: `${patchConfig.baseUrl}/${url}`, data }));
        return {
            status: response.status,
            data: response.data
        };
    }
    catch (error) {
        return {
            status: error.status,
            data: error.response
        };
    }
});
exports.default = { getAPI, postAPI, putAPI, patchAPI };
