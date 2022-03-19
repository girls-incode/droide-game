import { FastifyInstance, HTTPMethods } from 'fastify';
import LightMyRequest from 'light-my-request';
import { RadarPostBody } from '../../types/RadarPostBody';

export class ServerTest {
    server: FastifyInstance;

    constructor(server: FastifyInstance) {
        this.server = server;
    }

    /**
     * Automatically build and tear down the server instance
     * @return void
     */
    build(): void {
        beforeAll(async () => {
            await this.server.ready();
        });

        afterAll(() => this.server.close());
    }

    /**
     * Wrapper to call the fastify injection to avoid duplication.
     * @param method HTTPMethods
     * @param endpoint string
     * @param payload any
     * @return Promise<LightMyRequest.Response>
     */
    async getResponse(method: HTTPMethods, endpoint: string, payload: RadarPostBody): Promise<LightMyRequest.Response> {
        return this.server.inject({
            method: method,
            url: endpoint,
            payload: payload,
        });
    }
}
