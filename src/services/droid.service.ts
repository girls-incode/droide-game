import { Coordinate } from '../types/Coordinate.js';
import { Enemy } from '../types/Enemy.js';
import { Protocol } from '../types/Protocol.js';
import { RadarPostBody, RadarScan } from '../types/RadarPostBody.js';
import { Helper } from './helper.service.js';

type ProtocolFunction = (radarScan: RadarScan) => boolean;

/**
 * Service that finds the next enemy coordinates
 */
export default class DroidService {
    private protocols: Protocol[];
    private radarScans: RadarScan[];

    private protocolRules: Record<Protocol | string, ProtocolFunction> = {
        [Protocol.AssitAllies]: (radarScan: RadarScan): boolean => radarScan.allies !== undefined,
        [Protocol.AvoidCrossfire]: (radarScan: RadarScan): boolean => radarScan.allies === undefined,
        [Protocol.AvoidMech]: (radarScan: RadarScan): boolean => radarScan.enemies.type !== Enemy.Mech,
        [Protocol.PriotizeMech]: (radarScan: RadarScan): boolean => radarScan.enemies.type === Enemy.Mech,
    };
    private filterProtocols = [Protocol.ClosestEnemies, Protocol.FurthestEnemies];
    private defaultProtocol = Protocol.ClosestEnemies;

    constructor(radarBody: RadarPostBody) {
        this.protocols = radarBody.protocols;
        this.radarScans = radarBody.scan;
    }

    /**
     * Filter radar coordinates based on protocol rules
     * @returns {Coordinate}
     */
    public getNextTargetCoordinates(): Coordinate {
        let classifierProtocol = this.defaultProtocol;

        this.protocols.forEach((protocol: Protocol) => {
            const isClassifier = this.filterProtocols.includes(protocol);
            if (isClassifier) {
                classifierProtocol = protocol;
            } else {
                const filteredScans = this.radarScans.filter(this.protocolRules[protocol]);
                if (filteredScans.length) {
                    this.radarScans = filteredScans;
                }
            }
        });
        return this.getEnemyCoordinates(classifierProtocol);
    }

    /**
     * Filter radar coordinates based on the Furthest and Closest Enemies protocols
     * @param {protocol}
     * @returns {Coordinate}
     */
    private getEnemyCoordinates(protocol: Protocol): Coordinate {
        const intialCoordinates = protocol === Protocol.FurthestEnemies ? { x: 0, y: 0 } : { x: 100, y: 100 };

        return this.radarScans.reduce((enemyCoordinates: Coordinate, radarScan: RadarScan) => {
            const currentPointDistance = Helper.getPointsDistance(radarScan.coordinates);

            if (radarScan.enemies.number <= 0 || currentPointDistance > 100) {
                return enemyCoordinates;
            }

            const previousPointDistance = Helper.getPointsDistance(enemyCoordinates);

            if (
                (protocol === Protocol.FurthestEnemies && currentPointDistance > previousPointDistance) ||
                (protocol === Protocol.ClosestEnemies && currentPointDistance < previousPointDistance)
            )
                return radarScan.coordinates;

            return enemyCoordinates;
        }, intialCoordinates);
    }
}
