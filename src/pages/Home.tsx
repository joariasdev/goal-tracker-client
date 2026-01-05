import { Link } from "react-router";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>GoalTracker</h1>
        <Link to="/login" className="button-group">
          <button className="primary">Log in</button>
        </Link>
        <Link to="/register" className="button-group">
          <button className="tertiary">Register</button>
        </Link>
      </div>
    </main>
  );
}
