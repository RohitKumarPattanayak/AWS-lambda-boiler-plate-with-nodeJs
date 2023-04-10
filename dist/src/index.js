"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpTerminator = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config/config"));
const routes_1 = __importDefault(require("./routes"));
const http_terminator_1 = require("http-terminator");
const morganmiddleware_1 = __importDefault(require("./config/morganmiddleware"));
require("./utils/process");
const logger_1 = __importDefault(require("./utils/logger"));
const Sentry = __importStar(require("@sentry/node"));
const SentryTracing = __importStar(require("@sentry/tracing"));
const cors_1 = __importDefault(require("cors"));
global.__rootdir__ = __dirname || process.cwd();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE']
}));
Sentry.init({
    dsn: process.env.SENTRY_DNS_URL,
    integrations: [
        // new RewriteFrames({
        //   root: global.__rootdir__,
        // }),
        new Sentry.Integrations.Http({ tracing: true }),
        new SentryTracing.Integrations.Express({
            // to trace all requests to the default router
            app
            // alternatively, you can specify the routes you want to trace:
            // router: someRouter,
        })
    ],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0
});
/** Parse the body of the request */
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({}));
app.use(morganmiddleware_1.default);
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
// the rest of your app
app.use(Sentry.Handlers.errorHandler());
exports.server = http_1.default.createServer(app);
exports.httpTerminator = (0, http_terminator_1.createHttpTerminator)({
    server: exports.server
});
app.use(routes_1.default);
try {
    exports.server.listen(config_1.default.server.port, () => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info(`Connected successfully on port ${config_1.default.server.port}`);
    }));
}
catch (error) {
    logger_1.default.warn(`Error occured: ${error}`);
}
