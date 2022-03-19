import { FastifyReply } from 'fastify';
import { Request } from '../types/Request';

export default async function (req: Request, reply: FastifyReply): Promise<void> {
    reply.send('YVH home');
}
