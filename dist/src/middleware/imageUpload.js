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
exports.MultiUpload = exports.multipleImageUpload = exports.ImageUpload = exports.Upload = void 0;
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const appErrors_1 = require("../utils/appErrors");
const httpResponse_1 = require("../interfaces/httpResponse");
const dotenv = __importStar(require("dotenv"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config/config"));
const mime_types_1 = __importDefault(require("mime-types"));
dotenv.config();
//configuring multer
const storage = multer_1.default.memoryStorage({
    detination: ' '
});
const ImageUpload = (req, res, next) => (0, multer_1.default)({ storage }).single('img')(req, res, (err) => {
    if (err) {
        new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            description: 'file name not right uploaded'
        });
    }
    next();
});
exports.ImageUpload = ImageUpload;
const multipleImageUpload = (req, res, next) => (0, multer_1.default)({ storage }).array('img', config_1.default.imageUploadLimit)(req, res, (err) => {
    if (err) {
        new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            description: 'file name not right uploaded'
        });
    }
    next();
});
exports.multipleImageUpload = multipleImageUpload;
const Upload = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    req.setTimeout(0);
    const fileType = mime_types_1.default.extension(req.file.mimetype);
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY
    });
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${(0, uuid_1.v4)()}.${fileType}`,
        Body: req.file.buffer
    };
    let s3upload = s3.upload(params).promise();
    data = s3upload
        .then(function (data) {
        return data;
    })
        .catch(function (err) {
        return err;
    });
    return data;
});
exports.Upload = Upload;
const MultiUpload = (imageData) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    const fileType = mime_types_1.default.extension(imageData.mimetype);
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY
    });
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${(0, uuid_1.v4)()}.${fileType}`,
        Body: imageData.buffer
    };
    let s3upload = s3.upload(params).promise();
    data = s3upload
        .then(function (data) {
        return data;
    })
        .catch(function (err) {
        return err;
    });
    return data;
});
exports.MultiUpload = MultiUpload;
