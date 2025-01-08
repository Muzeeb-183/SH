import React, { useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; // Import Link


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const goBack = () => navigate(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const collegeEmailRegex = /^[0-9]{5}[a-zA-Z0-9]{5}@enggcollege\.in$/;
    if (!collegeEmailRegex.test(email)) {
      setError("Please use your college email to log in.");
      return;
    }
    if (!password) {
      setError("Password cannot be empty.");
      return;
    }
    setError("");
    console.log("Login successful!");
  };

  const handleContinueWithCollegeMail = () => {
    console.log("Continue with College Mail clicked!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div
          className="text-primary text-3xl cursor-pointer absolute left-4 top-4"
          onClick={goBack}
        >
          <FaChevronCircleLeft />
        </div>
        <h2 className="text-center text-2xl font-heading text-primary mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-body text-textPrimary mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              className="block text-sm font-body text-textPrimary mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm font-body">{error}</p>
          )}
          <Link to="/explore">
          <button
            type="submit"
            className="w-full mt-4 py-2 text-white bg-hover rounded-lg font-body hover:bg-secondary focus:outline-none"
          >
            Login
          </button>
          </Link>
        </form>
        <div className="text-center my-4">
          <span className="text-sm text-gray-500">or</span>
        </div>
        <Link to="/explore">
        <button
          onClick={handleContinueWithCollegeMail}
          className="w-full py-2 text-white bg-primary rounded-lg font-body hover:bg-secondary focus:outline-none"
        >
          Continue with College Mail
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
