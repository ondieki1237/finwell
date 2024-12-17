import React, { useState } from 'react';

const AddExpense = () => {
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense Added:', expense);
    setExpense({ amount: '', category: '', date: '' });
  };

  return (
    <div className="add-expense">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
