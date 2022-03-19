export const swagger = {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Droid App OpenAPI',
            description: 'Swagger for app endpoints',
            version: '0.1.0',
        },
        host: 'localhost:8888',
        consumes: ['application/json'],
        produces: ['application/json'],
        paths: {},
    },
    exposeRoute: true,
};
