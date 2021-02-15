import crypto from 'crypto';

class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;

    constructor(fromAddress: string, toAddress: string, amount:number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp).digest('hex');
    }

}

export default Transaction;