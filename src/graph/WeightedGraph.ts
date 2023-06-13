import WeightedEdge from "./WeightedEdge.js";

export default class WeightedGraph<T> {
    private nodes : Map<string, T>;
    private edges : Map<string, WeightedEdge>;

    public constructor() {
        this.nodes = new Map();
        this.edges = new Map();
    }

    public getKeys(keys : Array<string>) : void {
        keys = (Object.keys(this.nodes)); 
    }

    public nodeExists(testNode : string) : boolean {
        return this.nodes.has(testNode);
    }

    public getEdgeId(node1 : string, node2 : string) : string {
        return node1 + "-" + node2;
    }
    public addNode(nodeId : string, data : T) : void {
        this.nodes[nodeId] = data;
    }

    public getNodeData(nodeId : string) : T {
        return this.nodes[nodeId];
    }

    public addEdge(node1 : string, node2 : string, weight : number) : void {
        let edgeId = this.getEdgeId(node1, node2);
        this.edges[edgeId] = new WeightedEdge(node1, node2, weight);
    }

    public removeEdge(node1 : string, node2 : string) : void {
        let edgeId = this.getEdgeId(node1, node2);
        let edge : WeightedEdge = this.edges[edgeId]; // doubt
    }

    public getNeigbors(neighbors : string[], node : string) : void {
        for (const key in Object.keys(this.edges)) {
            const index : number = key.indexOf("-");
            const startNode = key.substring(0, index);
            if (startNode === node) {
                const neighbor : string = key.substring(index + 1);
                neighbors.push(neighbor);
            }
        }
    }
    
    public areNeighbors(node1 : string, node2 : string) : boolean {
        let neighbors : string[] = [];
        this.getNeigbors(neighbors, node1);
        return neighbors.includes(node2);
    }

    public findPath(path : string[], node1: string, node2 : string) {
        console.log("Finding a path from " + node1 + " to " + node2 + ":\n");
        if (!this.nodeExists(node1) || (!this.nodeExists(node2))){
            return;
        }
        path.push(node1);
        let visited : Map<string, string> = new Map();
        visited[node1] = node1;
        let i : number;
        while (path.length > 0) {
            let last : string = path[path.length - 1];
            let neighbors : string[] = [];
            this.getNeigbors(neighbors, last);
            
            let closestIndex : number = -1;
            let closestDistance : number = 100000.0;
            for (let i : number = 0; i < neighbors.length; i++){
                let testNeighbor : string = neighbors[i];
                if (testNeighbor === node2) {
                    path.push(testNeighbor);
                    return;
                }

                if (!(testNeighbor in visited)) {
                    let id : string = this.getEdgeId(last, testNeighbor);
                    let edge : WeightedEdge = this.edges[id];
                    if (edge.getWeight < closestDistance) {
                        closestIndex = i;
                        closestDistance = edge.getWeight;
                    }
                }
            }

            if (closestIndex >= 0) {
                const closestNode : string = neighbors[closestIndex];
                visited[closestNode] = closestNode;
                path.push(closestNode);
            }
            else if (path.length > 0) {
                path.pop();
            }
        }
    }
}