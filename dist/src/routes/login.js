"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const validation_1 = __importDefault(require("../middleware/validation"));
const auth_2 = require("../validations/auth");
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
 * '/login':
 *  post:
 *     tags:
 *     - Authentication
 *     description: Returns private token upon logging in
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
 *                  password:
 *                      type: string
 *                      description: password of the employee's account
 *              example:
 *                  empcode: "21000002"
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
 *                  path:
 *                      type: string
 *                      description: path of the endpoint
 *                  key:
 *                      type: string
 *                      description: unique key of the user
 *               example:
 *                    statusCode: 200
 *                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                    message: "Logged in successfully"
 *                    path: "http://localhost/login"
 *                    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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
 *                  path: "http://localhost/login"
 */
router.post('/', extractJWT_1.default, auth_2.loginValidation, validation_1.default, auth_1.default.login);
exports.default = router;
