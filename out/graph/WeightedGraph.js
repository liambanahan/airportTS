import WeightedEdge from "./WeightedEdge.js";
export default class WeightedGraph {
    nodes;
    edges;
    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
    }
    getKeys(keys) {
        keys = (Object.keys(this.nodes));
    }
    nodeExists(testNode) {
        return this.nodes.has(testNode);
    }
    getEdgeId(node1, node2) {
        return node1 + "-" + node2;
    }
    addNode(nodeId, data) {
        this.nodes[nodeId] = data;
    }
    getNodeData(nodeId) {
        return this.nodes[nodeId];
    }
    addEdge(node1, node2, weight) {
        let edgeId = this.getEdgeId(node1, node2);
        this.edges[edgeId] = new WeightedEdge(node1, node2, weight);
    }
    removeEdge(node1, node2) {
        let edgeId = this.getEdgeId(node1, node2);
        let edge = this.edges[edgeId]; // doubt
    }
    getNeigbors(neighbors, node) {
        for (const key in Object.keys(this.edges)) {
            const index = key.indexOf("-");
            const startNode = key.substring(0, index);
            if (startNode === node) {
                const neighbor = key.substring(index + 1);
                neighbors.push(neighbor);
            }
        }
    }
    areNeighbors(node1, node2) {
        let neighbors = [];
        this.getNeigbors(neighbors, node1);
        return neighbors.includes(node2);
    }
    findPath(path, node1, node2) {
        console.log("Finding a path from " + node1 + " to " + node2 + ":\n");
        if (!this.nodeExists(node1) || (!this.nodeExists(node2))) {
            return;
        }
        path.push(node1);
        let visited = new Map();
        visited[node1] = node1;
        let i;
        while (path.length > 0) {
            let last = path[path.length - 1];
            let neighbors = [];
            this.getNeigbors(neighbors, last);
            let closestIndex = -1;
            let closestDistance = 100000.0;
            for (let i = 0; i < neighbors.length; i++) {
                let testNeighbor = neighbors[i];
                if (testNeighbor === node2) {
                    path.push(testNeighbor);
                    return;
                }
                if (!(testNeighbor in visited)) {
                    let id = this.getEdgeId(last, testNeighbor);
                    let edge = this.edges[id];
                    if (edge.getWeight < closestDistance) {
                        closestIndex = i;
                        closestDistance = edge.getWeight;
                    }
                }
            }
            if (closestIndex >= 0) {
                const closestNode = neighbors[closestIndex];
                visited[closestNode] = closestNode;
                path.push(closestNode);
            }
            else if (path.length > 0) {
                path.pop();
            }
        }
    }
}
//# sourceMappingURL=WeightedGraph.js.map