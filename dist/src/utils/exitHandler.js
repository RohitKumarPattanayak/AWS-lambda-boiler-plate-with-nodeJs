"use strict";
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
exports.exitHandler = void 0;
const index_1 = require("../index");
const logger_1 = __importDefault(require("./logger"));
class ExitHandler {
    handleExit(code, timeout = 5000) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.http(`Attempting a graceful shutdown with code ${code}`);
                setTimeout(() => {
                    logger_1.default.http(`Forcing a shutdown with code ${code}`);
                    process.exit(code);
                }, timeout).unref();
                if (index_1.server.listening) {
                    logger_1.default.http('Terminating HTTP connections');
                    yield index_1.httpTerminator.terminate();
                }
                logger_1.default.http(`Exiting gracefully with code ${code}`);
                process.exit(code);
            }
            catch (error) {
                logger_1.default.http('Error shutting down gracefully');
                logger_1.default.http(error);
                logger_1.default.http(`Forcing exit with code ${code}`);
                process.exit(code);
            }
        });
    }
}
exports.exitHandler = new ExitHandler();
