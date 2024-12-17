const IncomeStream = require('../models/IncomeStream');
const mongoose = require('mongoose');

// 1. Create a new income stream
exports.createIncomeStream = async (req, res) => {
  try {
    const { dateReceived, source, description, account, amount, category, isRecurring, userId } = req.body;

    const newIncomeStream = new IncomeStream({
      dateReceived,
      source,
      description,
      account,
      amount,
      category,
      isRecurring,
      userId,
    });

    const savedIncome = await newIncomeStream.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    res.status(500).json({ message: 'Error saving income stream', error: err.message });
  }
};

// 2. Get all income streams for a user
exports.getIncomeStreams = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomes = await IncomeStream.find({ userId }).sort({ dateReceived: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching income streams', error: err.message });
  }
};

// 3. Update an income stream
exports.updateIncomeStream = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedIncome = await IncomeStream.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedIncome) return res.status(404).json({ message: 'Income stream not found' });
    res.status(200).json(updatedIncome);
  } catch (err) {
    res.status(500).json({ message: 'Error updating income stream', error: err.message });
  }
};

// 4. Delete an income stream
exports.deleteIncomeStream = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedIncome = await IncomeStream.findByIdAndDelete(id);
    if (!deletedIncome) return res.status(404).json({ message: 'Income stream not found' });

    res.status(200).json({ message: 'Income stream deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting income stream', error: err.message });
  }
};

// 5. Get total income for insights
exports.getTotalIncome = async (req, res) => {
  try {
    const { userId } = req.params;

    const totalIncome = await IncomeStream.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);

    res.status(200).json({ total: totalIncome[0]?.totalAmount || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating total income', error: err.message });
  }
};
