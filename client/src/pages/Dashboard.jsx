import { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseChart from "../components/ExpenseChart";
import { Link, useNavigate } from "react-router-dom";import "./Dashboard.css";
import { CSVLink } from "react-csv";


function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
const [filterCategory, setFilterCategory] =
  useState("");

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
  const filteredExpenses =
  expenses.filter((expense) => {

    const matchesSearch =
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === ""
        ? true
        : expense.category === filterCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
});
const csvData = expenses.map((expense) => ({
  Title: expense.title,
  Category: expense.category,
  Amount: expense.amount,
  Date: new Date(
    expense.date
  ).toLocaleDateString(),
}));

  const fetchSummary = async () => {
    try {
      const res = await API.get("/expenses/summary");
      setSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};

  const addExpense = async (e) => {
  e.preventDefault();

  if (!title || !amount || !category) {
    alert("Please fill all fields");
    return;
  }

  try {
    if (window.editId) {
      await API.put(
        `/expenses/${window.editId}`,
        {
          title,
          amount: Number(amount),
          category,
        }
      );

      window.editId = null;
    } else {
      await API.post("/expenses", {
        title,
        amount: Number(amount),
        category,
      });
    }

    setTitle("");
    setAmount("");
    setCategory("");

    fetchExpenses();
    fetchSummary();

  } catch (error) {
    console.error(error);
  }
};
 

  const user =
  JSON.parse(localStorage.getItem("user"));

const userName = user?.name || "User";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
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

  <button
  className="logout-link"
  onClick={logout}
>
  Logout
</button>
</div>
    </nav>

    {/* Hero Section */}
    <div className="hero">
  <div className="badge">
    AI Powered Expense Management
  </div>

 <h1>
  {getGreeting()}, {userName} 👋
</h1>

  <p>
    Manage your expenses smarter with AI
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

      <div className="section-card">
  <h2>AI Insights 🤖</h2>

  <p>
    {summary.categorySummary &&
    Object.keys(summary.categorySummary)
      .length > 0
      ? `You spent most of your money on ${
          Object.entries(
            summary.categorySummary
          ).sort(
            (a, b) => b[1] - a[1]
          )[0][0]
        } this month.`
      : "Add expenses to generate insights."}
  </p>
</div>

      <ExpenseChart
        categorySummary={summary.categorySummary}
      />
    </div>
    <div className="section-card">
  <h2>Budget Alert 🚨</h2>

  {summary.totalExpenses > 10000 ? (
    <p style={{ color: "#ef4444" }}>
      Warning! You crossed your ₹10,000 monthly budget.
    </p>
  ) : (
    <p style={{ color: "#22c55e" }}>
      Great! You are within your budget.
    </p>
  )}
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

        <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
  <option value="">
    Select Category
  </option>

  <option value="Food">
    Food
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Bills">
    Bills
  </option>

  <option value="Entertainment">
    Entertainment
  </option>
</select>
        <button type="submit">
          Add Expense
        </button>
      </form>
    </div>
    <div className="expense-filters">

  <input
    type="text"
    placeholder="Search Expense..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

  <select
    value={filterCategory}
    onChange={(e) =>
      setFilterCategory(e.target.value)
    }
  >
    <option value="">All Categories</option>
    <option value="Food">Food</option>
    <option value="Travel">Travel</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
    <option value="Entertainment">
      Entertainment
    </option>
  </select>

</div>
<CSVLink
  data={csvData}
  filename={"expenses.csv"}
  className="export-btn"
>
  Export CSV
</CSVLink>

    {/* Expense List */}
    <div className="section-card">
      <h2>Recent Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table className="expense-table">


  <thead>
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Amount</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>

    {filteredExpenses.map((expense) => (
      <tr key={expense._id}>

        <td>{expense.title}</td>

        <td>{expense.category}</td>

        <td>₹{expense.amount}</td>

        <td>
          <button
  className="edit-btn"
  onClick={() => {

    setTitle(expense.title);

    setAmount(expense.amount);

    setCategory(expense.category);

    window.editId = expense._id;
  }}
>
  Edit
</button>
          <button
            className="delete-btn"
            onClick={() =>
              deleteExpense(expense._id)
            }
            
          >
            Delete
          </button>
        </td>

      </tr>
    ))}

  </tbody>

</table>
      )}
    </div>

  </div>
);
}

export default Dashboard;
