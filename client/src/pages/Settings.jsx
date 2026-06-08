import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/");
  };

  return (
    <div>
      <h1>Settings</h1>

      <button>Change Password</button>

      <br />
      <br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Settings;