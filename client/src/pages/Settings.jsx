// import { useNavigate } from "react-router-dom";

// function Settings() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");

//     alert("Logged Out Successfully");

//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Settings</h1>

//       <button>Change Password</button>

//       <br />
//       <br />

//       <button onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Settings;










import { Link, useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/");
  };

  return (
    <div className="settings-page">

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

      {/* Hero */}
      <div className="settings-hero">

        <div className="badge">
          Account Settings
        </div>

        <h1>Manage Your Preferences</h1>

        <p>
          Control your account settings and
          personalize your experience.
        </p>

      </div>

      {/* Settings Card */}
      <div className="settings-card">

        <div className="setting-item">
          <h3>Account Status</h3>
          <p>Active ✅</p>
        </div>

        <div className="setting-item">
          <h3>Theme</h3>
          <p>Dark Mode 🌙</p>
        </div>

        <div className="setting-item">
          <h3>Security</h3>
          <p>JWT Authentication Enabled 🔒</p>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Settings;