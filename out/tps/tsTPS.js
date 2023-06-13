export default class tsTPS {
    transactions;
    numTransactions;
    mostRecentTransaction;
    performingDo;
    performingUndo;
    constructor() {
        this.numTransactions = 0;
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }
    popTopTransaction() {
        let t = this.transactions[this.numTransactions - 1];
        this.transactions.pop();
        this.numTransactions--;
    }
    isPerformingDo() {
        return this.performingDo;
    }
    isPerformingUndo() {
        return this.performingUndo;
    }
    hasTransactionToRedo() {
        return (this.mostRecentTransaction + 1) < this.numTransactions;
    }
    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }
    getSize() {
        return this.transactions.length;
    }
    getRedoSize() {
        return (this.getSize() - this.mostRecentTransaction - 1);
    }
    getUndoSize() {
        return (this.mostRecentTransaction + 1);
    }
    addTransaction(transaction) {
        while (this.hasTransactionToRedo()) {
            this.popTopTransaction();
        }
        this.numTransactions++;
        this.doTransaction();
    }
    doTransaction() {
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            let transaction = this.transactions[this.mostRecentTransaction + 1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }
    undoTransaction() {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }
    clearAllTransactions() {
        for (let i = this.numTransactions - 1; i >= 0; i--) {
            this.popTopTransaction();
        }
        this.mostRecentTransaction = -1;
    }
    toString() {
        let out = "--Number of Transactions: " + this.numTransactions + "\n" +
            "--Current Index on Stack: " + this.mostRecentTransaction + "\n" +
            "--Current Transaction Stack\n";
        for (let i = 0; i <= this.mostRecentTransaction; i++) {
            let tsT = this.transactions[i];
            out += "----" + tsT.toString() + "\n";
        }
        return out;
    }
}
;
//# sourceMappingURL=tsTPS.js.map