enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOW = 405,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    DUPLICATE = 1001,
    INPUT_ERROR = 1002,
    NO_DATA = 1003,
    TRANSACTION_FAILED = 1004,
    BAD_TIME_INPUT = 1005,
    ALREADY_PRESENT = 1006
}
interface AppErrorArgs {
    name?: string
    httpCode: HttpCode
    description?: string
    isOperational?: boolean
    statusCode?: number
    path?: string
}

interface CustomError {
    statusCode: number
    message: string
    path?: string
}

interface CustomSuccess {
    statusCode: number
    message: string
    token?: string
    key?: string
    data?: [] | {}
    hashpassword?: string
    total_count?: number
    pagination?: {
        PaginationCount: 0
        PaginationPage: 0
        PaginationLimit: 0
    }
    path?: string
}

export { HttpCode, AppErrorArgs, CustomError, CustomSuccess }

