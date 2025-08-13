import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";
import chalk from 'chalk';


@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();

        res.on('finish',() => {
            const duration = Date.now() - startTime;
            console.log(`${chalk.blue(`[${req.method}]`)} ${chalk.green(req.originalUrl)} - ${chalk.yellow(res.statusCode)} - ${chalk.magenta(duration + 'ms')}`);
        });

        next()
    }
}