import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Goals from "./pages/Goals";
import Success from "./pages/Success";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

function AppRoutes() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticationRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/success" element={<Success />}></Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/goals" element={<Goals />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function AuthenticationRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/goals" /> : <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
