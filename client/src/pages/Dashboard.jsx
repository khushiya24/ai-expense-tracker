import { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseChart from "../components/ExpenseChart";
import { Link } from "react-router-dom";


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
    
    <div style={{ padding: "20px" }}>
      <h1>AI Expense Tracker</h1>

      {/* Dashboard */}
      <h2>Dashboard</h2>

      <div>
  <Link to="/dashboard">Dashboard</Link>

  {" | "}

  <Link to="/profile">Profile</Link>

  {" | "}

  <Link to="/settings">Settings</Link>
</div>

<hr />

      <p>
        <strong>Total Transactions:</strong>{" "}
        {summary.totalTransactions || 0}
      </p>

      <p>
        <strong>Total Expenses:</strong> ₹
        {summary.totalExpenses || 0}
      </p>

      <hr />

      {/* Pie Chart */}
      <h2>Expense Distribution</h2>

      <ExpenseChart
        categorySummary={summary.categorySummary}
      />

      <hr />

      {/* Add Expense Form */}
      <h2>Add Expense</h2>

      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Add Expense</button>
      </form>

      <hr />

      {/* Expense List */}
      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{expense.title}</h3>

            <p>
              <strong>Amount:</strong> ₹
              {expense.amount}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {expense.category}
            </p>

            <button
              onClick={() =>
                deleteExpense(expense._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
    
  );
}

export default Dashboard;