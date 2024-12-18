import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseTracker = ({ userId }) => {
  const [expenseData, setExpenseData] = useState({
    date: '',
    description: '',
    account: 'Cash',
    category: 'Other',
    subCategory: '',
    paymentMethod: 'Cash',
    amount: '',
    isRecurring: false,
    notes: '',
    userId: userId, // Passed as a prop
  });

  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Fetch all expenses for the user
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`/api/expenses/user/${userId}`);
      setExpenses(response.data);
      calculateTotalExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Calculate total expenses
  const calculateTotalExpenses = (expenses) => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
  };

  // Handle form submission to add a new expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/expenses', expenseData);
      alert('Expense added successfully!');
      setExpenseData({
        date: '',
        description: '',
        account: 'Cash',
        category: 'Other',
        subCategory: '',
        paymentMethod: 'Cash',
        amount: '',
        isRecurring: false,
        notes: '',
        userId: userId,
      });
      fetchExpenses(); // Refresh the expense list
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  // Delete an expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      alert('Expense deleted successfully!');
      fetchExpenses(); // Refresh the expense list
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>

      {/* Form to add new expense */}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={expenseData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          value={expenseData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <select name="account" value={expenseData.account} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
          <option value="Digital Wallet">Digital Wallet</option>
        </select>
        <select name="category" value={expenseData.category} onChange={handleChange}>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Fuel">Fuel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="subCategory"
          value={expenseData.subCategory}
          onChange={handleChange}
          placeholder="Sub-Category (optional)"
        />
        <select name="paymentMethod" value={expenseData.paymentMethod} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Mobile Payment">Mobile Payment</option>
        </select>
        <input
          type="number"
          name="amount"
          value={expenseData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <label>
          Recurring:
          <input
            type="checkbox"
            name="isRecurring"
            checked={expenseData.isRecurring}
            onChange={handleChange}
          />
        </label>
        <textarea
          name="notes"
          value={expenseData.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* Display total expenses */}
      <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>

      {/* List of expenses */}
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <p>
              {expense.date} - {expense.description} - ${expense.amount} ({expense.category})
            </p>
            <button onClick={() => handleDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
