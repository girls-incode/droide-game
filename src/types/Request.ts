import { FastifyRequest } from 'fastify';
import { RadarPostBody } from './RadarPostBody';

export type Request = FastifyRequest<{
    Params?: unknown;
    Body?: RadarPostBody;
}>;
