// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await API.get(
//         "/auth/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUser(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!user) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>

//       <p>
//         <strong>Name:</strong> {user.name}
//       </p>

//       <p>
//         <strong>Email:</strong> {user.email}
//       </p>
//     </div>
//   );
// }

// export default Profile;











// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../services/api";
// import "./Profile.css";

// function Profile() {
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await API.get("/auth/profile");
//       setUser(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="profile-page">

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           💰 AI Expense Tracker
//         </div>

//         <div className="nav-links">
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/profile">Profile</Link>
//           <Link to="/settings">Settings</Link>
//         </div>
//       </nav>

//       {/* Hero */}
//       <div className="profile-hero">
//         <div className="badge">
//           User Profile
//         </div>

//         <h1>Welcome, {user.name}</h1>

//         <p>
//           Manage your account details and keep
//           track of your financial journey.
//         </p>
//       </div>

//       {/* Profile Card */}
//       <div className="profile-card">

//         <div className="avatar">
//           {user.name?.charAt(0).toUpperCase()}
//         </div>

//         <h2>{user.name}</h2>

//         <p>{user.email}</p>

//         <div className="profile-info">

//           <div className="info-box">
//             <h3>Name</h3>
//             <p>{user.name}</p>
//           </div>

//           <div className="info-box">
//             <h3>Email</h3>
//             <p>{user.email}</p>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Profile;

















import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Profile.css";

function Profile() {
const [user, setUser] = useState({});
const [summary, setSummary] = useState({});

useEffect(() => {
fetchProfile();
fetchSummary();
}, []);

const fetchProfile = async () => {
try {
const res = await API.get("/auth/profile");
setUser(res.data);
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

return (
  <div className="profile-page">
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
  <div className="profile-hero">
    <div className="badge">
      User Profile
    </div>

    <h1>Welcome, {user.name}</h1>

    <p>
      Manage your account details and keep
      track of your financial journey.
    </p>
  </div>

  {/* Profile Card */}
  <div className="profile-card">

    <div className="avatar">
      {user.name?.charAt(0).toUpperCase()}
    </div>

    <h2>{user.name}</h2>

    <p>{user.email}</p>

    <div className="profile-info">

      <div className="info-box">
        <h3>Name</h3>
        <p>{user.name}</p>
      </div>

      <div className="info-box">
        <h3>Email</h3>
        <p>{user.email}</p>
      </div>

    </div>

    <div className="stats-container">

      <div className="stat-box">
        <h3>Total Expenses</h3>
        <p>₹{summary.totalExpenses || 0}</p>
      </div>

      <div className="stat-box">
        <h3>Total Transactions</h3>
        <p>{summary.totalTransactions || 0}</p>
      </div>

    </div>

  </div>

</div>


);
}

export default Profile;