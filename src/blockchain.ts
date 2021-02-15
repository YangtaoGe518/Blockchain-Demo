import Block from "./block";
import Transaction from "./transaction";

class Blockchain {
    chain: Block[];
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.parse('2017-01-01'), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

}

export default Blockchain;