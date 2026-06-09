const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all routes
router.use(authMiddleware);


// Summary
router.get("/summary", async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const categorySummary = {};

    expenses.forEach((expense) => {
      if (categorySummary[expense.category]) {
        categorySummary[expense.category] += expense.amount;
      } else {
        categorySummary[expense.category] =
          expense.amount;
      }
    });

    res.json({
      totalTransactions: expenses.length,
      totalExpenses,
      categorySummary,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Get All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Add Expense
router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      user: req.user.id,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Update Expense
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Delete Expense
router.delete("/:id", async (req, res) => {
  try {
    const expense =
      await Expense.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;