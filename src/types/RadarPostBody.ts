import { Enemy } from './Enemy';
import { Protocol } from './Protocol';
import { Coordinate } from './Coordinate';

export interface RadarScan {
    coordinates: Coordinate;

    enemies: {
        type: Enemy;
        number: number;
    };

    allies?: number;
}

export interface RadarPostBody {
    protocols: Protocol[];
    scan: RadarScan[];
}
