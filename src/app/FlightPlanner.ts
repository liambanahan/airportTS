import Airport from "./Airport.js"
import tsTPS from '../tps/tsTPS.js';
import WeightedGraph from '../graph/WeightedGraph.js';
import * as readline from "readline"
import tsTPS_Transaction from "../tps/tsTPS_Transaction.js";
import * as FlightData from './FlightData.json'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class AppendStop_Transaction extends tsTPS_Transaction {
    private code : string;
    private tripStops : string[];
    constructor(tripStops : string[], code : string) {
        super();
        this.code = code;
        this.tripStops = tripStops;
    }
    public doTransaction(): void {
        this.tripStops.push(this.code);
    }

    public undoTransaction(): void {
        this.tripStops.pop();
    }

    public toString(): string {
        return "Appending Stop:\n";
    }
}

// WE WANT TO USE THE TRANSACTION PROCESSING SYSTEM
let tps : tsTPS;
tps = new tsTPS();
let tpsDescription = tps.toString();
console.log("\n" + tpsDescription + "\n");

// WE WANT TO USE THE GRAPH DATA STRUCTURE
let airportGraph : WeightedGraph<Airport>;
airportGraph = new WeightedGraph();
let stops : string[] = [];

function main() {
    let keepGoing : boolean = true;
    initData();
    while (keepGoing) {
        displayAirports();
        displayCurrentTrip();
        displayMenu();
        processUserInput();
    }
    
}

function displayAirports() {
    console.log("\n\nAIRPORTS YOU CAN TRAVEL TO AND FROM:\n");
    let codes : string[];
    airportGraph.getKeys(codes);
    for (let i : number = 0; i < codes.length; i++) {
        if ((i % 10) === 0) {
            console.log("\t");
        }
        console.log(codes[i]);
        if (i < (codes.length - 1)) {
            console.log(", ");
        }
        if ((i % 10) === 9) {
            console.log("\n");
        }
    }
    console.log("\n\n");
}

function displayCurrentTrip() {
    console.log("Current Trip Stops: \n");
    for (let i : number = 0; i < stops.length; i++) {
        console.log("\t" + (i + 1) + ". " + stops[i] + "\n");
    }
    console.log("\nCurrent Trip Legs: \n");
    let legNum : number = 1;
    let tripDistance : number = 0.0;
    let legDistance : number = 0.0;
    for (let i : number = 0; i < stops.length; i++) {
        let lastStop : string;
        let nextStop : string;
        legDistance = 0.0;
        if (legNum < stops.length) {
            console.log("\t" + (i + 1) + ". ");
            lastStop = stops[legNum -1];
            nextStop = stops[legNum];
            let route : string[] =[];
            airportGraph.findPath(route, lastStop, nextStop);
            if (route.length < 2) {
                console.log("No route found from " + lastStop + " to " + nextStop + ".\n");
            }
            else {
                for (let i : number = 0; i < route.length; i++) {
                    let a1 : Airport = airportGraph.getNodeData(route[i]);
                    let a2 : Airport = airportGraph.getNodeData(route[i + 1]);
                    let distance : number = Airport.calculateDistance(a1, a2);
                    legDistance += distance;
                    if (i== 0) {
                        console.log(a1.getCode());
                    }
                    console.log("-" + a2.getCode());
                }
                console.log(" (Leg Distance: " + legDistance + " miles)\n");
            }
            legNum++;
            tripDistance += legDistance;
        }
    }
    console.log("Total Trip Distance: " + tripDistance + " miles\n\n");
}

function displayMenu() {
    console.log(
        "\nENTER A SELECTION\n\n" +
        "S) Add a stop to your trip\n" +
        "U) Undo\n" +
        "R) Redo\n" +
        "E) Empty Trip\n" +
        "Q) Quit\n"
        + "-"
    );
}

async function processUserInput() : Promise<void> {
    await this.r1.question("Enter Selection: ", async (entry : string) => {
        if (entry === "S") {
            await rl.question("Enter Airport Code", (airport : string) =>{
                if (airportGraph.nodeExists(airport)) {
                    let neighbors : string[] = [];
                    airportGraph.getNeigbors(neighbors, airport);
                    if (stops.length > 0) {
                        let lastStop : string = stops[stops.length -1];
                        if (lastStop === airport) {
                            console.log("DUPLICATE STOP ERROR - NO STOP ADDED");
                        }
                        else {
                            let transaction : AppendStop_Transaction;
                            transaction = new AppendStop_Transaction(stops, airport);
                            tps.addTransaction(transaction);
                        }
                    }
                }
                else {
                    let transaction : AppendStop_Transaction;
                    transaction = new AppendStop_Transaction(stops, airport)
                }
            });
        }
        else if (entry === "U") {
            tps.undoTransaction();
        }
        else if (entry === "R") {
            tps.doTransaction();
        }
        else if (entry === "E") {
            tps.clearAllTransactions();
        }
        else if (entry === "Q") {
            console.log("\nGOODBYE\n");
            process.exit();
        }
    });
}

await rl.question("Where are you flying? ", (answer) => {
    console.log("\nEnjoy going to " + answer + "\n");

    let airport : Airport = new Airport(answer, 0, 0, 0, 0);// fix
    airportGraph.addNode(answer, airport);
    let addedAirport : Airport = airportGraph.getNodeData(answer);
    console.log("\nAirport Added to Graph: " + addedAirport.getCode() + "\n");
});

function initData() : void {
    let airportData : any = [];
    airportData = FlightData.Airports;
    let edgesData : any = [];
    edgesData = FlightData.Edges;
}

