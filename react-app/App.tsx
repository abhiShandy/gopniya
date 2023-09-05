import React, { useState } from "react";
import { v4 as uuid } from "uuid";

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
};

const App = () => {
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const processTx = (transactions: string[]) => {
    const transformedTx = transactions.map((transaction) => {
      const elements = transaction.split(",");
      if (elements.length < 4) {
        return;
      }
      let date;
      if (Date.parse(elements[0]) && elements[0].length === 10) {
        date = elements[0];
      }

      let description;
      let amount;
      let balance;
      if (elements[1]) {
        description = elements[1];
        if (elements[2] && elements[2].indexOf('"') > 0) {
          description += elements[2];
          amount = elements[3];
          if (elements[4] && elements[4].indexOf('"') > 0) {
            amount += elements[4];
            balance = elements[5];
            if (elements[6] && elements[6].indexOf('"') > 0) {
              balance += elements[6];
            }
          } else {
            balance = elements[4];
            if (elements[5] && elements[5].indexOf('"') > 0) {
              balance += elements[5];
            }
          }
        } else {
          amount = elements[2];
          if (elements[3] && elements[3].indexOf('"') > 0) {
            amount += elements[3];
            balance = elements[4];
            if (elements[5] && elements[5].indexOf('"') > 0) {
              balance += elements[5];
            }
          } else {
            balance = elements[3];
            if (elements[4] && elements[4].indexOf('"') > 0) {
              balance += elements[4];
            }
          }
        }
      }
      if (date && description && amount && balance)
        return {
          id: uuid(),
          date,
          description: description.replace(/"/g, ""),
          amount: parseFloat(amount.replace(/"/g, "")),
          balance: parseFloat(balance.replace(/"/g, "")),
        };
    });

    const transactionsToShow = transformedTx.filter(
      (transaction) => transaction !== undefined
    ) as Transaction[];

    setTransactions(transactionsToShow);

    const debit = transactionsToShow
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);

    setDebit(debit);

    const credit = transactionsToShow
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => {
        console.log(transaction.amount);
        return acc + transaction.amount;
      }, 0);
    setCredit(credit);
  };

  const onFileImport: React.FormEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target ? event.target.result : "";
      if (typeof text !== "string") {
        return;
      }
      const transactions = text.split("\n");
      processTx(transactions);
    };

    if (file) reader.readAsText(file);
  };

  return (
    <>
      <h1>Upload CSV file from BofA</h1>
      <input id="file" type="file" onInput={onFileImport} />

      <h1>Summary</h1>
      <p>Credit: {credit}</p>
      <p>Debit: {debit}</p>

      <h1>Transactions ({transactions.length})</h1>
      <table>
        <tbody>
          {transactions.map((transaction, index) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;
