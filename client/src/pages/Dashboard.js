import React from 'react';
import { FaWallet, FaArrowUp, FaArrowDown, FaChartLine, FaPlusCircle, FaAccusoft } from 'react-icons/fa';
import './Dashboard.css';
import QuoteButton from './QuoteButton';

const Dashboard = () => {
  // Dummy transaction data
  const transactions = [
    { id: 1, date: '2024-12-01', description: 'Rent', amount: -50.00, type: 'Expense' },
    { id: 2, date: '2024-12-02', description: 'Salary', amount: 2000.00, type: 'Income' },
    { id: 3, date: '2024-12-03', description: 'AnyokaEats', amount: -30.00, type: 'Expense' },
    { id: 4, date: '2024-12-04', description: 'Freelance Project', amount: 150.00, type: 'Income' },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome to FinWell</h2>
        <p>Track your expenses and manage your finances effectively.</p>
      </header>

      <div className="dashboard-summary">
        <div className="summary-card">
          <FaWallet className="summary-icon" />
          <h3>Total Balance</h3>
          <p className="summary-value">0.00 GBP</p>
        </div>
        <div className="summary-card">
          <FaArrowUp className="summary-icon" />
          <h3>Total Period Income</h3>
          <p className="summary-value">0.00 GBP</p>
        </div>
        <div className="summary-card">
          <FaArrowDown className="summary-icon" />
          <h3>Total Period Expenses</h3>
          <p className="summary-value">0.00 GBP</p>
        </div>
        <div className="summary-card">
          <FaChartLine className="summary-icon" />
          <h3>Performance</h3>
          <p className="summary-value">+0.00% this month</p>
        </div>
      </div>

      {/* this is the quote section */}
      
      <div className="Quote"></div>
       <QuoteButton />
      <div/>

      <div className="action-buttons">
        <button className="add-expense">
          <FaPlusCircle /> Add Expense
        </button>
        <button className="add-wallet">
          <FaWallet /> Add Wallet
        </button>
                <button className="invest">
          <FaWallet /> Invest
        </button>
      </div>

      <div className="transactions">
        <h3>Your Transactions</h3>
        {transactions.length === 0 ? (
          <p>You have no transactions.</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td className={transaction.type === 'Income' ? 'income' : 'expense'}>
                    {transaction.amount.toFixed(2)} GBP
                  </td>
                  <td>{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
