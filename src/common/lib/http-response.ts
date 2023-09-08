
export default class HttpResponse<T = object> {
    httpCode: number;
    message: string;
    data: T;
    success: boolean;
    errorCode?: number;
    timestamp: number;
    signature: string;

    private constructor(success: boolean, data: T, message?: string, httpCode?: number, errorCode = 0) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.httpCode = httpCode;
        this.errorCode = errorCode;
        this.timestamp = Date.now();
    }


    static success<T = object>(data: T, message = '', httpCode = 200): HttpResponse<T> {
        return new HttpResponse<T>(true, data, message, httpCode);
    }

    static error<T>(message: string, obj?: { errorData?: any; errorCode?: number; httpCode?: number }): HttpResponse<T> {
        const { errorCode = 0, httpCode = 400, errorData = null } = obj || {};
        const res = new HttpResponse<T>(false, errorData, message, httpCode, errorCode);
        return res;
    }

    static unauthorized<T>(message = 'Unauthorized'): HttpResponse<T> {
        return new HttpResponse<T>(false, null, message, 401);
    }

    static forbidden<T>(message = 'Forbidden Access'): HttpResponse<T> {
        return new HttpResponse<T>(false, null, message, 403);
    }

    static notFound<T>(message = 'Not found'): HttpResponse<T> {
        return new HttpResponse<T>(false, null, message, 404);
    }

    static serverError<T>(message = 'Internal server error'): HttpResponse<T> {
        return new HttpResponse<T>(false, null, message, 500);
    }
}
