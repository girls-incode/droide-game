export const radarSchema = {
    schema: {
        description: 'Get droid coordinates to be attacked',
        tags: ['Radar'],
        params: {},
        body: {
            type: 'object',
            properties: {
                protocols: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                scan: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            coordinates: {
                                type: 'object',
                                properties: {
                                    x: { type: 'number' },
                                    y: { type: 'number' },
                                },
                            },
                            enemies: {
                                type: 'object',
                                properties: {
                                    type: { type: 'string' },
                                    number: { type: 'number' },
                                },
                            },
                        },
                    },
                },
            },
            required: ['protocols', 'scan'],
        },
        response: {
            200: {
                description: 'Droid coordinates',
                type: 'object',
                properties: {
                    x: { type: 'number' },
                    y: { type: 'number' },
                },
            },
        },
    },
};
