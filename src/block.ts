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

    calculateHash() : string {
        return crypto.createHash('sha256').update(this.prevHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
      }

}

export default Block;