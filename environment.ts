import dotenv from 'dotenv';
import { join } from 'path';
import { existsSync } from 'node:fs';

const modes = ['production', 'development', 'integration'];

type Mode = typeof modes[number];

interface Environment {
    mode: Mode;
    host: string;
    port: number;
}

function getEnvironment(): Environment {
    const mode: Mode = process.env.NODE_ENV ?? 'production';
    const rootDir = process.cwd();
    const envFile = join(rootDir, `.env.${mode}`);

    if (existsSync(envFile)) {
        dotenv.config({
            path: envFile,
            debug: mode === 'development',
        });
    } else {
        console.warn(`Cannot find the .env.${mode} file`);
        throw new Error('ENVIRONMENT_NOT_FOUND');
    }

    const port = process.env.PORT as string;
    if (!port) {
        console.warn(`Cannot load PORT ${mode} variable`);
    }

    const host = process.env.HOST as string;
    if (!host) {
        console.warn(`Cannot load HOST ${mode} variable`);
    }

    if (!modes.includes(mode) || !port || !host) {
        throw new Error('ENVIRONMENT_VARIABLE_NOT_FOUND');
    }

    return {
        mode,
        host,
        port: Number.parseInt(port),
    };
}

const environment: Environment = getEnvironment();

export { environment };
