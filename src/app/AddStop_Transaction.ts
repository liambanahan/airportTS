import tsTPS_Transaction from "../tps/tsTPS_Transaction";

//not used 

class AddStop_Transaction extends tsTPS_Transaction {
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
        return "Adding a stop:\n";
    }
}