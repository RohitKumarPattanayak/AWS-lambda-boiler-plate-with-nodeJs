"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../controllers/admin"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const admin_2 = require("../validations/admin");
const validation_1 = __importDefault(require("../middleware/validation"));
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
 * '/admin/jobs':
 *  get:
 *     tags:
 *     - Admin
 *     description: get all jobs available
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: J01
 *         description : to search jobs by job code
 *       - in : query
 *         name : limit
 *         description: pagination limit
 *         schema :
 *          type : number
 *          default : 10
 *       - in : query
 *         name : offset
 *         required : true
 *         description: pagination offset
 *         schema :
 *          type : number
 *          default : 0
 *     responses:
 *       200:
 *         description: Returns a list of job details
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
 *                  total_count:
 *                      type: integer
 *                      description: count
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched jobs."
 *                  data: {"jobs":[{"id":1,"sap_job_code":"J01","is_location_enable":1,"SapSite":{"name":"Hopsital","site_code":"SS01","SapLocations":[{"latitude":13.96416673464,"id":10,"longitude":78.6417873234767},{"latitude":13.964166234364,"id":9,"longitude":78.6417823433767},{"latitude":13.96416673564,"id":8,"longitude":null}]}},{"id":2,"sap_job_code":"J02","is_location_enable":0,"SapSite":{"name":"Hopsital","site_code":"SS01","SapLocations":[{"latitude":13.96416673464,"id":10,"longitude":78.6417873234767},{"latitude":13.964166234364,"id":9,"longitude":78.6417823433767},{"latitude":13.96416673564,"id":8,"longitude":null}]}},{"id":3,"sap_job_code":"J03","is_location_enable":0,"SapSite":{"name":"Hopsital","site_code":"SS01","SapLocations":[{"latitude":13.96416673464,"id":10,"longitude":78.6417873234767},{"latitude":13.964166234364,"id":9,"longitude":78.6417823433767},{"latitude":13.96416673564,"id":8,"longitude":null}]}},{"id":4,"sap_job_code":"J04","is_location_enable":0,"SapSite":{"name":"Hopsital","site_code":"SS01","SapLocations":[{"latitude":13.96416673464,"id":10,"longitude":78.6417873234767},{"latitude":13.964166234364,"id":9,"longitude":78.6417823433767},{"latitude":13.96416673564,"id":8,"longitude":null}]}},{"id":5,"sap_job_code":"J05","is_location_enable":0,"SapSite":{"name":"School","site_code":"SS02","SapLocations":[]}},{"id":6,"sap_job_code":"J06","is_location_enable":0,"SapSite":{"name":"School","site_code":"SS02","SapLocations":[]}},{"id":7,"sap_job_code":"J07","is_location_enable":0,"SapSite":{"name":"School","site_code":"SS02","SapLocations":[]}},{"id":8,"sap_job_code":"J08","is_location_enable":0,"SapSite":{"name":"School","site_code":"SS02","SapLocations":[]}},{"id":9,"sap_job_code":"J09","is_location_enable":0,"SapSite":{"name":"Mall","site_code":"SS03","SapLocations":[{"latitude":12.9641667366,"id":4,"longitude":77.64178733769},{"latitude":12.9641667366,"id":3,"longitude":77.64178733769}]}},{"id":10,"sap_job_code":"J10","is_location_enable":0,"SapSite":{"name":"Mall","site_code":"SS03","SapLocations":[{"latitude":12.9641667366,"id":4,"longitude":77.64178733769},{"latitude":12.9641667366,"id":3,"longitude":77.64178733769}]}}],"current_count":14}
 *                  total_count: 14
 *                  path: "http://localhost/admin/jobs"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *              schema:
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
 *              example:
 *                  message: "User not found / No access to APP yet."
 *                  statusCode: 401
 *                  path: "http://localhost/admin/jobs"
 *       403:
 *         description: Invalid credentials
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
 *                  message: "Invalid credentials"
 *                  statusCode: 403
 *                  path: "http://localhost/admin/jobs"
 */
router.get('/jobs', extractJWT_1.default, admin_2.getJobsValidation, validation_1.default, admin_1.default.getjobs);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/admin/update/{jobcode}/locations':
 *  post:
 *     tags:
 *     - Admin
 *     description: To add or update locations for a perticular job.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: array
 *              properties:
 *                  latitude:
 *                      type: number
 *                      description: latitute of the added location
 *                  longitude:
 *                      type: number
 *                      description: longitude of the added location
 *              example:
 *               longitude: 78.64178733767
 *               latitude: 13.96416673564
 *     parameters:
 *       - in : path
 *         name : jobcode
 *         required : true
 *         description: job code whose location tracking should be enabled/disabled
 *         schema :
 *          type : String
 *          default: j01
 *     responses:
 *       201:
 *         description: Successfully updated job locations.
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
 *                  message: "Successfully updated location for j01."
 *                  path: "http://localhost/admin/update/{jobcode}/locations"
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
 *                  path: "http://localhost/admin/update/{jobcode}/locations"
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
 *                  path: "http://localhost/admin/update/{jobcode}/locations"
 */
router.post('/update/:jobcode/locations', extractJWT_1.default, admin_2.updateOrAddSiteCodeValidation, validation_1.default, admin_1.default.updateOrAddSiteCode);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/admin/login':
 *  post:
 *     tags:
 *     - Admin
 *     description: Returns private token with the id of the admin upon logging in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      description: employee code
 *                  password:
 *                      type: string
 *                      description: password of the admin's account
 *              example:
 *                  username: "21000002"
 *                  password: "1234567"
 *     responses:
 *       200:
 *         description: Returns private token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  token:
 *                      type: string
 *                      description: private token
 *                  message:
 *                      type: string
 *                      description: error message
 *                  data:
 *                      type: object
 *                      description: return's admin id
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *               example:
 *                    statusCode: 200
 *                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                    message: "Logged in successfully"
 *                    data: {"admin_id":1}
 *                    path: "http://localhost/admin/login"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *              schema:
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
 *              example:
 *                  message: "User not found / No access to APP yet."
 *                  statusCode: 401
 *                  path: "http://localhost/admin/login"
 *       403:
 *         description: Invalid credentials
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
 *                  message: "Invalid credentials"
 *                  statusCode: 403
 *                  path: "http://localhost/admin/login"
 */
router.post('/login', extractJWT_1.default, admin_2.adminLoginValidation, validation_1.default, admin_1.default.adminLogin);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/admin/update/{jobcode}/{enable}':
 *  put:
 *     tags:
 *     - Admin
 *     description: update location tracking status
 *     parameters:
 *       - in : path
 *         name : jobcode
 *         required : true
 *         description: job code whose location tracking should be enabled/disabled
 *         schema :
 *          type : String
 *          default: j01
 *       - in : path
 *         name : enable
 *         required : true
 *         description: in oredr to enable job location tracking input 1 else 0
 *         schema :
 *          type : Number
 *          default: 1
 *     responses:
 *       204:
 *         description: updated location status.
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
 *                  statusCode: 204
 *                  message: "updated location status."
 *                  path: "http://localhost/admin/update/{j01}/{1}"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *              schema:
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
 *              example:
 *                  message: "User not found / No access to APP yet."
 *                  statusCode: 401
 *                  path: "http://localhost/admin/update/{j01}/{1}"
 *       403:
 *         description: Invalid credentials
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
 *                  message: "Invalid credentials"
 *                  statusCode: 403
 *                  path: "http://localhost/admin/update/{j01}/{1}"
 */
router.put('/update/:jobcode/:enable', extractJWT_1.default, admin_1.default.enableOrDisableLoc);
module.exports = router;
