"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const collections_1 = __importDefault(require("../controllers/collections"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const imageUpload_1 = require("../middleware/imageUpload");
const validation_1 = __importDefault(require("../middleware/validation"));
const collections_2 = require("../validations/collections");
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
 * '/collections':
 *  get:
 *     tags:
 *     - Payment Collection
 *     description: To search payment colleciton details by customer name
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: Anand Singh 2
 *         description : Search payment colleciton details by customer name
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
 *                      type: array
 *                      description: payment colleciton details array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successful"
 *                  data: [{"id":2,"Customer":{"customer_code":"CC02","name":"Anand Singh 2"},"Jobs":[{"payment_terms":"30 days","payment_due_day":26,"jobCount":2}]}]
 *                  total_count: 1
 *                  path: "http://localhost/collections?offset=0&limit=5&search=Anand Singh 2"
 *       404:
 *         description: Payment colleciton details is not available
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
 *                  message: "Get pending collection data successful"
 *                  statusCode: 200
 *                  data: []
 *                  total_count: 0
 *                  path: "http://localhost/collections?search=6"
 */
router.get('/', extractJWT_1.default, collections_2.getAllPaymentStatusValidation, validation_1.default, collections_1.default.getAllPaymentStatus);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/collections/mypayments':
 *  get:
 *     tags:
 *     - Payment Collection
 *     description: Return jobs list with search and filter params
 *     parameters:
 *       - in : path
 *         name : offset
 *         required : true
 *         description: pagination offset
 *         schema :
 *          type : number
 *          default : 0
 *       - in : path
 *         name : limit
 *         required : true
 *         description: pagination limit
 *         schema :
 *          type : number
 *          default : 10
 *     responses:
 *       200:
 *         description: Successfully fetched payment history
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
 *                      description: payment colleciton details array
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched payment history."
 *                  data: [{"cr_amount":"45.00","dr_amount":null,"Payment":{"id":4,"payment_mode":"cash","amount":45,"createdAt":"2022-10-27T13:52:31.000Z","cheque_sap_handover_status":0,"cheque_bounce":null,"Job":{"is_oneoff_job":0,"SapSite":{"site_code":"SS01","name":"Hopsital"},"DivisionMaster":{"id":1,"name":"Cleaning"}}}}]
 *                  path: "http://localhost/collections?jobcode=j01"
 *                  total_count: 1
 *       404:
 *         description: Payment colleciton details is not available
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
 *                  message: ""
 *                  statusCode: 200
 *                  data: []
 *                  total_count: 0
 *                  path: "http://localhost/collections/"
 */
router.get('/mypayments', extractJWT_1.default, collections_2.getSupervisorPaymentSummaryValidation, validation_1.default, collections_1.default.getSupervisorPaymentSummary);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/collections/payment':
 *  post:
 *     tags:
 *     - Payment Collection
 *     description: post payment information
 *     parameters:
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *              type: object
 *              properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                          job_code:
 *                              type: string
 *                          customer_id:
 *                              type: number
 *                          amount:
 *                              type: number
 *                          payment_mode:
 *                              type: string
 *                      example:
 *                          job_code: J01
 *                          customer_id: 1
 *                          amount: 45
 *                          payment_mode: cheque
 *                  img:
 *                      type: string
 *                      format: binary
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
 *                  message: "Successfully created payment data."
 *                  path: "http://localhost/collections/payment"
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
 *                  path: "http://localhost/collections/payment"
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
 *                  path: "http://localhost/collections/payment"
 */
router.post('/payment', extractJWT_1.default, imageUpload_1.ImageUpload, (req, res, next) => {
    if (req.body && req.body.data) {
        let input = JSON.parse(req.body.data);
        req.body.data = input; // solution this line
    }
    next();
}, collections_2.postPaymentValidation, validation_1.default, collections_1.default.postPayment);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/collections/payment/summary':
 *  get:
 *     tags:
 *     - Payment Collection
 *     description: get total payment summary
 *     responses:
 *       200:
 *         description: Successfully fetched total payment summary
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
 *                  message: "Successfully fetched total payment summary."
 *                  data: {"cash_balance":"300.00","cheque_count":1,"total_balance":"500.00"}
 *                  path: "http://localhost/collections/payment/summary"
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
 *                  path: "http://localhost/collections/payment/summary"
 */
router.get('/payment/summary', extractJWT_1.default, collections_1.default.getTotalPaymentSummary);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/collections/completed/{jobcode}':
 *  put:
 *     tags:
 *     - Payment Collection
 *     description: To change the job status as completed
 *     parameters:
 *       - in : path
 *         name : jobcode
 *         description : Job code
 *         schema :
 *          type : String
 *          default: J01
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *              type: object
 *              properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                          QuoteItems:
 *                              type: array
 *                          copy_of_quote:
 *                              type: string
 *                          id:
 *                              type: integer
 *                      example:
 *                          QuoteItems: [{"service_id": 1, "qty": 9, "price": 800}, {"service_id": 2, "qty": 1, "price": 300},{"service_id": 3, "qty": 4, "price": 1000}]
 *                          copy_of_quote: digital
 *                          id: 1
 *                  img:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *     responses:
 *       201:
 *         description: Job status updated successfully
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
 *                      description: Job code status changed message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 201
 *                  message: "Updated Job status successfully."
 *                  path: "http://localhost/collections/completed/J01"
 *       404:
 *         description: Invalid Input.
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
 *                  message: "service_id is required and should be a number"
 *                  statusCode: 404
 *                  path: "http://localhost/collections/completed/J01"
 *       500:
 *         description: Invalid Job code.
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
 *                  message: "Cannot read properties of null (reading 'is_oneoff_job')"
 *                  statusCode: 500
 *                  path: "http://localhost/collections/completed/J0"
 */
router.put('/completed/:jobcode', extractJWT_1.default, imageUpload_1.ImageUpload, (req, res, next) => {
    if (req.body && req.body.data) {
        let input = JSON.parse(req.body.data);
        req.body.data = input;
    }
    next();
}, collections_2.updateJobStatusValidation, validation_1.default, collections_1.default.updateJobStatus);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/collections/spc-url/{jobCode}':
 *  get:
 *     tags:
 *     - Payment Collection
 *     description: To search SPC form url
 *     parameters:
 *       - in : path
 *         name : jobCode
 *         schema :
 *          type : String
 *          default: J03
 *         description : Search SPC form url
 *
 *     responses:
 *       200:
 *         description: Get SPC form url Successful.
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
 *                      description: spc_form_url data
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get SPC form url Successful."
 *                  data: {"sap_job_code":"J03","spc_form_url":"8f63c06a-7309-4ef4-9195-01d81cb62f46.png"}
 *                  path: "http://localhost/collections/spc-url/j03"
 *       400:
 *         description: Invalid Job code
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
 *                  path: "http://localhost/collections/spc-url/j0"
 */
router.get('/spc-url/:jobCode', extractJWT_1.default, collections_1.default.getSpcFormUrl);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/collections/joblisting/{quoteId}':
 *  get:
 *     tags:
 *     - Payment Collection
 *     description: To get Job list for a quote
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         schema :
 *          type : string
 *          default: Q01
 *         description : Get Job list for a given quote ID
 *       - in : query
 *         name : filter
 *         schema :
 *          type : string
 *          default: upcoming
 *         description : Filter based on upcoming,overdue,bounced and received
 *       - in : query
 *         name : search
 *         schema :
 *          type : string
 *          default: J01
 *         description : Search based on Job code.
 *
 *     responses:
 *       200:
 *         description: Get Job list for a quote ID successful.
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
 *                      description: Job list data
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Get Job list for a quote ID successful"
 *                  data: [{"sap_job_code":"J01","sap_quote_id":"Q01","end_date":"2023-01-01","payment_terms":"30 days","payment_due_day":32,"DivisionMaster":{"id":1,"name":"Cleaning"},"SapSite":{"site_code":"SS01","name":"Hopsital"},"Payments":[{"id":1,"job_code":"J01","payment_mode":"cash","cheque_sap_handover_status":0,"cheque_bounce":0,"recent_payment":1000}],"Quote":{"id":1,"sap_quote_id":"Q01","Customer":{"id":1,"name":"Anand Singh","customer_code":"CC01","mobile_number":"566690403","email":null,"total_outstanding_amount":"5000.00"}},"Invoices":[{"id":8,"job_code":"J01","status":"closed","sap_invoice_date":"2022-12-27T14:49:02Z","sap_invoice_code":"IN01","sap_invoice_due_date":"2022-12-27T14:49:02Z","sap_invoice_amount":5000,"discount":500,"vat":5,"due_amount":1,"pre_payment":1000}]}]
 *                  total_count: 1
 *                  path: "http://localhost/collections/joblisting/Q01"
 *       404:
 *         description: URL not found..
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
 *                  message: "URL not found.."
 *                  statusCode: 404
 *                  path: "http://localhost/collections/joblisting/"
 */
router.get('/joblisting/:quoteId', extractJWT_1.default, collections_2.getAllJobsOfQuoteValidation, validation_1.default, collections_1.default.getAllJobsOfQuote);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/collections/acceptanceproof/{quoteId}':
 *  post:
 *     tags:
 *     - Payment Collection
 *     description: To post acceptance proof image
 *     parameters:
 *       - in : path
 *         name : quoteId
 *         description : quote ID
 *         schema :
 *          type : Number
 *          default: 1
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
 *         description: Post acceptance proof image successful
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
 *                      description: Post acceptance proof image
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 201
 *                  message: "Post acceptance proof image successful"
 *                  path: "http://localhost/collections/acceptanceproof/1"
 *       404:
 *         description: Invalid Input.
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
 *                  message: "service_id is required and should be a number"
 *                  statusCode: 404
 *                  path: "http://localhost/collections/acceptanceproof/"
 */
router.post('/acceptanceproof/:quoteId', extractJWT_1.default, imageUpload_1.ImageUpload, (req, res, next) => {
    if (req.body && req.body.data) {
        let input = JSON.parse(req.body.data);
        req.body.data = input;
    }
    next();
}, collections_1.default.postAcceptanceProofImg);
router.post('/create/divisions', extractJWT_1.default, collections_1.default.postDivisionMaster);
exports.default = router;
