import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import Logger from '../utils/winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logFormat = `-----------------------------------------------------------------------
    RequestOriginal: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Params: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
    Status: ${status}
    Message: ${exception.message}
    Stack: ${exception.stack}
    -----------------------------------------------------------------------`;

    if (status >= 500) {
      Logger.error(logFormat);
    } else if (status >= 400) {
      Logger.warn(logFormat);
    }

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: exception.message,
    });
  }
}
