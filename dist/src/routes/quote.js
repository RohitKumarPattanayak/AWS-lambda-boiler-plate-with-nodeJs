"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const quote_1 = __importDefault(require("../controllers/quote"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const imageUpload_1 = require("../middleware/imageUpload");
const quote_2 = require("../validations/quote");
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
 * '/quotes/customer':
 *  get:
 *     tags:
 *     - Quotes
 *     description: To search customer details by mobile number
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : Number
 *          default: 566690403
 *         description : To search customer details by mobile number
 *
 *     responses:
 *       200:
 *         description: Customer details search successful
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
 *                      description: customer details array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Customer details search successful"
 *                  data: [{"id":1,"mobile_number":"566690403","name":"Anand Singh","address_line_1":"Borivali","address_line_2":"Maharashtra","email":null,"total_outstanding_amount":"5000.00","type":null,"service_group":null}]
 *                  total_count: 1
 *                  path: "http://localhost/customer?search=566690403"
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
 *                  message: "search should not be empty and should be a string"
 *                  statusCode: 404
 *                  path: "http://localhost/customer?search="
 */
router.get('/customer', extractJWT_1.default, quote_2.getCustomerDetailsValidation, validation_1.default, quote_1.default.getCustomerDetails);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote':
 *  post:
 *     tags:
 *     - Quotes
 *     description: To create Quote
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  QuoteItems:
 *                      type: array
 *                      description: Quote Items
 *                  total:
 *                      type: number
 *                      description: total price
 *                  vat:
 *                      type: number
 *                      description: VAT
 *                  discount:
 *                      type: number
 *                      description: discount
 *                  payment_on_credit:
 *                      type: boolean
 *                      description: payment on credit true or not
 *                  customer_id:
 *                      type: number
 *                      description: customer_id
 *                  site_visit_require:
 *                      type: boolean
 *                      description: site visit required?
 *                  assigned_supervisor_id:
 *                      type: number
 *                      description: assigned supervisor ID
 *                  copy_of_quote:
 *                      type: string
 *                      description: digital or physical
 *                  payment_terms:
 *                      type: string
 *                      description: payment cycle
 *              example:
 *               QuoteItems: [{"service_id": "SE01", "qty": 2, "price": 800}, {"service_id": "SE02", "qty": 3, "price": 1000}]
 *               total: 1750
 *               discount: 100
 *               vat: 50
 *               payment_on_credit: true
 *               customer_id: 1
 *               site_visit_require: true
 *               assigned_supervisor_id: "E0130"
 *               copy_of_quote: "digital"
 *               payment_terms: "15 days"
 *
 *     responses:
 *       201:
 *         description: Successfully created quote.
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
 *                  message: "Successfully created quote."
 *                  path: "http://localhost/quotes/quote"
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
 *                  path: "http://localhost/quotes/quote"
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
 *                  path: "http://localhost/quotes/quote"
 */
router.post('/quote', extractJWT_1.default, quote_2.postQuoteValidation, validation_1.default, quote_1.default.postQuote);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/reject':
 *  put:
 *     tags:
 *     - Quotes
 *     description: To reject a quote
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  key:
 *                      type: string
 *                      description: id
 *              example:
 *               id: "1"
 *
 *     responses:
 *       201:
 *         description: To reject a quote
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
 *                      description: Quote rejected message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 201
 *                  message: "Reject quote successful."
 *                  path: "http://localhost/quotes/quote/reject"
 *       400:
 *         description: Invalid ID
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
 *                  path: "http://localhost/quotes/quote/reject"
 *       404:
 *         description: Missing ID
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
 *                  message: "id is required and should be a number"
 *                  statusCode: 404
 *                  path: "http://localhost/quotes/quote/reject"
 */
router.put('/quote/reject', extractJWT_1.default, quote_2.putRejectQuoteValidation, validation_1.default, quote_1.default.rejectQuote);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes':
 *  post:
 *     tags:
 *     - Quotes
 *     description: To create/update customer details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  key:
 *                      type: string
 *                      description: customer details
 *              example:
 *               mobilenumber: "12345678"
 *               name: "Name"
 *               email: "abcd@gmail.com"
 *               addressline1: "addressline1"
 *               addressline2: "addressline2"
 *               type: "govt"
 *               serviceGroup: "1"
 *
 *     responses:
 *       201:
 *         description: Successfully created customer details.
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
 *                      description: customer details array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 201
 *                  message: "Successfully added customer details."
 *                  path: "http://localhost/quotes"
 *       404:
 *         description: Missing data
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
 *                  message: "mobilenumber should not be empty and should be a number"
 *                  statusCode: 404
 *                  path: "http://localhost/quotes"
 */
router.post('/', extractJWT_1.default, quote_2.postCustomerValidation, validation_1.default, quote_1.default.postCustomer);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/myQuotes':
 *  get:
 *     tags:
 *     - Quotes
 *     description: To get supervisor's Quote
 *     parameters:
 *       - in : query
 *         name : filter
 *         schema :
 *          type : String
 *          default: open
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: 1
 *         description : to search through quote id and customer name
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
 *         description: Successfully Fetched open quotes.
 *         content:
 *           application/json:
 *             schema:
 *               typegetServiceCatalog: object
 *               properties:
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  message:
 *                      type: string
 *                      description: comment on the api
 *                  data:
 *                      type: array
 *                      description: customer details array
 *                  total_count:
 *                      type: integer
 *                      description: count of objects returned
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully Fetched open quotes."
 *                  data: {"quotes":[{"id":1,"status_code":"ST14","assigned_supervisor_id":"21000002","site_visit_require":1,"created_supervisor_id":"21000002","createdAt":"2022-10-27T06:34:26.000Z","date":null,"updatedAt":"2022-10-27T06:34:26.000Z","total":3000,"discount":200,"StatusMaster":{"desc":"Open"},"Customer":{"id":1,"customer_code":"CC01","name":"Anand Singh"},"Created_supervisor_name":{"first_name":"Supervisor 1","last_name":null},"Assigned_supervisor_name":{"first_name":"Supervisor 1","last_name":null},"QuoteLogs":[]},{"id":2,"status_code":"ST14","assigned_supervisor_id":"21000002","site_visit_require":1,"created_supervisor_id":"21000002","createdAt":"2022-10-27T06:34:26.000Z","date":null,"updatedAt":"2022-10-27T06:34:26.000Z","total":3000,"discount":200,"StatusMaster":{"desc":"Open"},"Customer":{"id":2,"customer_code":"CC02","name":"Anand Singh 2"},"Created_supervisor_name":{"first_name":"Supervisor 1","last_name":null},"Assigned_supervisor_name":{"first_name":"Supervisor 1","last_name":null},"QuoteLogs":[]},{"id":3,"status_code":"ST14","assigned_supervisor_id":"21000002","site_visit_require":1,"created_supervisor_id":"21000002","createdAt":"2022-10-27T06:34:26.000Z","date":null,"updatedAt":"2022-10-27T06:34:26.000Z","total":3000,"discount":200,"StatusMaster":{"desc":"Open"},"Customer":{"id":3,"customer_code":"CC03","name":"Anand Singh 3"},"Created_supervisor_name":{"first_name":"Supervisor 1","last_name":null},"Assigned_supervisor_name":{"first_name":"Supervisor 1","last_name":null},"QuoteLogs":[]}],"Count_details":[{"desc":"Open","total_status_count":3,"Quotes":[{"id":1,"Customer":{"name":"Anand Singh"}}]},{"desc":"Closed","total_status_count":0,"Quotes":[]}]}
 *                  total_count: 3
 *                  path: "http://localhost/quotes/myQuotes/open"
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
 *
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
 *                  path: "http://localhost/quotes/quote"
 */
router.get('/myQuotes', extractJWT_1.default, quote_2.getSupervisorQuotesValidation, validation_1.default, quote_1.default.getSupervisorQuotes);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}':
 *  put:
 *     tags:
 *     - Quotes
 *     description: update Quote
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         required : true
 *         description: quote ID
 *         schema :
 *          type : number
 *          default : 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  QuoteItems:
 *                      type: array
 *                      description: Quote Items
 *                  total:
 *                      type: number
 *                      description: total price
 *                  vat:
 *                      type: number
 *                      description: VAT
 *                  assigned_supervisor_id:
 *                      type: number
 *                      description: assigned supervisor ID
 *                  job_duration:
 *                      type: number
 *                      description: job duration
 *                  discount:
 *                      type: number
 *                      description: discount
 *                  margin:
 *                      type: number
 *                      description: markup
 *                  start_date:
 *                      type: number
 *                      description: start date
 *                  assigned_by_id:
 *                      type: string
 *                      description: assigned by supervisor ID
 *              example:
 *               QuoteItems: [{"service_id":1,"qty":2,"price":400,"margin":20,"discount":300,"QuoteLineItems":[{"material_code":"DISINF001","qty":20,"price":310,"unit_descriptor":"piece"}]},{"service_id":2,"qty":9,"price":600,"margin":20,"discount":300,"QuoteLineItems":[{"material_code":"LY00000001","qty":30,"price":100,"unit_descriptor":"piece"}]},{"service_id":3,"qty":3,"price":1000,"margin":20,"discount":300,"QuoteLineItems":[{"material_code":"DISINF001","qty":40,"price":200,"unit_descriptor":"piece"}]}]
 *               total: 1750
 *               vat: 50
 *               job_duration: 30
 *               discount: 500
 *               margin: 40
 *               start_date: 2022-12-05 14:22:54
 *               assigned_supervisor_id: "E0130"
 *               assigned_by_id: "E0131"
 *
 *     responses:
 *       201:
 *         description: Successfully updated quote.
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
 *                  statusCode: 200
 *                  message: "Successfully updated the quote."
 *                  path: "http://localhost/quotes/quote/{quoteId}"
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
 *                  path: "http://localhost/quotes/quote/{quoteId}"
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
 *                  path: "http://localhost/quotes/quote/{quoteId}"
 */
router.put('/quote/:quoteId', extractJWT_1.default, quote_2.putQuoteValidation, validation_1.default, quote_1.default.putQuote);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/service':
 *  get:
 *     tags:
 *     - Quotes
 *     description: get service catalog
 *     parameters:
 *       - in : query
 *         name : search
 *         description: search for service name
 *         schema :
 *          type : string
 *     responses:
 *       200:
 *         description: Successfully fetched service's.
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
 *                      description: customer details array
 *                  total_count:
 *                      type: integer
 *                      description: count of objects returned
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully created quote."
 *                  data: [{"id":1,"name":"Cleaning","ServiceCatalogs":[{"service_name":null,"description":"mera desh badal raha hai aage badh raha he"},{"service_name":"full tull cleaning","description":"full safai"},{"service_name":"Full Deep Cleaning","description":"Deep cleaning with good materials used"}]},{"count_details":[{"Division_id":2,"Division_name":"Catering","Service_count":0},{"Division_id":3,"Division_name":"Hard FM","Service_count":0},{"Division_id":4,"Division_name":"Pest Control","Service_count":1},{"Division_id":5,"Division_name":"Landscaping","Service_count":0},{"Division_id":6,"Division_name":"Waste Management","Service_count":0}]}]
 *                  total_count: 3
 *                  path: "http://localhost/quotes/service"
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
 *                  path: "http://localhost/quotes/service"
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
 *                  path: "http://localhost/quotes/service"
 */
router.get('/service', extractJWT_1.default, quote_2.getServiceCatalogValidation, validation_1.default, quote_1.default.getServiceCatalog);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/service':
 *  post:
 *     tags:
 *     - Quotes
 *     description: To create custom catalog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  key:
 *                      type: string
 *                      description: catalog details
 *              example:
 *               jobdivision: "6"
 *               jobname: "New Waste management"
 *               jobdescription: "New waste management"
 *               unit: "Sq. meter"
 *
 *     responses:
 *       201:
 *         description: Successfully created customer details.
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
 *                      description: custom catalog array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 201
 *                  message: "Successfully added customer details."
 *                  data: [{"description":"New Waste management","division_id":"6","service_name":"New Waste management","service_type":"custom"}]
 *                  path: "http://localhost/quotes/service"
 *       404:
 *         description: Missing Job division, Job name or Job description.
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
 *                  message: "jobdivision should not be empty and should be a number"
 *                  statusCode: 404
 *                  path: "http://localhost/quotes/service"
 */
router.post('/service', extractJWT_1.default, quote_2.postCustomCatalogValidation, validation_1.default, quote_1.default.postCustomCatalog);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}/audit':
 *  get:
 *     tags:
 *     - Quotes
 *     description: To get audit trail by quote id.
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         schema :
 *          type : Number
 *          default: 1
 *         description : To get audit trail by quote id
 *
 *     responses:
 *       200:
 *         description: Get audit trail by quote id successful.
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
 *                      description: Get audit trail data array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get audit trail by quote id successful."
 *                  data: {"id":1,"total":3000,"created_supervisor_id":"21000002","assigned_supervisor_id":"21000002","created_at":"2022-10-28T10:05:51.000Z"}
 *                  path: "http://localhost/quotes/quote/1/audit"
 *       404:
 *         description: Invalid quote ID.
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
 *                  path: "http://localhost/quotes/quote/1/audit"
 */
router.get('/quote/:quoteId/audit', extractJWT_1.default, quote_1.default.getAuditTrail);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/checklist':
 *  get:
 *     tags:
 *     - Quotes
 *     description: To get initiation form checklist
 *     parameters:
 *       - in : query
 *         name : serviceid
 *         schema :
 *          type : String
 *          default: 1,2
 *         description : To get initiation form checklist
 *
 *     responses:
 *       200:
 *         description: Get Initiation form data Successful
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
 *                      description: Initiation form details array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get Initiation form data Successful."
 *                  data: [{"id":1,"service_id":1,"checklist":"checklist 1"},{"id":2,"service_id":2,"checklist":"checklist 1"}]
 *                  path: "http://localhost/quotes/quote/checklist"
 *       404:
 *         description: serviceid should not be empty and should be a string
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
 *                  message: "serviceid should not be empty and should be a string"
 *                  statusCode: 404
 *                  path: "http://localhost/quotes/quote/checklis"
 */
router.get('/quote/checklist', extractJWT_1.default, quote_1.default.getInitiationChecklist);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}/initiation-data':
 *  get:
 *     tags:
 *     - Quotes
 *     description: get individual quote
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         required : true
 *         description: quote ID
 *         schema :
 *          type : number
 *          default : 1
 *     responses:
 *       200:
 *         description: Successfully fetched quote.
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
 *                      description: fetched quote
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched quote data."
 *                  data: [{"id":1,"checklist_id":1,"value":1,"InitiationCheckList":{"checklist":"checklist 1"}}]
 *                  path: "http://localhost/quotes/quote/{quoteId}/initiation-data"
 *       500:
 *         description: Could not find quote data
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
 *                  message: "Could not find quote data."
 *                  statusCode: 500
 *                  path: "http://localhost/quotes/quote/{quoteId}/initiation-data"
 */
router.get('/quote/:quoteId/initiation-data', extractJWT_1.default, quote_1.default.getInitiationFormData);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}/images':
 *  get:
 *     tags:
 *     - Quotes
 *     description: get individual quote
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         required : true
 *         description: quote ID
 *         schema :
 *          type : number
 *          default : 1
 *     responses:
 *       200:
 *         description: Successfully fetched quote images.
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
 *                      description: fetched quote
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched quote images."
 *                  data: [{"id":1,"image_url":"33265973-2b14-4bf3-b1b0-6705bb10d241.png"},{"id":2,"image_url":"9ef617ad-dbda-4935-b58f-eef765a4fc01.png"}]
 *                  path: "http://localhost/quotes/quote/{quoteId}/images"
 *       500:
 *         description: Could not fetch quote images
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
 *                  message: "Could not fetch quote images."
 *                  statusCode: 500
 *                  path: "http://localhost/quotes/quote/{quoteId}/images"
 */
router.get('/quote/:quoteId/images', extractJWT_1.default, quote_1.default.getInitiationFormImages);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}/publish':
 *  post:
 *     tags:
 *     - Quotes
 *     description: post initiation/site visit form
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         required : true
 *         description: quote ID
 *         schema :
 *          type : number
 *          default : 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *               QuoteItems:
 *                   type: array
 *               copy_of_quote:
 *                   type: string
 *               init_comments:
 *                   type: string
 *               discount:
 *                   type: number
 *                   description: discount
 *               margin:
 *                   type: number
 *                   description: markup
 *               site_visited_status:
 *                   type: number
 *                   description: site_visited_status
 *               total:
 *                   type: number
 *                   description: total
 *           example:
 *               QuoteItems: [{"id":13,"QuoteLineItems":[{"quote_item_id":13,"material_code":"DISINF001","qty":20,"price":341,"unit_descriptor":"piece"}]},{"id":14,"QuoteLineItems":[{"quote_item_id":14,"material_code":"LY00000001","qty":30,"price":100,"unit_descriptor":"piece"}]},{"id":15,"QuoteLineItems":[{"quote_item_id":15,"material_code":"DISINF001","qty":40,"price":200,"unit_descriptor":"piece"}]}]
 *               copy_of_quote: digital
 *               init_comments: qwerty
 *               discount: 20
 *               margin: 30
 *               site_visited_status: 1
 *               total: 500
 *     responses:
 *       201:
 *         description: Successfully published quote.
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
 *                  message: "Successfully published quote."
 *                  path: "http://localhost/quotes/quote/{quoteId}/publish"
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
 *                  path: "http://localhost/quotes/quote/{quoteId}/publish"
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
 *                  path: "http://localhost/quotes/quote/{quoteId}/publish"
 */
router.post('/quote/:quoteId/publish', extractJWT_1.default, quote_2.postInitationFormValidation, validation_1.default, quote_1.default.postInitiationForm);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}/upload':
 *  post:
 *     tags:
 *     - Quotes
 *     description: post initiation multiple image upload
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         required : true
 *         description: quote ID
 *         schema :
 *          type : number
 *          default : 1
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *              type: object
 *              properties:
 *                  img:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *     responses:
 *       201:
 *         description: Successfully uploaded Initiation form images
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
 *                  message: "Successfully uploaded Initiation form images."
 *                  path: "http://localhost/quotes/quote/{quoteId}/upload"
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
 *                  path: "http://localhost/quotes/quote/{quoteId}/upload"
 *       404:
 *         description: Image(s) could not be uploaded
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
 *                  message: "Image(s) could not be uploaded."
 *                  statusCode: 404
 *                  path: "http://localhost/quotes/quote/{quoteId}/publish"
 */
router.post('/quote/:quoteId/upload', extractJWT_1.default, imageUpload_1.multipleImageUpload, quote_1.default.postInitiationFormImagesUpload);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}':
 *  get:
 *     tags:
 *     - Quotes
 *     description: get individual quote
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         required : true
 *         description: quote ID
 *         schema :
 *          type : number
 *          default : 1
 *     responses:
 *       200:
 *         description: Successfully fetched quote.
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
 *                      description: fetched quote
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched quote."
 *                  data: {"total":1450,"vat":50,"payment_on_credit":0,"site_visit_require":1,"start_date":"2022-11-25T04:00:00Z","assigned_supervisor_id":"21000002","copy_of_quote":"physical","customer_id":1,"job_duration":5,"margin":40,"discount":400,"payment_terms":null,"init_comments":"hello mate","site_visited_status":1,"assigned_by_id":"E0130","QuoteItems":[{"price":400,"qty":2,"id":16,"service_id":1,"material":[{"id":92,"quote_item_id":16,"qty":20,"unit_descriptor":"piece","material_name":"Detergent","type":"material","material_code":"DISINF001","price":200}],"equipment":[],"manpower":[],"ServiceCatalog":{"service_name":"1 BHK Apartment ","service_code":"BHK2000001","unit_descriptor":"Sq. mtr","display_order":1,"id":1,"division_id":1,"service_type":"regular"}},{"price":600,"qty":2,"id":17,"service_id":2,"material":[{"id":93,"quote_item_id":17,"qty":30,"unit_descriptor":"piece","material_name":"Bleach","type":"material","material_code":"LY00000001","price":300}],"equipment":[],"manpower":[],"ServiceCatalog":{"service_name":"Termite Pest Control","service_code":"SOFA100001","unit_descriptor":"Sq. mtr","display_order":2,"id":2,"division_id":4,"service_type":"regular"}},{"price":1000,"qty":2,"id":18,"service_id":3,"material":[{"id":94,"quote_item_id":18,"qty":40,"unit_descriptor":"piece","material_name":"Gloves","type":"material","material_code":"DISINF001","price":30}],"equipment":[],"manpower":[],"ServiceCatalog":{"service_name":"Full House Landscaping","service_code":"BHK2000001","unit_descriptor":"Sq. mtr","display_order":3,"id":3,"division_id":5,"service_type":"regular"}}]}
 *                  path: "http://localhost/quotes/quote/{quoteId}"
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
 *                  path: "http://localhost/quotes/quote/{quoteId}"
 */
router.get('/quote/:quoteId', extractJWT_1.default, quote_1.default.getIndividualQuote);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/quote/{quoteId}/items':
 *  get:
 *     tags:
 *     - Quotes
 *     description: get individual quote items
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         required : true
 *         description: quote ID
 *         schema :
 *          type : number
 *          default : 1
 *     responses:
 *       200:
 *         description: Successfully fetched quote items.
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
 *                      description: fetched quote
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched quote items."
 *                  data: {"margin":40,"discount":400,"init_comments":"hello mate","site_visit_require":1,"site_visited_status":0,"vat":20,"job_duration":1,"total":500,"QuoteItems":[{"price":200,"id":1,"qty":3,"service_id":1,"ServiceCatalog":{"service_name":"1 BHK Apartment ","service_code":"BHK2000001","unit_descriptor":"Sq. mtr","display_order":1,"id":1,"division_id":1,"service_type":"regular"},"material":[{"id":981,"quote_item_id":1,"qty":25,"price":30,"unit_descriptor":"piece","material_name":"Gloves","type":"material","material_code":"DISINF001"},{"id":982,"quote_item_id":1,"qty":30,"price":300,"unit_descriptor":"litre","material_name":"Bleach","type":"material","material_code":"LY00000001"},{"id":983,"quote_item_id":1,"qty":20,"price":200,"unit_descriptor":"kilogram","material_name":"Detergent","type":"material","material_code":"DISINF001"},{"id":1062,"quote_item_id":1,"qty":25,"price":30,"unit_descriptor":"piece","material_name":"Gloves","type":"material","material_code":"DISINF001"},{"id":1063,"quote_item_id":1,"qty":30,"price":300,"unit_descriptor":"litre","material_name":"Bleach","type":"material","material_code":"LY00000001"},{"id":1064,"quote_item_id":1,"qty":20,"price":200,"unit_descriptor":"kilogram","material_name":"Detergent","type":"material","material_code":"DISINF001"}],"manpower":[{"id":986,"quote_item_id":1,"qty":10,"price":1500,"unit_descriptor":"person","material_name":"Man","type":"man-power","material_code":"MAN0001"},{"id":1067,"quote_item_id":1,"qty":10,"price":1500,"unit_descriptor":"person","material_name":"Man","type":"man-power","material_code":"MAN0001"}],"equipment":[{"id":979,"quote_item_id":1,"qty":2,"price":150,"unit_descriptor":"hour","material_name":"Equipment 1","type":"equipment","material_code":"HXA50/5."},{"id":980,"quote_item_id":1,"qty":4,"price":150,"unit_descriptor":"hour","material_name":"Equipment 2","type":"equipment","material_code":"HXA50/9."},{"id":1060,"quote_item_id":1,"qty":2,"price":150,"unit_descriptor":"hour","material_name":"Equipment 1","type":"equipment","material_code":"HXA50/5."},{"id":1061,"quote_item_id":1,"qty":4,"price":150,"unit_descriptor":"hour","material_name":"Equipment 2","type":"equipment","material_code":"HXA50/9."}]},{"price":200,"id":2,"qty":4,"service_id":2,"ServiceCatalog":{"service_name":"Termite Pest Control","service_code":"SOFA100001","unit_descriptor":"Sq. mtr","display_order":2,"id":2,"division_id":4,"service_type":"regular"},"material":[{"id":990,"quote_item_id":2,"qty":20,"price":200,"unit_descriptor":"kilogram","material_name":"Detergent","type":"material","material_code":"DISINF001"},{"id":991,"quote_item_id":2,"qty":25,"price":30,"unit_descriptor":"piece","material_name":"Gloves","type":"material","material_code":"DISINF001"},{"id":992,"quote_item_id":2,"qty":30,"price":300,"unit_descriptor":"litre","material_name":"Bleach","type":"material","material_code":"LY00000001"},{"id":1071,"quote_item_id":2,"qty":20,"price":200,"unit_descriptor":"kilogram","material_name":"Detergent","type":"material","material_code":"DISINF001"},{"id":1072,"quote_item_id":2,"qty":25,"price":30,"unit_descriptor":"piece","material_name":"Gloves","type":"material","material_code":"DISINF001"},{"id":1073,"quote_item_id":2,"qty":30,"price":300,"unit_descriptor":"litre","material_name":"Bleach","type":"material","material_code":"LY00000001"}],"manpower":[{"id":995,"quote_item_id":2,"qty":10,"price":1500,"unit_descriptor":"person","material_name":"Man","type":"man-power","material_code":"MAN0001"},{"id":1076,"quote_item_id":2,"qty":10,"price":1500,"unit_descriptor":"person","material_name":"Man","type":"man-power","material_code":"MAN0001"}],"equipment":[{"id":988,"quote_item_id":2,"qty":2,"price":150,"unit_descriptor":"hour","material_name":"Equipment 1","type":"equipment","material_code":"HXA50/5."},{"id":989,"quote_item_id":2,"qty":4,"price":150,"unit_descriptor":"hour","material_name":"Equipment 2","type":"equipment","material_code":"HXA50/9."},{"id":1069,"quote_item_id":2,"qty":2,"price":150,"unit_descriptor":"hour","material_name":"Equipment 1","type":"equipment","material_code":"HXA50/5."},{"id":1070,"quote_item_id":2,"qty":4,"price":150,"unit_descriptor":"hour","material_name":"Equipment 2","type":"equipment","material_code":"HXA50/9."}]},{"price":200,"id":3,"qty":4,"service_id":3,"ServiceCatalog":{"service_name":"Full House Landscaping","service_code":"BHK2000001","unit_descriptor":"Sq. mtr","display_order":3,"id":3,"division_id":5,"service_type":"regular"},"material":[{"id":999,"quote_item_id":3,"qty":20,"price":200,"unit_descriptor":"kilogram","material_name":"Detergent","type":"material","material_code":"DISINF001"},{"id":1000,"quote_item_id":3,"qty":30,"price":300,"unit_descriptor":"litre","material_name":"Bleach","type":"material","material_code":"LY00000001"},{"id":1001,"quote_item_id":3,"qty":25,"price":30,"unit_descriptor":"piece","material_name":"Gloves","type":"material","material_code":"DISINF001"},{"id":1080,"quote_item_id":3,"qty":20,"price":200,"unit_descriptor":"kilogram","material_name":"Detergent","type":"material","material_code":"DISINF001"},{"id":1081,"quote_item_id":3,"qty":30,"price":300,"unit_descriptor":"litre","material_name":"Bleach","type":"material","material_code":"LY00000001"},{"id":1082,"quote_item_id":3,"qty":25,"price":30,"unit_descriptor":"piece","material_name":"Gloves","type":"material","material_code":"DISINF001"}],"manpower":[{"id":1003,"quote_item_id":3,"qty":10,"price":1500,"unit_descriptor":"person","material_name":"Man","type":"man-power","material_code":"MAN0001"},{"id":1084,"quote_item_id":3,"qty":10,"price":1500,"unit_descriptor":"person","material_name":"Man","type":"man-power","material_code":"MAN0001"}],"equipment":[{"id":997,"quote_item_id":3,"qty":2,"price":150,"unit_descriptor":"hour","material_name":"Equipment 1","type":"equipment","material_code":"HXA50/5."},{"id":998,"quote_item_id":3,"qty":4,"price":150,"unit_descriptor":"hour","material_name":"Equipment 2","type":"equipment","material_code":"HXA50/9."},{"id":1078,"quote_item_id":3,"qty":2,"price":150,"unit_descriptor":"hour","material_name":"Equipment 1","type":"equipment","material_code":"HXA50/5."},{"id":1079,"quote_item_id":3,"qty":4,"price":150,"unit_descriptor":"hour","material_name":"Equipment 2","type":"equipment","material_code":"HXA50/9."}]}]}
 *                  path: "http://localhost/quotes/quote/{quoteId}/items"
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
 *                  path: "http://localhost/quotes/quote/{quoteId}/items"
 */
router.get('/quote/:quoteId/items', extractJWT_1.default, quote_1.default.getQuoteItemsForInitiation);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/serviceGroup':
 *  get:
 *     tags:
 *     - Quotes
 *     description: To get Service group list
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: banks
 *         description : Get Service group list
 *
 *     responses:
 *       200:
 *         description: Get Service group list successful
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
 *                      description: service group array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get Service group list successful."
 *                  data: [{"id":1,"name":"BANKS"}]
 *                  path: "http://localhost/quotes/serviceGroup?search=banks"
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
 *                  path: "http://localhost/quotes/serviceGroup?search="
 */
router.get('/serviceGroup', extractJWT_1.default, quote_2.getServiceGroupListValidation, validation_1.default, quote_1.default.getServiceGroupList);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/estimate':
 *  get:
 *     tags:
 *     - Quotes
 *     description: get quote service estimate
 *     parameters:
 *       - in : query
 *         name : serviceCode
 *         required : true
 *         description: service code
 *         schema :
 *          type : number
 *          default : BHK2000001
 *       - in : query
 *         name : quote_id
 *         schema :
 *          type : String
 *         description : quote id
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
 *         description: Successfully fetched service estimate.
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
 *                      description: fetched quote
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched quote items."
 *                  data: {"material_estimate":[{"material_code":"DISINF001","qty":20,"MaterialMaster":{"material_name":"Detergent","unit_descriptor":"kilogram","price":200}},{"material_code":"LY00000001","qty":30,"MaterialMaster":{"material_name":"Bleach","unit_descriptor":"litre","price":300}},{"material_code":"DISINF001","qty":25,"MaterialMaster":{"material_name":"Gloves","unit_descriptor":"piece","price":30}}],"equipment_estimate":[{"material_code":"HXA50/5.","qty":2,"MaterialMaster":{"material_name":"Equipment 1","unit_descriptor":"hour","price":150}},{"material_code":"HXA50/9.","qty":4,"MaterialMaster":{"material_name":"Equipment 2","unit_descriptor":"hour","price":150}}],"manpower_estimate":[{"material_code":"MAN0001","qty":10,"MaterialMaster":{"material_name":"Man","unit_descriptor":"person","price":1500}}]}
 *                  path: "http://localhost/quotes/BHK2000001/estimate"
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
 *                  path: "http://localhost/quotes/BHK2000001/estimate"
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
 *                  path: "http://localhost/quotes/BHK2000001/estimate"
 */
router.get('/estimate', extractJWT_1.default, quote_2.getQuoteServiceEstimateValidation, validation_1.default, quote_1.default.getQuoteServiceEstimate);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/quotes/customer/type':
 *  get:
 *     tags:
 *     - Quotes
 *     description: get customer type
 *     parameters:
 *       - in : query
 *         name : code
 *         required : false
 *         description: customer type
 *         schema :
 *          type : string
 *     responses:
 *       200:
 *         description: successfully fetched customer type data.
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
 *                      description: fetched quote
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched quote items."
 *                  data: [{"code":"1","type":"private"},{"code":"2","type":"govt"}]
 *                  path: "http://localhost/quotes/customer"
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
 *                  path: "http://localhost/quotes/customer"
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
 *                  path: "http://localhost/quotes/customer"
 */
router.get('/customer/type', extractJWT_1.default, quote_1.default.getCustomerType);
exports.default = router;
