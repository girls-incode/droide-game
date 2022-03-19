export default {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    testEnvironment: 'jest-environment-node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    modulePathIgnorePatterns: ['dist'],
    transform: {},
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    collectCoverageFrom: ['src/**', '!src/tests/**', '!src/swagger/**', '!node_modules', '!dist'],
};
