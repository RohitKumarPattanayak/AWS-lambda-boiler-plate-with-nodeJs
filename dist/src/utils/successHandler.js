"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandler = void 0;
const httpResponse_1 = require("../interfaces/httpResponse");
class SuccessHandler {
    handleSuccess(success, response, request) {
        return response.status(httpResponse_1.HttpCode.OK).json({
            success: this.getSuccessResponse(success, request)
        });
    }
    getSuccessResponse(CustomSuccess, request) {
        let successObj = {
            statusCode: CustomSuccess.statusCode || 200,
            message: CustomSuccess.message || 'Success',
            token: CustomSuccess.token,
            key: CustomSuccess.key,
            data: CustomSuccess.data,
            hashpassword: CustomSuccess.hashpassword,
            total_count: CustomSuccess.data && Array.isArray(CustomSuccess.data) && CustomSuccess.data.length === 0 ? 0 : CustomSuccess.total_count,
            pagination: CustomSuccess.pagination,
            path: `${request.protocol}://${request.hostname}${request.originalUrl}`
        };
        return successObj;
    }
}
exports.successHandler = new SuccessHandler();
