
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    if (!name.trim() || !email.trim() || !password) {
      setMessage("Please fill in all fields.");
      setIsError(true);
      return;
    }

    if (password.length < 8 || password.length > 72) {
      setMessage("Password must be between 8 and 72 characters.");
      setIsError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8083/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setMessage(
            "An account with this email already exists."
          );
        } else if (response.status === 400) {
          setMessage(
            "Please check your name, email, and password."
          );
        } else {
          setMessage(
            data.message || "Registration failed. Please try again."
          );
        }

        setIsError(true);
        return;
      }

      navigate("/login", {
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (error) {
      setMessage(
        "Unable to connect to the server. Please check that Auth Service is running."
      );
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Create an account</h1>

        <p className="login-subtitle">
          Join H&M to enjoy your shopping experience.
        </p>

        <form onSubmit={handleRegister}>
          <div className="login-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              maxLength={100}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              maxLength={150}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
            />
          </div>

          {message && (
            <p
              className={isError ? "login-error" : "login-success"}
              role={isError ? "alert" : "status"}
            >
              {message}
            </p>
          )}

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="login-back">
          Already a member? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
