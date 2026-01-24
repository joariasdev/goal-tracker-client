import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Goals from "./pages/Goals";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/goals" element={<Goals />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
