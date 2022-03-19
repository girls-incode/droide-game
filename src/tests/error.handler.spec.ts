import { server } from '../server.js';
import { RadarPostBody } from '../types/RadarPostBody.js';
import { ServerTest } from './data/server.js';

const fastifyServer = new ServerTest(server);
fastifyServer.build();

const emptyData = {} as RadarPostBody;

describe('Given an invalid POST request', () => {
    test('Should return PAGE_NOT_FOUND error', async () => {
        const response = await fastifyServer.getResponse('POST', 'wrong', emptyData);

        expect(response.statusCode).toBe(404);
        expect(response.statusMessage).toBe('Not Found');
        expect(response.payload.includes('PAGE_NOT_FOUND')).toBe(true);
    });
});

describe('Given an invalid GET request', () => {
    test('Should return PAGE_NOT_FOUND error', async () => {
        const response = await fastifyServer.getResponse('GET', 'wrong', emptyData);

        expect(response.statusCode).toBe(404);
        expect(response.statusMessage).toBe('Not Found');
        expect(response.payload.includes('PAGE_NOT_FOUND')).toBe(true);
    });
});

describe('Given a valid radar POST request with wrong body data', () => {
    test('Should return INVALID_REQUEST_DATA error', async () => {
        const response = await fastifyServer.getResponse('POST', 'radar', emptyData);

        expect(response.statusCode).toBe(400);
        expect(response.statusMessage).toBe('Bad Request');
        expect(response.payload.includes('INVALID_REQUEST_DATA')).toBe(true);
    });
});
