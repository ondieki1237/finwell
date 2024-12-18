import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetManager.css'; // Import the CSS file

const BudgetManager = ({ userId }) => {
  const [budgets, setBudgets] = useState([]);
  const [budgetData, setBudgetData] = useState({
    totalMonthlyLimit: '',
    categoryLimits: [{ category: 'Food', limit: '' }],
    notifyWhenApproaching: true,
    notificationThreshold: 90,
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`/budget/${userId}`);
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'category' || name === 'limit') {
      const updatedLimits = [...budgetData.categoryLimits];
      updatedLimits[index][name] = name === 'limit' ? Number(value) : value;
      setBudgetData({ ...budgetData, categoryLimits: updatedLimits });
    } else {
      setBudgetData({ ...budgetData, [name]: value });
    }
  };

  const handleAddCategory = () => {
    setBudgetData({
      ...budgetData,
      categoryLimits: [...budgetData.categoryLimits, { category: '', limit: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/budget', { ...budgetData, userId });
      fetchBudgets();
      setBudgetData({
        totalMonthlyLimit: '',
        categoryLimits: [{ category: 'Food', limit: '' }],
        notifyWhenApproaching: true,
        notificationThreshold: 90,
      });
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  return (
    <div className="budget-manager-container">
      <h1 className="budget-manager-header">Budget Manager</h1>

      {/* Create Budget Form */}
      <form className="budget-manager-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="totalMonthlyLimit"
          value={budgetData.totalMonthlyLimit}
          onChange={(e) => handleChange(e)}
          placeholder="Total Monthly Limit"
          required
          className="budget-manager-input"
        />

        <h3>Category Limits</h3>
        {budgetData.categoryLimits.map((category, index) => (
          <div key={index} className="budget-manager-category-container">
            <select
              name="category"
              value={category.category}
              onChange={(e) => handleChange(e, index)}
              className="budget-manager-select"
            >
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Fuel">Fuel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              name="limit"
              value={category.limit}
              onChange={(e) => handleChange(e, index)}
              placeholder="Limit"
              required
              className="budget-manager-input"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddCategory} className="budget-manager-button-secondary">
          Add Category
        </button>

        <label>
          Notify When Approaching:
          <input
            type="checkbox"
            name="notifyWhenApproaching"
            checked={budgetData.notifyWhenApproaching}
            onChange={(e) =>
              setBudgetData({ ...budgetData, notifyWhenApproaching: e.target.checked })
            }
          />
        </label>

        <input
          type="number"
          name="notificationThreshold"
          value={budgetData.notificationThreshold}
          onChange={(e) => handleChange(e)}
          placeholder="Notification Threshold (%)"
          required
          className="budget-manager-input"
        />

        <button type="submit" className="budget-manager-button">
          Save Budget
        </button>
      </form>

      {/* List Budgets */}
      <h2>Your Budgets</h2>
      <ul className="budget-manager-budgets-list">
        {budgets.map((budget) => (
          <li key={budget._id} className="budget-manager-budget-item">
            <p>Total Limit: ${budget.totalMonthlyLimit}</p>
            <ul className="budget-manager-category-list">
              {budget.categoryLimits.map((limit, index) => (
                <li key={index} className="budget-manager-category-item">
                  {limit.category}: ${limit.limit}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetManager;
