import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router";
import type { UserLoginView } from "../models/User";
import useAuthClient from "../hooks/useAuthClient";
import { useNavigate } from "react-router";

type errorProps = {
  code: string;
  message: string;
} | null;

export default function Login() {
  const [loginCredential, setLoginCredentials] = useState<UserLoginView>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<errorProps>(null);

  const navigate = useNavigate();
  const { login } = useAuthClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await login(loginCredential);

    // TODO: Might not want to show the error message from the server
    if (response.error) {
      setError(response.error);
    }

    console.log(response);

    setError(null);
    navigate("/goals");
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
          {error && (
            <div>
              <span>{error?.message}</span>
            </div>
          )}
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
