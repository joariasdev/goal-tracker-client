import { Link, useLocation } from "react-router";

export default function Success() {
  const state = useLocation().state;
  return (
    <div className="container">
      <p>{state.message}</p>
      <p>
        Please log in by clicking <Link to="/login">here</Link>.{" "}
      </p>
    </div>
  );
}
