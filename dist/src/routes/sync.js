"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const defaultData_1 = __importDefault(require("../controllers/defaultData"));
const router = express_1.default.Router();
router.get('/all', defaultData_1.default.dummyData);
exports.default = router;
