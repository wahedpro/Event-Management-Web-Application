import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const loginData = { email, password };

    console.log(loginData);
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
      <p>Do not have an account? <NavLink to="/register">Register Now</NavLink></p>
    </div>
  );
};

export default LoginPage;
