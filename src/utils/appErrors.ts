import { HttpCode, AppErrorArgs } from '../interfaces/httpResponse'
export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean = true;
    public readonly statusCode : number;
    
  
    constructor(args: AppErrorArgs) {

     
      super(args.description);
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.name = args.name || 'Error';
      this.httpCode = args.httpCode;
      this.statusCode = args.statusCode || args.httpCode;
  
      if (args.isOperational !== undefined) {
        this.isOperational = args.isOperational;
      }
  
      Error.captureStackTrace(this);
    }
}