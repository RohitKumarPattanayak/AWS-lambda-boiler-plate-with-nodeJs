"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const material_1 = __importDefault(require("../controllers/material"));
const equipment_1 = require("../validations/equipment");
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const validation_1 = __importDefault(require("../middleware/validation"));
const router = express_1.default.Router();
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/equipments':
 *  get:
 *     tags:
 *     - Equipment
 *     description: Search Equipment by equipment_code or by name
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: HXA50/5.
 *         description : Search by equipment_code or by name
 *       - in : query
 *         name : serviceCode
 *         schema :
 *          type : String
 *          default: BHK2000001
 *         description : Search by service code
 *
 *     responses:
 *       200:
 *         description: Equipment with the given name or code is available
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
 *                      description: equipment details array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get Equipment successful"
 *                  data: [{"material_code":"HXA50/5.","material_name":"Equipment 1","price":150,"image_url":null,"unit_descriptor":"hour","qty":null}]
 *                  path: "http://localhost/equipments?search=HXA50/5."
 *       404:
 *         description: Search should not be empty and should be a string
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
 *                  message: "Search should not be empty and should be a string"
 *                  statusCode: 404
 *                  path: "http://localhost/equipments?search="
 */
router.get('/', extractJWT_1.default, equipment_1.getEquipmentsValidation, validation_1.default, material_1.default.getEquipments);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/equipments/{jobid}':
 *  post:
 *     tags:
 *     - Equipment
 *     description: To create equipment usage using Job code
 *     parameters:
 *       - in : path
 *         name : jobid
 *         description : Job ID
 *         schema :
 *          type : String
 *          default: J01
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                 data:
 *                     type: array
 *                     description: Equipment items
 *              example:
 *               data: [{"equipmentcode": "HXA50/5.","time":"1:20"}, {"equipmentcode": "HXA50/9.","time": "10:100"}]
 *
 *     responses:
 *       201:
 *         description: Successfully created equipment usage request.
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
 *                      description: equipment usage array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 20
 *                  message: "Successfully created equipment usage request."
 *                  path: "http://localhost/equipments/J01"
 *       500:
 *         description: Could not create equipment usage request.
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
 *                  message: "Cannot add or update a child row: a foreign key constraint fails (`oig-supervisor`.`tbl_equipment_usage`, CONSTRAINT `tbl_equipment_usage_ibfk_1` FOREIGN KEY (`job_code`) REFERENCES `tbl_job` (`sap_job_code`) ON DELETE CASCADE ON UPDATE CASCADE)"
 *                  statusCode: 500
 *                  path: "http://localhost/equipments/J0"
 *       404:
 *         description: Invalid input.
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
 *                  message: "time is required and should be a string"
 *                  statusCode: 404
 *                  path: "http://localhost/equipments/J01"
 *       400:
 *         description: Invalid input when time exceeds 24hs.
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
 *                  message: "Invalid Input"
 *                  statusCode: 1002
 *                  path: "http://localhost/equipments/J01"
 */
router.post('/:jobid', extractJWT_1.default, equipment_1.postEquipmentUsageValidation, validation_1.default, material_1.default.postEquipmentUsage);
exports.default = router;
