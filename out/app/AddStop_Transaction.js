import tsTPS_Transaction from "../tps/tsTPS_Transaction";
//not used 
class AddStop_Transaction extends tsTPS_Transaction {
    code;
    tripStops;
    constructor(tripStops, code) {
        super();
        this.code = code;
        this.tripStops = tripStops;
    }
    doTransaction() {
        this.tripStops.push(this.code);
    }
    undoTransaction() {
        this.tripStops.pop();
    }
    toString() {
        return "Adding a stop:\n";
    }
}
//# sourceMappingURL=AddStop_Transaction.js.map