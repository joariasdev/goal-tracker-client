import { Link } from "react-router";

export default function Register() {
  return (
    <main>
      <div className="container">
        <h1>Sign up</h1>
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
            <button className="primary">Sign up with Email</button>
          </div>
        </form>
        <p>
          Already signed up? <Link to="/login">Go to Log in</Link>
        </p>
      </div>
    </main>
  );
}
