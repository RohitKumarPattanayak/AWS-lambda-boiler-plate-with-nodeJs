"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../utils/logger"));
const generateJWTToken = (user, callback) => {
    //create public / private token / role based
    try {
        let userObj = { role: 'public' };
        if (user) {
            if (user['type'] && user.type === 'admin') {
                // payload for admin
                userObj = { admin_id: user === null || user === void 0 ? void 0 : user.admin_user_id, role: 'private', user_role: user.type };
            }
            else if (user['_sap_employee_code']) {
                // payload for users
                userObj = { sap_emp_code: user === null || user === void 0 ? void 0 : user._sap_employee_code, role: 'private' };
                if (user.key) {
                    userObj['key'] = user.key;
                }
            }
        }
        jsonwebtoken_1.default.sign(userObj, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: config_1.default.server.token.expiryTime
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        logger_1.default.info('================Something went wrong while generating token', error);
    }
};
exports.default = generateJWTToken;
