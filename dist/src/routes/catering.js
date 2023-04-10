"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const catering_1 = __importDefault(require("../controllers/catering"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const validation_1 = __importDefault(require("../middleware/validation"));
const catering_2 = require("../validations/catering");
const router = express_1.default.Router();
/** Rules of our API */
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/catering/{jobCode}/menu':
 *  get:
 *     tags:
 *     - Catering
 *     description: get menu list for the day
 *     parameters:
 *       - in : query
 *         name : date
 *         schema :
 *          type : String
 *          default: 2022-11-16
 *          required: true
 *         description : date
 *     responses:
 *       200:
 *         description: Get payment colleciton details successful
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
 *                      type: object
 *                      description: menu details
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successful"
 *                  data: {"breakfast":[],"lunch":[{"id":8,"meal_type":"lunch","type":"internal","date":"2022-11-16T00:00:00.000Z","SapMenu":{"sap_menu_code":"P01","sap_menu_desc":"poori"}},{"id":9,"meal_type":"lunch","type":"internal","date":"2022-11-16T00:00:00.000Z","SapMenu":{"sap_menu_code":"B01","sap_menu_desc":"biriyani"}},{"id":10,"meal_type":"lunch","type":"internal","date":"2022-11-16T00:00:00.000Z","SapMenu":{"sap_menu_code":"V01","sap_menu_desc":"veg curry"}}],"dinner":[{"id":6,"meal_type":"dinner","type":"internal","date":"2022-11-16T00:00:00.000Z","SapMenu":{"sap_menu_code":"P01","sap_menu_desc":"poori"}},{"id":7,"meal_type":"dinner","type":"internal","date":"2022-11-16T00:00:00.000Z","SapMenu":{"sap_menu_code":"V01","sap_menu_desc":"veg curry"}}]}
 *                  path: "http://localhost/catering/{jobCode}/menu"
 *       200(2):
 *         description: Cannot fetch menu for the day
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
 *                  message: "Cannot fetch menu for the day."
 *                  statusCode: 200
 *                  data: {}
 *                  path: "http://localhost/catering/{jobCode}/menu"
 *       404:
 *         description: Invalid body or params.
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
 *                  data:
 *                      type: object
 *                      description: menu details
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Invalid body or params."
 *                  statusCode: 404
 *                  data: {}
 *                  path: "http://localhost/catering/{jobCode}/menu"
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
 *                  path: "http://localhost/catering/{jobCode}/menu"
 */
router.get('/:jobCode/menu', extractJWT_1.default, catering_2.getMenuForTheDayValidation, validation_1.default, catering_1.default.getMenuForTheDay);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/catering/menu/{jobCode}/summary':
 *  get:
 *     tags:
 *     - Catering
 *     description: get menu summary
 *     parameters:
 *       - in : path
 *         name : jobCode
 *         schema :
 *          type : String
 *          default: J13
 *         description : job code
 *     responses:
 *       200:
 *         description: Get payment colleciton details successful
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
 *                      type: object
 *                      description: menu summary
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched menu summary"
 *                  data: [{"id":1,"pax":"78","CateringRequest":{"date":"2022-12-14","requested_by_employee_code":"21000002","created_by":"mobile"},"SapMenu":{"sap_menu_code":"B01","sap_menu_name":null,"price":null}},{"id":2,"pax":"78","CateringRequest":{"date":"2022-12-14","requested_by_employee_code":"21000002","created_by":"mobile"},"SapMenu":{"sap_menu_code":"N01","sap_menu_name":null,"price":null}},{"id":3,"pax":"78","CateringRequest":{"date":"2022-12-14","requested_by_employee_code":"21000002","created_by":"mobile"},"SapMenu":{"sap_menu_code":"C01","sap_menu_name":null,"price":null}}]
 *                  path: "http://localhost/catering/menu/{jobCode}/summary"
 *       200(2):
 *         description: Cannot fetch menu summary
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
 *                  data:
 *                      type: object
 *                      description: menu summary
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Cannot fetch menu summary."
 *                  statusCode: 200
 *                  data: {}
 *                  path: "http://localhost/catering/menu/{jobCode}/summary"
 *       404:
 *         description: Invalid body or params.
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
 *                  data: {}
 *                  path: "http://localhost/catering/menu/{jobCode}/summary"
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
 *                  path: "http://localhost/catering/menu/summary"
 */
router.get('/menu/:jobCode/summary', extractJWT_1.default, catering_2.getMenuSummaryValidation, validation_1.default, catering_1.default.getMenuSummary);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/catering/{jobCode}/request':
 *  post:
 *     tags:
 *     - Catering
 *     description: post Catering request
 *     parameters:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  date:
 *                      type: string
 *                      description: date of the request
 *                  iscustom:
 *                      type: number
 *                      description: check wheather custom menu is required
 *              example:
 *                  {"date":"2022-10-13","breakfast_omani_pax":56,"iscustom":1,"breakfast":["poori","chapathi","veg curry"],"dinner":["biriyani"],"lunch":["poori"]}
 *     responses:
 *       201:
 *         description: Successfully created payment data.
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
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 201
 *                  message: "Sucessfully created catering request"
 *                  path: "http://catering/{jobCode}/request"
 *       500:
 *         description: Transaction Failed
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
 *                  message: "Transaction Failed."
 *                  statusCode: 500
 *                  path: "http://catering/{jobCode}/request"
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
 *                  path: "http://catering/{jobCode}/request"
 */
router.post('/:jobCode/request', extractJWT_1.default, catering_2.postCateringRequestValidation, validation_1.default, catering_1.default.postCateringRequest);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/catering/menu':
 *  get:
 *     tags:
 *     - Catering
 *     description: get menu list.
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: poori
 *         description : Search by menu name or menu code
 *       - in : query
 *         name : offset
 *         schema :
 *          type : Number
 *          default: 0
 *         description : offset for pagination
 *       - in : query
 *         name : limit
 *         schema :
 *          type : Number
 *          default: 10
 *         description : offset for pagination
 *     responses:
 *       200:
 *         description: Cannot fetch menu for the day
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
 *                  message: "Cannot fetch menu for the day."
 *                  statusCode: 200
 *                  data: {}
 *                  path: "http://localhost/catering/menu"
 *       404:
 *         description: Invalid body or params.
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
 *                  data:
 *                      type: object
 *                      description: menu details
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  message: "Invalid body or params."
 *                  statusCode: 404
 *                  data: {}
 *                  path: "http://localhost/catering/menu"
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
 *                  path: "http://localhost/catering/menu"
 */
router.get('/menu', extractJWT_1.default, catering_2.getMenuListValidation, validation_1.default, catering_1.default.getMenuList);
module.exports = router;
