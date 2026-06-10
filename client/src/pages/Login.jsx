// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../services/api";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/auth/login", {
//   email,
//   password,
// });

// console.log("LOGIN RESPONSE:", res.data);

// localStorage.setItem("token", res.data.token);

// localStorage.setItem(
//   "user",
//   JSON.stringify(res.data.user)
// );

// console.log("TOKEN:", localStorage.getItem("token"));
// console.log("USER:", localStorage.getItem("user"));

// alert("Login Successful");

// navigate("/dashboard");
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "Login Failed"
//       );

//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <br /><br />

//         <button type="submit">
//           Login
//         </button>
//       </form>

//       <br />

//       <p>
//         New User? <Link to="/register">Register Here</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;













import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Sign In</h2>

        <p className="subtitle">
          Login to your account
        </p>

        <form onSubmit={handleLogin}>
          <label>Email address</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Sign In
          </button>
        </form>

        <p className="register-link">
          New User?{" "}
          <Link to="/register">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;