import { Link, Navigate, useLocation } from "react-router";

export default function Success() {
  const state = useLocation().state;

  if (!state) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <p>{state.message}</p>
      <p>
        Please log in by clicking <Link to="/login">here</Link>.{" "}
      </p>
    </div>
  );
}
