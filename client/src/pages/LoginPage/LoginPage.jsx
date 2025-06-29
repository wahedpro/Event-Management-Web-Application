import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    const loginData = { email, password };
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
    } else {
      login(data.user);
      navigate("/myevents");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Login
        </button>
      </form>
      <p className="text-center py-5">
        Do not have an account?{" "}
        <NavLink to="/register" className="text-blue-400">
          Register Now
        </NavLink>
      </p>
    </div>
  );
};

export default LoginPage;
