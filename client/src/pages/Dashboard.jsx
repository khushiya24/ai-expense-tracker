import { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseChart from "../components/ExpenseChart";
import { Link } from "react-router-dom";
import "./Dashboard.css";


function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await API.get("/expenses/summary");
      setSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/expenses", {
        title,
        amount: Number(amount),
        category:
          category.charAt(0).toUpperCase() +
          category.slice(1).toLowerCase(),
      });

      setTitle("");
      setAmount("");
      setCategory("");

      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);

      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
    }
  };


    
    return (
  <div className="dashboard">

    {/* Navbar */}
    <nav className="navbar">
      <div className="logo">
        💰 AI Expense Tracker
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>

    {/* Hero Section */}
    <div className="hero">
      <div className="badge">
        AI Powered Expense Management
      </div>

      <h1>Track Expenses Smarter</h1>

      <p>
        Monitor your spending, analyze trends,
        and manage your finances efficiently.
      </p>
    </div>

    {/* Summary Cards */}
    <div className="cards">

      <div className="card">
        <h3>Total Transactions</h3>
        <p>{summary.totalTransactions || 0}</p>
      </div>

      <div className="card">
        <h3>Total Expenses</h3>
        <p>₹{summary.totalExpenses || 0}</p>
      </div>

    </div>

    {/* Chart */}
    <div className="section-card">
      <h2>Expense Distribution</h2>

      <ExpenseChart
        categorySummary={summary.categorySummary}
      />
    </div>

    {/* Add Expense */}
    <div className="section-card">
      <h2>Add Expense</h2>

      <form
        className="expense-form"
        onSubmit={addExpense}
      >
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <button type="submit">
          Add Expense
        </button>
      </form>
    </div>

    {/* Expense List */}
    <div className="section-card">
      <h2>Recent Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense._id}
            className="expense-item"
          >
            <div>
              <h3>{expense.title}</h3>

              <p>{expense.category}</p>
            </div>

            <div className="expense-right">
              <h3>₹{expense.amount}</h3>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteExpense(expense._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

  </div>
);
}

export default Dashboard;
