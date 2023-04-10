import { HttpCode, CustomSuccess } from '../interfaces/httpResponse'
import { Response, Request } from 'express'

class SuccessHandler {
    public handleSuccess(success: CustomSuccess, response: Response, request: Request): any {
        return response.status(HttpCode.OK).json({
            success: this.getSuccessResponse(success, request)
        })
    }
    private getSuccessResponse(CustomSuccess: CustomSuccess, request): any {
        let successObj: CustomSuccess = {
            statusCode: CustomSuccess.statusCode || 200,
            message: CustomSuccess.message || 'Success',
            token: CustomSuccess.token,
            key: CustomSuccess.key,
            data: CustomSuccess.data,
            hashpassword: CustomSuccess.hashpassword,
            total_count:
                CustomSuccess.data && Array.isArray(CustomSuccess.data) && CustomSuccess.data.length === 0 ? 0 : CustomSuccess.total_count,
            pagination: CustomSuccess.pagination,
            path: `${request.protocol}://${request.hostname}${request.originalUrl}`
        }
        return successObj
    }
}

export const successHandler = new SuccessHandler()

