import type {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import type {Road} from "common/features/worldmap/roads/Road";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export class Dijkstra {

    vertices: WorldLocationIdentifier[];
    roads: Road[];


    constructor(roads: Road[]) {
        this.roads = roads;
        this.vertices = [];
        this.roads.forEach(road => {
            if (!this.vertices.includes(road.from)) {
                this.vertices.push(road.from);
            }
            if (!this.vertices.includes(road.to)) {
                this.vertices.push(road.to);
            }
        })


    }

    solve(source: WorldLocationIdentifier, target: WorldLocationIdentifier, withRequirements: boolean): Road[] | null {
        let Q: WorldLocationIdentifier[] = [];
        const distance: Record<WorldLocationId, number> = {} as Record<WorldLocationId, number>;
        const previous: Record<WorldLocationId, Road | null> = {} as Record<WorldLocationId, Road | null>;


        this.vertices.forEach(vertex => {
            distance[vertex.id] = Infinity;
            previous[vertex.id] = null;
            Q.push(vertex);
        })

        distance[source.id] = 0;

        while (Q.length > 0) {
            let minDist = Infinity;
            let u: WorldLocationIdentifier = Q[0];
            Q.forEach(vertex => {
                if (distance[vertex.id] < minDist) {
                    minDist = distance[vertex.id];
                    u = vertex;
                }
            })
            if (u == null) {
                console.log("wrong")
                return null;
            }

            Q = Q.filter(identifier => {
                return !identifier.equals(u);
            })


            const neighbourRoads = this.getNeighbourRoads(u, withRequirements);

            neighbourRoads.forEach(road => {
                const v = road.from.equals(u) ? road.to : road.from;
                const newLength = distance[u.id] + road.duration;
                if (newLength < distance[v.id]) {
                    distance[v.id] = newLength;
                    previous[v.id] = road;
                }
            })

        }
        if (distance[target.id] === Infinity) {
            return null
        }

        const path = [];
        let end = target;
        while (end) {
            const road = previous[end.id];
            if (!road) {
                break;
            }

            path.push(road);
            end = road.from.equals(end) ? road.to : road.from;

        }
        return path.reverse();
    }

    getNeighbourRoads(location: WorldLocationIdentifier, withRequirements: boolean): Road[] {
        const res: Road[] = [];
        this.roads.filter(road => {
            return withRequirements ? road.requirement.isCompleted : true;
        }).forEach(road => {
            if ((road.from.equals(location)) || (road.to.equals(location)) && !res.includes(road)) {
                res.push(road);
            }
        })
        return res;
    }
}
