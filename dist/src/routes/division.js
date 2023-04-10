"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const quote_1 = __importDefault(require("../controllers/quote"));
const division_1 = require("../validations/division");
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const validation_1 = __importDefault(require("../middleware/validation"));
const router = (0, express_1.default)();
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/division':
 *  get:
 *     tags:
 *     - Division
 *     description: To search job division by name
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: cleaning
 *         description : Search job division by name
 *
 *     responses:
 *       200:
 *         description: Get Job division Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  message:
 *                      type: string
 *                      description: comment on the api
 *                  data:
 *                      type: array
 *                      description: job divisions array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get material successful"
 *                  data: {"success":{"statusCode":200,"message":"Get Job division Successful","data":[{"id":4,"name":"Pest Control"}],"total_count":1,"path":"http://localhost/quotes/division?search=pest"}}
 *                  path: "http://localhost/quotes/division?search=pest"
 */
router.get('/', extractJWT_1.default, division_1.getDivisionValidation, validation_1.default, quote_1.default.getDivision);
exports.default = router;
