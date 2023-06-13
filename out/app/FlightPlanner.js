import Airport from "./Airport.js";
import tsTPS from '../tps/tsTPS.js';
import WeightedGraph from '../graph/WeightedGraph.js';
import * as readline from "readline";
import tsTPS_Transaction from "../tps/tsTPS_Transaction.js";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class AppendStop_Transaction extends tsTPS_Transaction {
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
        return "Appending Stop:\n";
    }
}
// WE WANT TO USE THE TRANSACTION PROCESSING SYSTEM
let tps;
tps = new tsTPS();
let tpsDescription = tps.toString();
console.log("\n" + tpsDescription + "\n");
// WE WANT TO USE THE GRAPH DATA STRUCTURE
let airportGraph;
airportGraph = new WeightedGraph();
await rl.question("Where are you flying? ", (answer) => {
    console.log("\nEnjoy going to " + answer + "\n");
    let airport = new Airport(answer, 0, 0, 0, 0); // fix
    airportGraph.addNode(answer, airport);
    let addedAirport = airportGraph.getNodeData(answer);
    console.log("\nAirport Added to Graph: " + addedAirport.getCode() + "\n");
});
//# sourceMappingURL=FlightPlanner.js.map