"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("../utils/appErrors");
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const connection = new sequelize_typescript_1.Sequelize({
    host: config_1.default.mysql.host,
    database: config_1.default.mysql.database,
    dialect: 'mysql',
    username: config_1.default.mysql.user,
    password: config_1.default.mysql.pass,
    pool: config_1.default.mysql.pool,
    hooks: {
        beforeDefine: function (columns, model) {
            model.tableName = 'tbl_' + model.tableName;
        }
    },
    dialectOptions: {
        typeCast: function (field, next) {
            if (field.type === 'DATE') {
                const date = field.string();
                return date;
            }
            if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
                const datetime = field.string();
                return datetime ? datetime.replace(/ /g, 'T') + 'Z' : null;
            }
            return next();
        }
    },
    timezone: process.env.UTC_TZ,
    logging: false
});
exports.connection = connection;
connection.query = function () {
    var _a, _b;
    return __awaiter(this, arguments, void 0, function* () {
        try {
            return yield sequelize_typescript_1.Sequelize.prototype.query.apply(this, arguments);
        }
        catch (err) {
            global.__loggerType__ = config_1.default.LOGGER_TYPES.db;
            const dbErrorObj = {
                database: config_1.default.mysql.database,
                error_number: (_a = err === null || err === void 0 ? void 0 : err.parent) === null || _a === void 0 ? void 0 : _a.errno,
                message: err === null || err === void 0 ? void 0 : err.message,
                sql_query: err === null || err === void 0 ? void 0 : err.sql
            };
            logger_1.default.error('Query Error: ' + JSON.stringify(dbErrorObj));
            if (((_b = err === null || err === void 0 ? void 0 : err.parent) === null || _b === void 0 ? void 0 : _b.errno) === 1062) {
                throw new appErrors_1.AppError({
                    httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
                    statusCode: httpResponse_1.HttpCode.DUPLICATE
                });
            }
            throw new appErrors_1.AppError({
                httpCode: httpResponse_1.HttpCode.INTERNAL_SERVER_ERROR,
                description: err.message
            });
        }
    });
};
