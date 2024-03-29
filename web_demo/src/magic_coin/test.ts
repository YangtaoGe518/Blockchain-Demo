import Blockchain from './blockchain';
import Transaction from './transaction';
import { ecInstance } from './tools';

// Your private key goes here
const myKey = ecInstance.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const MagicCoin = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTransaction(myKey);
MagicCoin.addTransaction(tx1);

// Mine block
MagicCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
MagicCoin.addTransaction(tx2);

// Mine block
MagicCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of yangtao is ${MagicCoin.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// MagicCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', MagicCoin.isChainValid() ? 'Yes' : 'No');