import { server } from '../server.js';
import { RadarPostBody } from '../types/RadarPostBody.js';
import { testData } from '../utils/prepare-data.js';
import { ServerTest } from './data/server.js';

const fastifyServer = new ServerTest(server);
fastifyServer.build();

const droidData: Array<RadarPostBody[]> = testData;

describe('Radar', () => {
    describe('Given a valid radar request', () => {
        test.each(droidData)('Should return droid coordinates for case %#', async (input: RadarPostBody, output) => {
            const response = await fastifyServer.getResponse('POST', '/radar', input);

            expect(response.statusCode).toBe(200);
            expect(response.statusMessage).toBe('OK');
            expect(response.headers['content-type']).toContain('application/json');

            expect(response.json()).toEqual(output);
        });
    });
});
