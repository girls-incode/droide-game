import { FastifyError, FastifyInstance, FastifyReply } from 'fastify';
import { Request } from '../types/Request.js';

export class ErrorsService {
    constructor(private fastify: FastifyInstance) {}

    /**
     * Sets fastify's errors handler
     * @return void
     */
    setHandler(): void {
        this.fastify.setErrorHandler(function (error: FastifyError, request: Request, reply: FastifyReply) {
            let code = error?.statusCode || 500;

            switch (error.message) {
                case 'INVALID_REQUEST_DATA':
                    code = 400;
                    break;
                case 'PAGE_NOT_FOUND':
                    code = 404;
                    break;
            }

            this.log.error(request, error.message);
            reply.code(code).send(error.message);
        });
    }
}
