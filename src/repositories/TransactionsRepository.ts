/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const totalIncome = this.transactions.reduce((total, obj) => {
      if (obj.type === 'income') return (total += obj.value);
      return total;
    }, 0);

    const totalOutcome = this.transactions.reduce((total, obj) => {
      if (obj.type === 'outcome') return (total += obj.value);
      return total;
    }, 0);

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
