"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const auth_2 = require("../validations/auth");
const validation_1 = __importDefault(require("../middleware/validation"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
/** Rules of our API */
/**
 * @openapi
 * '/token':
 *  get:
 *     tags:
 *     - Authentication
 *     description: Returns public token which is required to access all other public api's
 *     responses:
 *       200:
 *         description: Returns public token
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  statusCode:
 *                      type: integer
 *                      description: status code
 *                  message:
 *                      type: string
 *                      description: comment on the api
 *                  token:
 *                      type: string
 *                      description: public token
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *             example:
 *                  statusCode: 200
 *                  message: "Successfully created token."
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                  path: "http://localhost/token"
 *       403:
 *         description: If unable to create public token
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
 *                  message: "User not found / No access to APP yet."
 *                  statusCode: 403
 *                  path: "http://localhost/token"
 */
router.get('/', (0, cors_1.default)({
    origin: '*'
}), auth_1.default.getToken);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/token/{empcode}':
 *  post:
 *     tags:
 *     - Authentication
 *     description: Returns public token which is required to access all other public api's
 *     parameters:
 *       - in : path
 *         name : empcode
 *         required : true
 *         description: employee code of the user
 *         schema :
 *          type : string
 *          default : 21000002
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  key:
 *                      type: string
 *                      description: employee code
 *              example:
 *                  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     responses:
 *       201:
 *         description: Returns a refreshed token
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
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *
 *             example:
 *                  statusCode: 200
 *                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                  message: "Logged in successfully"
 *                  path: "http://localhost/login"
 *
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
 *                  path: "http://localhost/login"
 *       403:
 *         description: Could not create JWT token.
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
 *                  path: "http://localhost/login"
 */
router.post('/:empcode', extractJWT_1.default, auth_2.refreshTokenValidation, validation_1.default, auth_1.default.refreshToken);
/**
 * @openapi
 * '/token/verify/{empcode}':
 *  get:
 *     tags:
 *     - Authentication
 *     description: Returns if the user exists and returns user key
 *     parameters:
 *       - in : path
 *         name : empcode
 *         required : true
 *         description: employee code of the user
 *         schema :
 *          type : string
 *          default : 21000002
 *     responses:
 *       200:
 *         description: Returns a refreshed token
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
 *                  data:
 *                      type: string
 *                      description: verify boolean and key
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *
 *             example:
 *                  statusCode: 200
 *                  message: "verified user successfully"
 *                  data: {"verify":true,"key":null}
 *                  path: "http://localhost/token/verify/21000002"
 *
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
 *                  path: "http://localhost/token/verify/21000002"
 *       403:
 *         description: Could not create JWT token.
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
 *                  path: "http://localhost/token/verify/21000002"
 */
router.get('/verify/:empCode', extractJWT_1.default, auth_1.default.verifyUser);
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: "http"
 *          scheme: "bearer"
 *          bearerFormat: "JWT"
 *
 * '/token/change/password':
 *  put:
 *     tags:
 *     - Authentication
 *     description: Resets password of the perticular supervisor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  new_password:
 *                      type: string
 *                      description: new password
 *                  empcode:
 *                      type: string
 *                      description: supervisor code
 *                  key:
 *                      type: string
 *                      description: employee code
 *              example:
 *                  {"new_password":"1234567","empcode":"","key":""}
 *     responses:
 *       200:
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
 *                  statusCode: 200
 *                  message: "Successfully updated employee password."
 *                  path: "http://localhost/token/change/password"
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
 *                  path: "http://localhost/token/change/password"
 *       403:
 *         description: Could not create JWT token.
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
 *                  path: "http://localhost/token/change/password"
 */
router.put('/change/password', extractJWT_1.default, auth_2.changePasswordValidation, validation_1.default, auth_1.default.changePassword);
module.exports = router;
