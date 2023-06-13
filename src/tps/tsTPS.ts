import tsTPS_Transaction from "./tsTPS_Transaction.js";

export default class tsTPS {
    private transactions : Array<tsTPS_Transaction>;
    private numTransactions : number;
    private mostRecentTransaction : number;
    private performingDo : boolean;
    private performingUndo : boolean;

    public constructor() {
        this.numTransactions = 0;
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }

    private popTopTransaction() {
        let t :tsTPS_Transaction = this.transactions[this.numTransactions -1];
        this.transactions.pop();
        this.numTransactions--;
    }

    public isPerformingDo() : boolean {
            return this.performingDo;
    }
    
    public isPerformingUndo() : boolean {
            return this.performingUndo;
    }
    
    public hasTransactionToRedo() : boolean {
            return (this.mostRecentTransaction + 1) < this.numTransactions;
    }
    
    public hasTransactionToUndo() : boolean {
            return this.mostRecentTransaction >= 0;
    }
    
    public getSize() : number {
            return this.transactions.length;
    }
    
    public getRedoSize() : number {
            return (this.getSize() - this.mostRecentTransaction - 1);
    }
    
    public getUndoSize() : number {
            return (this.mostRecentTransaction + 1);
    }
    
    public addTransaction(transaction : tsTPS_Transaction) : void {
        while (this.hasTransactionToRedo()) {
                this.popTopTransaction();
        }
        this.numTransactions++;
        this.doTransaction();
    }
    
    public doTransaction() : void {
        if (this.hasTransactionToRedo()) {
                this.performingDo = true;
                let transaction : tsTPS_Transaction = this.transactions[this.mostRecentTransaction + 1];
                transaction.doTransaction();
                this.mostRecentTransaction++;
                this.performingDo = false;
        }
    }
    
    public undoTransaction() : void {
        if (this.hasTransactionToUndo()) {
                this.performingUndo = true;
                let transaction : tsTPS_Transaction = this.transactions[this.mostRecentTransaction];
                transaction.undoTransaction();
                this.mostRecentTransaction--;
                this.performingUndo = false;
        }
    }
    
    public clearAllTransactions() : void {
        for (let i : number = this.numTransactions - 1; i >=0; i--) {
                this. popTopTransaction();
        }
        this.mostRecentTransaction = -1;
    }
    
    public toString() : string {
        let out : string = 
        "--Number of Transactions: " + this.numTransactions + "\n" +
        "--Current Index on Stack: " + this.mostRecentTransaction + "\n" +
        "--Current Transaction Stack\n";
        for (let i : number = 0; i <= this.mostRecentTransaction; i++) {
                let tsT : tsTPS_Transaction = this.transactions[i];
                out += "----" + tsT.toString() + "\n";
        }
        return out;
    }
};