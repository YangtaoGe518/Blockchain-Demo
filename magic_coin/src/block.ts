import crypto from 'crypto';
import Transaction from './transaction';

class Block {
    prevHash: string;
    timestamp: number;
    transactions: Transaction[];
    nonce: number;
    hash: string;

    constructor(timestamp: number, transactions: Transaction[], prevHash = '') {
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return crypto.createHash('sha256').update(this.prevHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
    }

    mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }

    hasValidTransactions(): boolean {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }

}

export default Block;