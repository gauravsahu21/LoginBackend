import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RouteInfo } from '@nestjs/common/interfaces';
import { request } from 'http';
import logger from './loggerconnection';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Gets the request log
        logger.info(`Headers: ${JSON.stringify(req.headers)} BOdy :${JSON.stringify(req.body)}, ${req.originalUrl},`)
        console.log(`req:`, {
            headers: req.headers,
            body: req.body,
            originalUrl: req.originalUrl,
        });
        // Ends middleware function execution, hence allowing to move on 
        if (next) {
            next();
        }
    }
}