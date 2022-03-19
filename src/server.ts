import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { ErrorsService } from './services/error.service.js';
import { RouterService } from './services/router.service.js';
import { swagger } from './swagger/swagger.js';
import logger from './utils/logger.js';

const server = fastify(logger);
const errors = new ErrorsService(server);
const routes = new RouterService(server);

server.register(fastifySwagger, swagger);
errors.setHandler();
routes.setEndpoints();

server.listen(8888, '0.0.0.0', (err: Error | null, address: string) => {
    if (err) {
        server.log.error('\nError starting server:\n', err);
        process.exit(1);
    }
    server.log.info(`\nServer listening on: ${address}\n`);
});

export { server };
