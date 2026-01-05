import { Link } from "react-router";

export default function Login() {
  return (
    <main>
      <div className="container">
        <h1>Welcome back!</h1>
        <form>
          <div className="input-group vertical">
            <label htmlFor="password">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="input-group vertical">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password..."
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
