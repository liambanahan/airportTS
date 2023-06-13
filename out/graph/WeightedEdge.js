export default class WeightedEdge {
    node1;
    node2;
    weight;
    constructor(initN1, initN2, initWeight) {
        this.node1 = initN1;
        this.node2 = initN2;
        this.weight = initWeight;
    }
    get getNode1() {
        return this.node1;
    }
    get getNode2() {
        return this.node2;
    }
    get getWeight() {
        return this.weight;
    }
}
//# sourceMappingURL=WeightedEdge.js.map