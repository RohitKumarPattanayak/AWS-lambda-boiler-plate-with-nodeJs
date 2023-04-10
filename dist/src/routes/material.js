"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const material_1 = __importDefault(require("../controllers/material"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const material_2 = require("../validations/material");
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
 * '/materials':
 *  post:
 *     tags:
 *     - Materials
 *     description: Creates a new material request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  MaterialRequestItems:
 *                      type: array
 *                      description: array of objects containing material code and requested qty
 *                  comment:
 *                      type: string
 *                      description: additional comments
 *              example:
 *                  MaterialRequestItems: [{"material_code": "DISINF001", "requested_qty": 5}, {"material_code": "LY00000001", "requested_qty": 10}]
 *                  comment: "an additional comment"
 *     responses:
 *       201:
 *         description: Creates a new material request
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
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *               example:
 *                    statusCode: 201
 *                    message: "Successfully created a material request."
 *                    path: "http://localhost/materials"
 *       404:
 *         description: Invalid body or params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Invalid body or params."
 *                  statusCode: 404
 *                  path: "http://localhost/materials"
 *       500:
 *         description: Query Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Query Failed."
 *                  statusCode: 500
 *                  path: "http://localhost/materials"
 */
router.post('/', extractJWT_1.default, material_2.postMaterialRequestValidation, validation_1.default, material_1.default.postMaterialRequest);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/materials':
 *  get:
 *     tags:
 *     - Materials
 *     description: To search material by material_code or by material_name
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: detergent
 *         description : Search by material_code or by material_name
 *       - in : query
 *         name : serviceCode
 *         schema :
 *          type : String
 *          default: BHK2000001
 *         description : Search by service code
 *       - in : query
 *         name : type
 *         schema :
 *          type : String
 *          default: material
 *         description : Filter by material, equipment or man-power
 *
 *     responses:
 *       200:
 *         description: Get material successful
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
 *                      description: job details array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get material successful"
 *                  data: [{"material_code":"DISINF001","material_name":"Gloves","price":30,"unit_descriptor":"piece","qty":null}]
 *                  path: "http://localhost/materials?search=Detergent"
 *       404:
 *         description: Search should not be empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "search should not be empty and should be a string"
 *                  statusCode: 404
 *                  path: "http://localhost/materials?search="
 */
router.get('/', extractJWT_1.default, material_2.getMaterialDataValidation, validation_1.default, material_1.default.getMaterialData);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/materials/mymaterial':
 *  get:
 *     tags:
 *     - Materials
 *     description: get all materials associated with the supervisor
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: ''
 *         description : search for products by name or code
 *       - in : query
 *         name : offset
 *         description: pagination offset
 *         schema :
 *          type : number
 *          default : 0
 *       - in : query
 *         name : limit
 *         description: pagination limit
 *         schema :
 *          type : number
 *          default : 10
 *     responses:
 *       200:
 *         description: Creates a new material request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  data:
 *                      type: array
 *                      description: returns the created material request
 *                  message:
 *                      type: string
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *               example:
 *                    statusCode: 200
 *                    message: "Successfully fetched materials associated with supervisor"
 *                    path: "http://localhost/materials/mymaterial"
 *                    data: [{"current_qty":"100.00","MaterialMaster":{"material_name":"Detergent","material_code":"DISINF001"}},{"current_qty":"100.00","MaterialMaster":{"material_name":"Bleach","material_code":"LY00000001"}}]
 *       500:
 *         description: Query Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Query Failed."
 *                  statusCode: 500
 *                  path: "http://localhost/materials/mymaterial"
 *       404:
 *         description: Invalid body or params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Invalid body or params."
 *                  statusCode: 404
 *                  path: "http://localhost/materials/mymaterial"
 */
router.get('/mymaterial', extractJWT_1.default, material_2.getSupervisorMaterialsvalidation, validation_1.default, material_1.default.getSupervisorMaterials);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/materials/{product}/summary':
 *  get:
 *     tags:
 *     - Materials
 *     description: get materials usage summary associated with the supervisor
 *     parameters:
 *       - in : path
 *         name : product
 *         schema :
 *          type : String
 *          default: 'DISINF001'
 *         description : perticular product's usage summary
 *       - in : query
 *         name : offset
 *         description: pagination offset
 *         schema :
 *          type : number
 *          default : 0
 *       - in : query
 *         name : limit
 *         description: pagination limit
 *         schema :
 *          type : number
 *          default : 10
 *     responses:
 *       200:
 *         description: succesfully fetched usage summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  data:
 *                      type: array
 *                      description: returns the created material request
 *                  message:
 *                      type: string
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *                  total_count:
 *                      type: number
 *                      description: count of returned object
 *               example:
 *                    statusCode: 200
 *                    message: "Successfully fetched materials associated with supervisor"
 *                    path: "http://localhost/materials/{product}/summary"
 *                    data: [{"synced_ts":"2022-09-26T22:03:07.000Z","type":"used","material_request_id":1,"Job":{"sap_site_code":"SS01","SapSite":{"name":"Hopsital","contract_code":"SC02"}}},{"synced_ts":"2022-09-26T22:04:29.000Z","type":"used","material_request_id":1,"Job":{"sap_site_code":"SS01","SapSite":{"name":"Hopsital","contract_code":"SC02"}}},{"synced_ts":"2022-09-26T23:09:12.000Z","type":"received","material_request_id":1,"Job":{"sap_site_code":"SS01","SapSite":{"name":"Hopsital","contract_code":"SC02"}}}]
 *                    total_count: 1
 *       404:
 *         description: Invalid body or params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Invalid body or params."
 *                  statusCode: 404
 *                  path: "http://localhost/materials/{product}/summary"
 *       500:
 *         description: Query Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Query Failed."
 *                  statusCode: 500
 *                  path: "http://localhost/materials/{product}/summary"
 */
router.get('/:product/summary', extractJWT_1.default, material_2.materialUsageSummaryValidation, validation_1.default, material_1.default.materialUsageSummary);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/materials/usage/{jobCode}':
 *  post:
 *     tags:
 *     - Materials
 *     description: Creates a new material usage log
 *     parameters:
 *       - in : path
 *         name : jobCode
 *         required : true
 *         description: job code
 *         schema :
 *          type : string
 *          default : J01
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  MaterialLedgerData:
 *                      type: array
 *                      description: array of objects containing material code and used quantity
 *              example:
 *                  MaterialLedgerData: [{"quantity":2,"material_code":"DISINF001"},{"quantity":10,"material_code":"LY00000001"}]
 *     responses:
 *       201:
 *         description: Successfully updated material usage.
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
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *               example:
 *                    statusCode: 201
 *                    message: "Successfully updated material usage."
 *                    path: "http://localhost/materials/usage/{jobcode}"
 *       400:
 *         description: Could not update material usage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "could not update material usage."
 *                  statusCode: 400
 *                  path: "http://localhost/materials/usage/{jobcode}"
 *       404:
 *         description: Invalid body or params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Invalid body or params."
 *                  statusCode: 404
 *                  path: "http://localhost/materials/usage/{jobcode}"
 *       500:
 *         description: Query Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Query Failed."
 *                  statusCode: 500
 *                  path: "http://localhost/materials/usage/{jobcode}"
 */
router.post('/usage/:jobCode', extractJWT_1.default, material_2.postMaterialUsageValidation, validation_1.default, material_1.default.postMaterialUsage);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/materials/requested':
 *  get:
 *     tags:
 *     - Materials
 *     description: view requested materials by status
 *     parameters:
 *       - in : query
 *         name : statusCode
 *         schema :
 *          type : String
 *          default: ST07
 *         description : status for pagination
 *       - in : query
 *         name : offset
 *         description: pagination offset
 *         schema :
 *          type : number
 *          default : 0
 *       - in : query
 *         name : limit
 *         description: pagination limit
 *         schema :
 *          type : number
 *          default : 10
 *     responses:
 *       200:
 *         description: succesfully fetched usage summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  data:
 *                      type: array
 *                      description: returns the created material request
 *                  message:
 *                      type: string
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *               example:
 *                    statusCode: 200
 *                    message: "Successfully fetched materials requested"
 *                    path: "http://localhost/materials/requested"
 *                    data: {"open_requests":[{"id":1,"requested_qty":5,"approved_qty":null,"rejected_qty":null,"delivered_qty":null,"createdAt":"2022-10-06T08:14:57.000Z","updatedAt":"2022-10-06T08:14:57.000Z","MaterialRequest":{"requested_by_employee_code":"21000002","StatusMaster":{"status_code":"ST07","desc":"Open"}},"MaterialMaster":{"material_code":"DISINF001","material_name":"Cleaning Clothes","unit_descriptor":"piece"}},{"id":2,"requested_qty":10,"approved_qty":null,"rejected_qty":null,"delivered_qty":null,"createdAt":"2022-10-06T08:14:57.000Z","updatedAt":"2022-10-06T08:14:57.000Z","MaterialRequest":{"requested_by_employee_code":"21000002","StatusMaster":{"status_code":"ST07","desc":"Open"}},"MaterialMaster":{"material_code":"DISINF001","material_name":"Buckets","unit_descriptor":"piece"}}],"approved_requests":[],"rejected_requests":[],"delivered_requests":[],"count":{"open_count":2,"approved_count":0,"rejected_count":0,"delivered_count":0}}
 *       404:
 *         description: Could not fetch requested materials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Could not fetch requested materials."
 *                  statusCode: 404
 *                  path: "http://localhost/materials/requested"
 *       400:
 *         description: Invalid body or params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Invalid body or params."
 *                  statusCode: 400
 *                  path: "http://localhost/materials/requested"
 *       500:
 *         description: Query Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: error message
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Query Failed."
 *                  statusCode: 500
 *                  path: "http://localhost/materials/requested"
 */
router.get('/requested', extractJWT_1.default, material_2.getRequestedMaterialListValidation, validation_1.default, material_1.default.getRequestedMaterialList);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/materials/inhand':
 *  get:
 *     tags:
 *     - Materials
 *     description: To get total in hand material price
 *
 *     responses:
 *       200:
 *         description: Get total price Successful.
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
 *                      description: sap configuration  array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get total price Successful"
 *                  data: [{"total":70500}]
 *                  path: "http://localhost/materials/inhand"
 */
router.get('/inhand', extractJWT_1.default, material_1.default.getInHandMaterialPrice);
exports.default = router;
