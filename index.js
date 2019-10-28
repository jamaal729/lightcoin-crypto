class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      balance += this.transactions[i].value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.date = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      console.log("This transaction is not allowed!");
      return false;
    }
  }

}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    console.log(this.amount <= this.account.balance);
    return this.amount <= this.account.balance ? true : false;
  }

}


const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Withdrawal(71.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
