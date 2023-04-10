"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const JobDetails_1 = __importDefault(require("../controllers/JobDetails"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const job_1 = require("../validations/job");
const validation_1 = __importDefault(require("../middleware/validation"));
const job_2 = __importDefault(require("../controllers/job"));
const imageUpload_1 = require("../middleware/imageUpload");
const jobDetails_1 = require("../validations/jobDetails");
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
 * '/jobs/{jobcode}/addSupervisor':
 *  post:
 *     tags:
 *     - Jobs
 *     description: Allocate a supervisor to a perticular job
 *     parameters:
 *       - in : path
 *         name : jobcode
 *         schema :
 *          type : String
 *          default: J01
 *         description : to assign an staff to this job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  empcode:
 *                      type: string
 *                      description: employee code
 *                  temp_start_date:
 *                      type: string
 *                      description: start date of temporary allocation
 *                  temp_end_date:
 *                      type: string
 *                      description: end date of temporary allocation
 *                  recreate:
 *                      type: number
 *                      description: overide option
 *              example:
 *                  {"empcode": "E0131","temp_start_date": "2022-10-20","temp_end_date": "2022-10-23","recreate": 0}
 *     responses:
 *       200:
 *         description: successfully alocated the supervisor to a perticular job
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
 *                  message: "successfully alocated the supervisor to a perticular job"
 *                  data: [{"id":28,"temp_start_date":"2022-11-04","temp_end_date":"2022-11-09","Employee":{"first_name":"Supervisor 4","last_name":null}}]
 *                  path: "http://localhost/jobs"
 *       201:
 *         description: successfully alocated the supervisor to a perticular job
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
 *                  message: "successfully alocated the supervisor to a perticular job"
 *                  path: "http://localhost/jobs"
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
router.post('/:jobcode/addSupervisor', extractJWT_1.default, jobDetails_1.addSupervisorValidation, validation_1.default, JobDetails_1.default.addSupervisor);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/{jobcode}/staff':
 *  post:
 *     tags:
 *     - Jobs
 *     description: Allocate a staff to a perticular job
 *     parameters:
 *       - in : path
 *         name : jobcode
 *         schema :
 *          type : String
 *          default: J01
 *         description : to assign an staff to this job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  empcode:
 *                      type: array
 *                      description: employee code
 *              example:
 *                  empcode: ["E0139","E0141"]
 *     responses:
 *       201:
 *         description: successfully alocated the staff to a perticular job
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
 *                  statusCode: 201
 *                  message: "Allocated staff sucessfully"
 *                  path: "http://localhost/jobs"
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
router.post('/:jobcode/staff', extractJWT_1.default, jobDetails_1.addstaffValidation, validation_1.default, JobDetails_1.default.addStaff);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs':
 *  get:
 *     tags:
 *     - Jobs
 *     description: Return jobs list with search and filter params
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *          default: J01
 *         description : to search jobs by name or id
 *       - in : query
 *         name : filter
 *         schema :
 *          type : String
 *          default: ST01
 *         description : to filter out jobs based on their status
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
 *                  message: "Successfully fetched assigned jobs."
 *                  data: [{"id":5,"sap_job_code":"J05","is_oneoff_job":0,"sap_quote_id":"Q01","division_id":1,"spc_form_url":null,"start_date":"2023-02-03","end_date":"2023-02-13","catering_type":null,"payment_terms_code":"Z002","recent_payment":3000,"is_daily_report_submitted":0,"due_amount":null,"Supervisor":{"upload_essential":0,"temp_start_date":"2023-02-07"},"SapSite":{"name":"School","site_code":"SS02","SapLocations":[]},"StatusMaster":{"id":2,"desc":"Ongoing - Regular","status_code":"ST02","is_active":1,"type":"job"},"DivisionMaster":{"id":1,"name":"Cleaning","division_code":"G1","icon_filename":"cleaning.png","is_active":1,"is_catering":0},"Quote":{"customer_id":1,"Customer":{"customer_code":"CC01","name":"Anand Singh","email":null,"mobile_number":"566690403","total_outstanding_amount":5000}}},{"id":6,"sap_job_code":"J06","is_oneoff_job":0,"sap_quote_id":"Q01","division_id":3,"spc_form_url":null,"start_date":"2023-02-03","end_date":"2023-02-13","catering_type":null,"payment_terms_code":"Z002","recent_payment":null,"is_daily_report_submitted":0,"due_amount":null,"Supervisor":{"upload_essential":0,"temp_start_date":"2023-02-07"},"SapSite":{"name":"School","site_code":"SS02","SapLocations":[]},"StatusMaster":{"id":2,"desc":"Ongoing - Regular","status_code":"ST02","is_active":1,"type":"job"},"DivisionMaster":{"id":3,"name":"Hard FM","division_code":"G4","icon_filename":"default.png","is_active":1,"is_catering":0},"Quote":{"customer_id":1,"Customer":{"customer_code":"CC01","name":"Anand Singh","email":null,"mobile_number":"566690403","total_outstanding_amount":5000}}},{"id":9,"sap_job_code":"J09","is_oneoff_job":0,"sap_quote_id":"Q01","division_id":1,"spc_form_url":null,"start_date":"2023-02-03","end_date":"2023-02-13","catering_type":null,"payment_terms_code":"Z002","recent_payment":null,"is_daily_report_submitted":0,"due_amount":null,"Supervisor":{"upload_essential":0,"temp_start_date":null},"SapSite":{"name":"Mall","site_code":"SS03","SapLocations":[{"latitude":12.9641667366,"id":3,"longitude":77.64178733769},{"latitude":12.9641667366,"id":4,"longitude":77.64178733769},{"latitude":12.9641667366,"id":7,"longitude":77.64178733769},{"latitude":12.9641667366,"id":8,"longitude":77.64178733769}]},"StatusMaster":{"id":2,"desc":"Ongoing - Regular","status_code":"ST02","is_active":1,"type":"job"},"DivisionMaster":{"id":1,"name":"Cleaning","division_code":"G1","icon_filename":"cleaning.png","is_active":1,"is_catering":0},"Quote":{"customer_id":1,"Customer":{"customer_code":"CC01","name":"Anand Singh","email":null,"mobile_number":"566690403","total_outstanding_amount":5000}}},{"id":13,"sap_job_code":"J13","is_oneoff_job":0,"sap_quote_id":"Q01","division_id":2,"spc_form_url":null,"start_date":"2023-02-03","end_date":"2023-02-13","catering_type":"internal","payment_terms_code":"Z001","recent_payment":null,"is_daily_report_submitted":0,"due_amount":null,"Supervisor":{"upload_essential":0,"temp_start_date":"2023-02-07"},"SapSite":{"name":"Hopsital","site_code":"SS01","SapLocations":[{"latitude":12.9641667366,"id":1,"longitude":77.64178733769},{"latitude":2.9641667366,"id":2,"longitude":7.64178733769},{"latitude":12.9641667366,"id":5,"longitude":77.64178733769},{"latitude":2.9641667366,"id":6,"longitude":7.64178733769}]},"StatusMaster":{"id":2,"desc":"Ongoing - Regular","status_code":"ST02","is_active":1,"type":"job"},"DivisionMaster":{"id":2,"name":"Catering","division_code":"G2","icon_filename":"catering.png","is_active":1,"is_catering":1},"Quote":{"customer_id":1,"Customer":{"customer_code":"CC01","name":"Anand Singh","email":null,"mobile_number":"566690403","total_outstanding_amount":5000}}}]
 *                  total_count: 5
 *                  path: "http://localhost/jobs"
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
 *                  message: "Invalid body or params"
 *                  statusCode: 404
 *                  path: "http://localhost/jobs"
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
 *                  message: "Query Failed"
 *                  statusCode: 500
 *                  path: "http://localhost/jobs"
 */
router.get('/', extractJWT_1.default, job_1.getAssignedJobsValidation, validation_1.default, job_2.default.getAssignedJobs);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/additionalhours':
 *  post:
 *     tags:
 *     - Jobs
 *     description: Add additional hours to staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  empCode:
 *                      type: string
 *                      description: employee code
 *                  jobCode:
 *                      type: string
 *                      description: job code
 *                  comments:
 *                      type: string
 *                      description: additional comments
 *                  hours:
 *                      type: string
 *                      description: number of hours in the HH:MM format
 *              example:
 *                  empCode: E0139
 *                  jobCode: J01
 *                  comments: This is a comment
 *                  hours: 01:50
 *     responses:
 *       201:
 *         description: Add additional hours to staff
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
 *                    message: "Successfully added additional hours."
 *                    path: "http://localhost/jobs/additionalhours"
 *       400:
 *         description: Cannot add any additional hours
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
 *                  message: "Cannot add any additional hours."
 *                  statusCode: 400
 *                  path: "http://localhost/jobs/additionalhours"
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
 *                  path: "http://localhost/jobs/additionalhours"
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
 *                  path: "http://localhost/jobs/additionalhours"
 */
router.post('/additionalhours', job_1.postAdditionalHoursValidation, validation_1.default, extractJWT_1.default, job_2.default.postAdditionalHours);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/report':
 *  post:
 *     tags:
 *     - Jobs
 *     description: Submit Job Report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *
 *                  jobCode:
 *                      type: string
 *                      description: job code
 *
 *              example:
 *                  jobCode: J01
 *     responses:
 *       201:
 *         description: Successfully submitted report
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
 *                    message: "Successfully submitted report."
 *                    path: "http://localhost/jobs/report"
 *       400:
 *         description: Could not submit report
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
 *                  message: "Could not submit report."
 *                  statusCode: 400
 *                  path: "http://localhost/jobs/report"
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
 *                  path: "http://localhost/jobs/report"
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
 *                  path: "http://localhost/jobs/report"
 */
router.post('/report', extractJWT_1.default, job_1.postSubmitReportValidation, validation_1.default, job_2.default.postSubmitReport);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/{jobCode}':
 *  post:
 *     tags:
 *     - Jobs
 *     description: Post the attendence of staff
 *     parameters:
 *       - in : path
 *         name : jobCode
 *         required : true
 *         description: employee code of the user
 *         schema :
 *          type : string
 *          default : J01
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *              type: object
 *              properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                          checkInEmployeeCodes:
 *                              type: array
 *                          checkInTime:
 *                              type: string
 *                          inComment:
 *                              type: string
 *                      example:
 *                          checkInEmployeeCodes: ["E0134"]
 *                          checkInTime: 2022-09-12 16:49:35
 *                          inComment: hello
 *                  img:
 *                      type: array
 *                      format: binary
 *     responses:
 *       201:
 *         description: successfully alocated the supervisor to a perticular job
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
 *                  message: "Logged in successfully"
 *                  path: "http://localhost/jobs/{jobCode}"
 *       400:
 *         description: Cannot update attendence.
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
 *                  message: "Cannot update attendence. "
 *                  statusCode: 400
 *                  path: "http://localhost/jobs/{jobCode}"
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
 *                  message: "Query Failed. "
 *                  statusCode: 500
 *                  path: "http://localhost/jobs/{jobCode}"
 */
router.post('/:jobCode', extractJWT_1.default, imageUpload_1.ImageUpload, job_2.default.postAttendence);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/filter':
 *  get:
 *     tags:
 *     - Jobs
 *     description: Return's all jobs status list with count
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *         description : to serach modifies the count in the filter list
 *     responses:
 *       200:
 *         description: Returns a list of assigned staff and staff details available
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
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully fetched filter list with count."
 *                  data: [{"status_code":"ST01","status_name":"Not Started","count":1},{"status_code":"ST02","status_name":"Ongoing","count":1},{"status_code":"ST03","status_name":"Completed","count":0}]
 *                  path: "http://localhost/jobs/filter"
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
 *                  path: "http://localhost/jobs/filter"
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
 *                  path: "http://localhost/jobs/filter"
 */
router.get('/filter', extractJWT_1.default, job_1.getJobStatusWithCountValidation, validation_1.default, job_2.default.getJobStatusWithCount);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/staff':
 *  get:
 *     tags:
 *     - Jobs
 *     description: Return's all staff details to the authorized user
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *         description : to search staff by name or Id
 *       - in : query
 *         name : offset
 *         schema :
 *          type : Number
 *          default: 0
 *       - in : query
 *         name : limit
 *         schema :
 *          type : Number
 *          default: 10
 *         description : get staff hours by job code
 *     responses:
 *       200:
 *         description: Returns a list of staff details available
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
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *
 *             example:
 *                  statusCode: 200
 *                  message: "Logged in successfully"
 *                  data: [{"sap_employee_code":"E0135","first_name":"Staff 2","last_name":null,"email":null,"phone":"886774497","is_active":1,"role_code":"50000112","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Attendences":[],"AttendenceAdditionalHours":[],"Role":{"role_code":"50000112","name":"Cleaner-Public Build","staff_type":0,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}},{"sap_employee_code":"E0137","first_name":"Staff 4","last_name":null,"email":null,"phone":"886774499","is_active":1,"role_code":"50000112","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Attendences":[],"AttendenceAdditionalHours":[],"Role":{"role_code":"50000112","name":"Cleaner-Public Build","staff_type":0,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}},{"sap_employee_code":"E0138","first_name":"Staff 5","last_name":null,"email":null,"phone":"8867744100","is_active":1,"role_code":"50000112","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Attendences":[],"AttendenceAdditionalHours":[],"Role":{"role_code":"50000112","name":"Cleaner-Public Build","staff_type":0,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}},{"sap_employee_code":"E0141","first_name":"Staff 8","last_name":null,"email":null,"phone":"8867744103","is_active":1,"role_code":"50000112","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Attendences":[],"AttendenceAdditionalHours":[],"Role":{"role_code":"50000112","name":"Cleaner-Public Build","staff_type":0,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}},{"sap_employee_code":"E0143","first_name":"Staff 10","last_name":null,"email":null,"phone":"8867744105","is_active":1,"role_code":"50000112","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Attendences":[],"AttendenceAdditionalHours":[],"Role":{"role_code":"50000112","name":"Cleaner-Public Build","staff_type":0,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}}]
 *                  path: "http://localhost/jobs/staff'"
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
 *                  path: "http://localhost/jobs/staff'"
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
 *                  path: "http://localhost/jobs/staff'"
 */
router.get('/staff', extractJWT_1.default, jobDetails_1.getstaffValidation, validation_1.default, JobDetails_1.default.getStaff);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/{jobcode}/staff':
 *  get:
 *     tags:
 *     - Jobs
 *     description: Return's all staff details to the authorized user
 *     parameters:
 *       - in : query
 *         name : search
 *         schema :
 *          type : String
 *         description : to search staff by name or Id
 *       - in : query
 *         name : filter
 *         schema :
 *          type : String
 *         description : filter staff by availability
 *       - in : path
 *         name : jobcode
 *         schema :
 *          type : String
 *          default: J01
 *         description : filter for the quotes
 *     responses:
 *       200:
 *         description: Returns a list of staff details available
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
 *                      description: error message
 *                  total_count:
 *                      type: integer
 *                      description: count
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *
 *             example:
 *                  statusCode: 200
 *                  message: "fetched staff working hours."
 *                  data: [{"temp_alloted":0,"temp_start_date":null,"temp_end_date":null,"job_code":"J03","id":3,"is_active_on_another_job":1,"job_codes_active":"J02,J04","Employee":{"sap_employee_code":"21000004","first_name":"PRANITH KUMAR","last_name":"POTHUGANTI","role_code":"50000118","EmployeeLeaves":[{"date":"2023-02-09","leave_type":"leave"}],"Role":{"role_code":"50000118","name":"Agricultural Worker","staff_type":0,"createdAt":"2023-02-09T15:27:35Z","updatedAt":"2023-02-09T15:27:35Z"},"Attendence":[{"check_in_time":"2023-02-06T14:43:00Z","check_out_time":null,"recent_check_in_time":"2023-02-06T14:43:00Z","total_monthly_hours_worked":"0.0000"}]}}]
 *                  total_count: 3
 *                  path: "http://localhost/{jobcode}/staff"
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
 *                  message: "Invalid body or params"
 *                  statusCode: 404
 *                  path: "http://localhost/{jobcode}/staff"
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
 *                  path: "http://localhost/{jobcode}/staff"
 */
router.get('/:jobcode/staff', extractJWT_1.default, jobDetails_1.getstaffAssignedToJobValidation, validation_1.default, JobDetails_1.default.getstaffAssignedToJob);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/supervisor':
 *  get:
 *     tags:
 *     - Jobs
 *     description: Return list of supervisor
 *     parameters:
 *       - in : query
 *         name : empcode
 *         schema :
 *          type : String
 *          default: 21000002
 *         description : search supervisor through sap employee code
 *     responses:
 *       200:
 *         description: Returns a list of supervisor
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
 *                  total_count:
 *                      type: integer
 *                      description: count of objects returned
 *             example:
 *                  statusCode: 200
 *                  message: "Get supervisor list"
 *                  data: [{"sap_employee_code":"21000002","first_name":"Supervisor 1","last_name":null,"email":null,"phone":"8867744931","is_active":1,"role_code":"50000114","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Role":{"role_code":"50000114","name":"Supervisor","staff_type":1,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}},{"sap_employee_code":"E0130","first_name":"Supervisor 2","last_name":null,"email":null,"phone":"9867744932","is_active":1,"role_code":"50000114","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Role":{"role_code":"50000114","name":"Supervisor","staff_type":1,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}},{"sap_employee_code":"E0131","first_name":"Supervisor 3","last_name":null,"email":null,"phone":"8867744933","is_active":1,"role_code":"50000114","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Role":{"role_code":"50000114","name":"Supervisor","staff_type":1,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}},{"sap_employee_code":"E0132","first_name":"Supervisor 4","last_name":null,"email":null,"phone":"8867744934","is_active":1,"role_code":"50000114","daily_contract_hrs":8,"emp_type":"omani","photo_url":null,"Role":{"role_code":"50000114","name":"Supervisor","staff_type":1,"createdAt":"2023-02-03T11:04:35Z","updatedAt":"2023-02-03T11:04:35Z"}}]
 *                  path: "http://localhost/jobs/supervisor"
 *                  total_count: 1
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
 *                  path: "http://localhost/jobs/supervisor"
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
 *                  path: "http://localhost/jobs/supervisor"
 */
router.get('/supervisor', extractJWT_1.default, job_1.getSupervisorValidation, validation_1.default, JobDetails_1.default.getSupervisor);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/{jobCode}/staffhours':
 *  get:
 *     tags:
 *     - Jobs
 *     description: Return job staff hours for a particular job
 *     parameters:
 *       - in : path
 *         name : jobCode
 *         schema :
 *          type : String
 *          default: J01
 *       - in : query
 *         name : offset
 *         schema :
 *          type : Number
 *          default: 0
 *       - in : query
 *         name : limit
 *         schema :
 *          type : Number
 *          default: 2
 *         description : get staff hours by job code
 *     responses:
 *       200:
 *         description: Returns staff summary for regular jobs
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
 *                      description: staff hours table data
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Fetched staff working hours."
 *                  data: {"staff_hour_list":[{"sap_employee_code":"E0143","first_name":"Staff 10","last_name":null,"total_hours_worked":"06:26"},{"sap_employee_code":"E0145","first_name":"Staff 12","last_name":null,"total_hours_worked":"00:30"}],"staff_summary":{"total_hours_worked":"06:56","staff_count":2}}
 *                  path: "http://localhost/jobs/{jobCode}/staffhours"
 *       200(one off jobs):
 *         description: Returns staff summary for one off jobs
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
 *                      description: staff hours table data
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Fetched staff working hours."
 *                  data: {"job_date":{"job_start_date":"2022-11-03T07:41:11.000Z","last_working_date":"2022-11-04T14:15:00.000Z"},"staff_summary":{"total_hours_worked":"06:56","staff_count":2}}
 *                  path: "http://localhost/jobs/{jobCode}/staffhours"
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
 *                  path: "http://localhost/jobs/{jobCode}/staffhours"
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
 *                  path: "http://localhost/jobs/{jobCode}/staffhours"
 */
router.get('/:jobCode/staffhours', extractJWT_1.default, job_1.getStaffWorkingHoursValidation, validation_1.default, job_2.default.getStaffWorkingHours);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/jobs/{jobcode}/summary':
 *  get:
 *     tags:
 *     - Jobs
 *     description: Return job staff hours for a particular job
 *     parameters:
 *       - in : path
 *         name : jobcode
 *         schema :
 *          type : String
 *          default: J01
 *         description : to get perticular jobs summary
 *     responses:
 *       200:
 *         description: Returns a list of staff hours
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
 *                      description: staff hours table data
 *                  total_count:
 *                      type: number
 *                      description: total count of all staff with working hours
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Fetched complete summary."
 *                  data: {"job_details":[{"sap_job_code":"J01","createdAt":"2022-09-27T18:38:05.000Z","SapSite":{"site_code":"SS01","sap_site_name":"Hopsital"},"DivisionMaster":{"sap_division_name":"Cleaning"}}],"material_summary":[{"material_code":"DISINF001","total_quantity":"20.00"},{"material_code":"DISINF001","total_quantity":"23.00"}],"equipment_summary":[{"equipment_code":"1","total_hrs":"2","total_mins":"30"},{"equipment_code":"2","total_hrs":"3","total_mins":"30"}],"total_count":1}
 *                  total_count: 1
 *                  path: "http://localhost/jobs/finalSummary/:jobcode"
 *       400:
 *         description: Cannot fetch job summary.
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
 *                  message: "supervisor and job mismatch."
 *                  statusCode: 400
 *                  path: "http://localhost/jobs/{jobcode}/summary"
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
router.get('/:jobcode/summary', extractJWT_1.default, job_2.default.getDailySummary);
exports.default = router;
