export default class WeightedEdge {
    private node1 : string;
    private node2 : string;
    private weight : number;
    
    public constructor(initN1 : string, initN2 : string,
        initWeight : number) {
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