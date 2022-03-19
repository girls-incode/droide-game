export const errorSchema = {
    schema: {
        description: 'Error page',
        tags: ['Error'],
        params: {},
        body: {
            properties: {
                obj: {
                    type: 'object',
                    properties: {},
                },
            },
        },
        response: {
            200: {
                description: 'UNSUPPORTED_REQUEST',
                type: 'object',
                properties: {
                    Error: { type: 'string' },
                },
            },
            default: {
                description: 'ERROR',
                type: 'object',
                properties: {
                    Error: { type: 'string' },
                },
            },
        },
    },
};
