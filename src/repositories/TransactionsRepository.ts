import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance : Balance = {income: 0, outcome:0, total:0 };
    const tot = (acc:number, trans:CreateTransactionDTO) => {
      if(trans.type ==='income')
        return acc + trans.value
      return acc - trans.value
    }
    const inc = (acc:number, trans:CreateTransactionDTO) => {
      if(trans.type ==='income')
        return acc + trans.value
      return acc 
    }
    const out = (acc:number, trans:CreateTransactionDTO) => {
      if(trans.type ==='outcome')
        return acc + trans.value
      return acc 
    }
    balance.income = this.transactions.reduce(inc,0);
    balance.outcome = this.transactions.reduce(out,0);
    balance.total = this.transactions.reduce(tot,0);

    return balance;
  }

  public create( {title , value, type } :CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
