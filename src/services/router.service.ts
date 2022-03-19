import { FastifyInstance } from 'fastify';
import { errorHandler } from '../handlers/error.handler.js';
import homeHandler from '../handlers/home.handler.js';
import radarHandler from '../handlers/radar.handler.js';
import { errorSchema } from '../swagger/schemas/error.schema.js';
import { homeSchema } from '../swagger/schemas/home.schema.js';
import { radarSchema } from '../swagger/schemas/radar.schema.js';

export class RouterService {
    constructor(private fastify: FastifyInstance) {}

    setEndpoints(): void {
        this.fastify.post('/radar', { schema: radarSchema.schema, attachValidation: true }, radarHandler);
        this.fastify.get('/', homeSchema, homeHandler);
        this.fastify.post('*', errorSchema, errorHandler);
        this.fastify.get('*', errorSchema, errorHandler);
    }
}
