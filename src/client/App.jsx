import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/Navbar";
import AddLiquorPage from "./pages/AddLiquorPage";
import HomePage from "./pages/HomePage";
import LiquorDetailPage from "./pages/LiquorDetailPage";
import LogInPage from "./pages/LogInPage";
import MyAccountPage from "./pages/MyAccountPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className={styles.div}>
        <NavBar token={token} setToken={setToken} user={user} setUser={setUser} />
        {token ? <PrivateRoutes token={token} user={user} /> : <PublicRoutes setToken={setToken} setUser={setUser} />}
      </div>
    </BrowserRouter>
  );
}

function PublicRoutes({ setToken, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:itemId" element={<LiquorDetailPage />} />
      <Route path="/my-account" element={<Navigate replace to="/login" />} />
      <Route path="/register" element={<RegisterPage setToken={setToken} />} />
      <Route path="/login" element={<LogInPage setToken={setToken} token={undefined} setUser={setUser} />} />
    </Routes>
  );
}

function PrivateRoutes({ token, user }) {
  return (
    <Routes>
      <Route path="/login" element={<Navigate replace to="/" />} />
      <Route path="/register" element={<Navigate replace to="/" />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/:itemId" element={<LiquorDetailPage token={token} user={user} />} />
      <Route path="/my-account" element={<MyAccountPage token={token} />} />
      <Route path="/addliquor" element={<AddLiquorPage token={token} />} />
    </Routes>
  );
}
export default App;
