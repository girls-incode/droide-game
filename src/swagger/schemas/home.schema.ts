export const homeSchema = {
    schema: {
        description: 'Home Page',
        tags: ['Home'],
        response: {
            200: {
                description: 'Successful Response',
                type: 'string',
            },
        },
    },
};
