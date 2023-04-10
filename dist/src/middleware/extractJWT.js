"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const extractJWT = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
            if (error) {
                if (error.name == 'TokenExpiredError') {
                    res.locals.jwt = decoded;
                }
                return res.status(403).json({
                    message: 'Unauthorized / token exipred',
                    internalMessage: error,
                    code: 4001
                });
            }
            else {
                if (decoded) {
                    res.locals.jwt = decoded;
                    next();
                }
            }
        });
    }
    else {
        return res.status(403).json({});
    }
};
exports.default = extractJWT;
