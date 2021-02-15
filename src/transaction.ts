import crypto from 'crypto';
import { ec } from 'elliptic';
import { ecInstance } from './tools';

class Transaction {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
    timestamp: number;
    signature: string | undefined;

    constructor(fromAddress: string | null, toAddress: string, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    calculateHash(): string {
        return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp).digest('hex');
    }

    signTransaction(signingKey: ec.KeyPair) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        this.signature = sig.toDER('hex');
    }

    isValid(): boolean {
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }

        const publicKey = ecInstance.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

export default Transaction;