import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    const income: number = this.transactions.reduce((acc, val) => {
      if (val.type === 'income') {
        return acc + val.value;
      }
      return acc;
    }, 0);

    const outcome: number = this.transactions.reduce((acc, val) => {
      if (val.type === 'outcome') {
        return acc + val.value;
      }
      return acc;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
