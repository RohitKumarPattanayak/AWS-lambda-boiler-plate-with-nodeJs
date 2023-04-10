"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const sapConfig_1 = __importDefault(require("../controllers/sapConfig"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
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
 * '/config':
 *  get:
 *     tags:
 *     - SAP Config
 *     description: To get Sap configuration
 *
 *     responses:
 *       200:
 *         description: Get Sap configuration successful.
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
 *                  message: "Get Sap configuration successful."
 *                  data: {"monthly_emp_max_hrs":400,"monthly_emp_max_alert_hrs":50,"site_coverage_limit_meters":500,"regular_hrs_max":"12:00","vat_percentage":5,"id":1,"payment_terms":[{"code":"Z001","term":"90 Days","is_accessible":1},{"code":"Z002","term":"60 Days","is_accessible":1}],"createdAt":"2023-02-06T13:02:22Z","updatedAt":"2023-02-06T13:02:22Z"}
 *                  path: "http://localhost/config"
 */
router.get('/', extractJWT_1.default, sapConfig_1.default.getSapConfig);
exports.default = router;
