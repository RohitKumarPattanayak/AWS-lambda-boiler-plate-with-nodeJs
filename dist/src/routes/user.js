"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const imageUpload_1 = require("../middleware/imageUpload");
const JobDetails_1 = __importDefault(require("../controllers/JobDetails"));
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
 * '/user':
 *  get:
 *     tags:
 *     - Authentication
 *     description: Return's details of authorized user
 *     parameters:
 *       - in : path
 *         name : key
 *         required : true
 *         description: authorized token
 *         schema :
 *          type : string
 *          default : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYXBfZW1wX2NvZGUiOiJFMDEzMSIsInJvbGUiOiJwcml2YXRlIiwiaWF0IjoxNjYyODA0MTczLCJleHAiOjMzMjU5NjgzNDYsImlzcyI6InNwdXJ0cmVlLW9pZy1pc3N1ZXIifQ._C7J7U42OiFPAR5BTIPqNPWXNstxdPxZUyYL6O9cpvQ
 *     responses:
 *       200:
 *         description: Returns details of logged user details
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
 *                      description: error message
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *
 *             example:
 *                  statusCode: 200
 *                  message: "Logged user data"
 *                  data: {"first_name":"Noor","last_name":null,"email":null,"phone":"8867744930","is_active":1,"role_code":"R02","daily_contract_hrs":8,"emp_type":"omani","role_name":"site manager","Role.role_name":"site manager"}
 *                  path: "http://localhost/userData"
 *       404:
 *         description: user not active.
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
 *                  message: "User not active"
 *                  statusCode: 404
 *                  path: "http://localhost/userData"
 */
router.get('/', extractJWT_1.default, JobDetails_1.default.getLoggedUser);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/user/upload':
 *  post:
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: post image to to aws and return's a the image path
 *     parameters:
 *       - in: formData
 *         name: img
 *         type: file
 *         description: The file to upload.
 *         schema :
 *          type : string
 *          default : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYXBfZW1wX2NvZGUiOiJFMDEzMSIsInJvbGUiOiJwcml2YXRlIiwiaWF0IjoxNjYyODA0MTczLCJleHAiOjMzMjU5NjgzNDYsImlzcyI6InNwdXJ0cmVlLW9pZy1pc3N1ZXIifQ._C7J7U42OiFPAR5BTIPqNPWXNstxdPxZUyYL6O9cpvQ
 *     responses:
 *       201:
 *         description: Returns a list of assigned staff and staff details available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  ImageLocation:
 *                      type: string
 *                      description: status code
 *             example:
 *                  statusCode: 200
 *                  message: "Logged user data"
 *                  data: {"img_url":"https://example-photos1.s3.ap-south-1.amazonaws.com/8ddcb43a-60bb-419a-97ba-af33ace13024.png"}
 *                  path: "http://localhost/user/upload"
 */
router.post('/upload', extractJWT_1.default, imageUpload_1.ImageUpload, JobDetails_1.default.uplaodImage);
exports.default = router;
