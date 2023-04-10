"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const winston_1 = __importDefault(require("winston"));
const winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
// const colors = {
//     error: 'red',
//     warn: 'yellow',
//     info: 'green',
//     http: 'magenta',
//     debug: 'white'
// }
// winston.addColors(colors)
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), 
// winston.format.colorize({ all: true }),
winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
let transports = [];
if (process.env.LOGGER_TYPE == 'aws' && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_KEY && process.env.AWS_REGION) {
    transports = [
        new winston_1.default.transports.Console(),
        new winston_cloudwatch_1.default({
            awsOptions: {
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_KEY
                },
                region: process.env.AWS_REGION
            },
            logGroupName: process.env.AWS_LOG_GROUP_Name,
            logStreamName: () => {
                let loggerStreamName;
                if (global && global.__loggerType__ === config_1.default.LOGGER_TYPES.caught)
                    loggerStreamName = process.env.AWS_LOG_STREAM_NAME_CAUGHT;
                else if (global && global.__loggerType__ === config_1.default.LOGGER_TYPES.db)
                    loggerStreamName = process.env.AWS_LOG_STREAM_NAME_QUERY;
                else if (global && global.__loggerType__ === config_1.default.LOGGER_TYPES.uncaught)
                    loggerStreamName = process.env.AWS_LOG_STREAM_NAME_UNCAUGHT;
                else if (global && global.__loggerType__ === config_1.default.LOGGER_TYPES.rabbitmqLogs)
                    loggerStreamName = process.env.AWS_LOG_STREAM_NAME_RABBITMQ;
                else
                    loggerStreamName = process.env.AWS_LOG_STREAM_NAME;
                return loggerStreamName;
            }
        })
    ];
}
else {
    let localFilePath = process.env.LOCAL_LOGGER_PATH;
    transports = [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: localFilePath + '/error.log',
            level: 'error'
        }),
        new winston_1.default.transports.File({ filename: localFilePath + '/all.log' })
    ];
}
const Logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports
});
exports.default = Logger;
