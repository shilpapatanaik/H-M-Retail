
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(event) {
    event.preventDefault();
    setMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setMessage(
      "Registration is not connected to the backend yet."
    );
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
              minLength={8}
              required
            />
          </div>

          {message && <p className="login-error">{message}</p>}

          <button className="login-button" type="submit">
            Create account
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