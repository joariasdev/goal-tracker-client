import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import ApiUsersClient from "../api/apiUsersClient";
import type { UserLoginView } from "../models/User";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [loginCredential, setLoginCredentials] = useState<UserLoginView>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { updateUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await ApiUsersClient.login(loginCredential);

    if (response.status === 200) {
      updateUser(response.result);
      navigate("/goals");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredential,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <div className="container">
        <h1>Welcome back!</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group vertical">
            <label htmlFor="password">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email..."
              onChange={handleChange}
            />
          </div>
          <div className="input-group vertical">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <button className="primary">Log in</button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
