import React, { useState } from "react";
import { registerWithEmail, loginWithEmail, loginWithGoogle } from "../firebase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (password.length < 6) {
      setError("⚠️ La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      await registerWithEmail(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container text-center" style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
      <h2>Welcome</h2>
      {error && <p className="text-danger font-weight-bold">{error}</p>}

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary mb-2" onClick={handleLogin}>Sign In</button>
      <button className="btn btn-secondary mb-2" onClick={handleRegister}>Register</button>
      <button className="btn btn-danger" onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default AuthForm;
