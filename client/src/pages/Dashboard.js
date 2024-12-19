import React, { useState, useEffect } from 'react';
import { FaWallet, FaArrowUp, FaArrowDown, FaChartLine, FaPlusCircle, FaMoneyBillWave, FaHandsHelping } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import QuoteButton from './QuoteButton';
import InvestmentAreas from './Investment';

const Dashboard = () => {
  // Dummy transaction data
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-12-01', description: 'Rent', amount: -50.00, type: 'Expense' },
    { id: 2, date: '2024-12-02', description: 'Salary', amount: 2000.00, type: 'Income' },
    { id: 3, date: '2024-12-03', description: 'AnyokaEats', amount: -30.00, type: 'Expense' },
    { id: 4, date: '2024-12-04', description: 'Freelance Project', amount: 150.00, type: 'Income' },
  ]);

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // State for handling the Add Expense form
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
    paymentMethod: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (expenseForm.date && expenseForm.description && expenseForm.category && expenseForm.amount && expenseForm.paymentMethod) {
      const newTransaction = {
        id: transactions.length + 1,
        ...expenseForm,
        amount: parseFloat(expenseForm.amount),
        type: 'Expense',
      };
      setTransactions((prev) => [...prev, newTransaction]);
      setShowExpenseForm(false); // Close form after submission
      setExpenseForm({ date: '', description: '', category: '', amount: '', paymentMethod: '' }); // Reset form
    } else {
      alert('Please fill all fields.');
    }
  };

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
          <p className="summary-value">{(totalIncome + totalExpenses).toFixed(2)} GBP</p>
        </div>
        <div className="summary-card">
          <FaArrowUp className="summary-icon" />
          <h3>Total Period Income</h3>
          <p className="summary-value">{totalIncome.toFixed(2)} GBP</p>
        </div>
        <div className="summary-card">
          <FaArrowDown className="summary-icon" />
          <h3>Total Period Expenses</h3>
          <p className="summary-value">{totalExpenses.toFixed(2)} GBP</p>
        </div>
        <div className="summary-card">
          <FaChartLine className="summary-icon" />
          <h3>Performance</h3>
          <p className="summary-value">+0.00% this month</p>
        </div>
      </div>

      {/* Quote and Investment Sections */}
      <div className="Quote">
        <QuoteButton />
        <InvestmentAreas />
      </div>

      <div className="action-buttons">
        <Link to="/expense-tracker">
          <button className="add-expense">
            <FaPlusCircle /> Add Expense
          </button>
        </Link>
        <Link to="/incomestream">
          <button className="income-source">
            <FaMoneyBillWave /> Add Income
          </button>
        </Link>
        <Link to="/budget">
          <button className="budget">
            <FaWallet /> Budget
          </button>
        </Link>
        <button className="add-wallet">
          <FaWallet /> Add Wallet
        </button>
        <button className="invest">
          <FaHandsHelping /> Invest {/* Changed icon for Invest */}
        </button>
      </div>

      {/* Add Expense Form Modal */}
      {showExpenseForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Expense</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={expenseForm.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={expenseForm.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Category:
                <select
                  name="category"
                  value={expenseForm.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Dining">Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bills">Bills</option>
                </select>
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={expenseForm.amount}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Payment Method:
                <select
                  name="paymentMethod"
                  value={expenseForm.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowExpenseForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

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
