import { environment } from '../../environment.js';
import pino from 'pino';

const isDevelop = environment.mode === 'development';

export const pinoLoggerOptions = {
    transport: {
        target: 'pino-pretty',
        options: {
            append: true,
            colorize: isDevelop ? true : false,
            destination: isDevelop ? 1 : './server.log',
            ignore: isDevelop ? 'pid,reqId,req.remoteAddress,req.remotePort,res.responseTime,responseTime' : '',
            singleLine: isDevelop ? false : true,
            translateTime: true,
        },
    },
    level: isDevelop ? 'trace' : 'error',
};

export default { logger: pino(pinoLoggerOptions) };
