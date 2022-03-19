import { FastifyReply } from 'fastify';
import DroidService from '../services/droid.service.js';
import { Request } from '../types/Request.js';

export default async function (req: Request, reply: FastifyReply): Promise<void> {
    if (req.validationError) {
        throw new Error('INVALID_REQUEST_DATA');
    }
    if (req.body) {
        const droidService = new DroidService(req.body);
        const targetCoordinates = droidService.getNextTargetCoordinates();
        reply.send({ x: targetCoordinates.x, y: targetCoordinates.y });
    }
}
