import { Coordinate } from '../types/Coordinate';
import fs from 'fs';
import readline from 'readline';
import { RadarPostBody } from '../types/RadarPostBody';

export class Helper {
    /**
     * Returns the Euclidian distance between two points: (x, y) and (0,0)
     * @param coordinates object
     * @returns number
     */
    static getPointsDistance(coordinates: Coordinate): number {
        return Math.hypot(coordinates.x, coordinates.y);
    }

    /**
     * Load acceptance test cases from a file
     * @param file string
     * @returns mapped data
     */
    static async getTestData(file: string): Promise<Array<RadarPostBody[]>> {
        const fileStream = fs.createReadStream(file);
        const caseData: Array<RadarPostBody[]> = [];

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            const [input, output] = line.trim().split('|');
            caseData.push([JSON.parse(input), JSON.parse(output)]);
        }

        return caseData;
    }
}
