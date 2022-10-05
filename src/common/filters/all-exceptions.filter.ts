import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import Logger from '../utils/winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception ? `${exception['message']}` : '';
    const stack = exception ? `${exception['stack']}` : '';

    const logFormat = `
    RequestOriginal: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Params: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
    Status: ${status}
    Message: ${message}
    Stack: ${stack}`;

    if (status >= 500) {
      Logger.error(logFormat);
    } else if (status >= 400) {
      Logger.warn(logFormat);
    }

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: req.url,
      message,
    });
  }
}
