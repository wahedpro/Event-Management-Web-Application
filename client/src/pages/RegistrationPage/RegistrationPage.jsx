
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  const photoURL = event.target.photoURL.value;

  const userData = { name, email, password, photoURL };

  // Fetch request to backend
  fetch("https://server-sable-sigma.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server response:", data);
      if (data.insertedId) {
        // Success
        navigate("/login");
      } else {
        // Failure
        setError("Registration failed. Please try again.");
      }
    })
    .catch((err) => {
      console.error(err);
      setError("Something went wrong.");
    });
};

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
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
        <div>
          <label className="block mb-1 font-semibold">Photo URL</label>
          <input
            name="photoURL"
            type="text"
            placeholder="https://..."
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
