import { server } from '../server.js';
import { RadarPostBody } from '../types/RadarPostBody.js';
import { ServerTest } from './data/server.js';

const fastifyServer = new ServerTest(server);
fastifyServer.build();

const emptyData = {} as RadarPostBody;

describe('Given a valid home request', () => {
    test('Should return "YVH home"', async () => {
        const response = await fastifyServer.getResponse('GET', '/', emptyData);

        expect(response.statusCode).toBe(200);
        expect(response.statusMessage).toBe('OK');
        expect(response.body).toBe('YVH home');
    });
});
