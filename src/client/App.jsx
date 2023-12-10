import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LiquorDetailPage from "./pages/LiquorDetailPage";
import LogInPage from "./pages/LogInPage";
import MyAccountPage from "./pages/MyAccountPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [token, setToken] = useState();

  return (
    <BrowserRouter>
      <div className={styles.div}>
        <NavBar token={token} setToken={setToken} />

        {token ? (
          <PrivateRoutes token={token} />
        ) : (
          <PublicRoutes setToken={setToken} token={token} />
        )}
      </div>
    </BrowserRouter>
  );
}

function PublicRoutes({ setToken, token }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<LiquorDetailPage />} />
      <Route path="/my-account" element={<Navigate replace to="/login" />} />
      <Route path="/register" element={<RegisterPage setToken={setToken} />} />
      <Route
        path="/login"
        element={<LogInPage setToken={setToken} token={undefined} />}
      />
    </Routes>
  );
}

function PrivateRoutes({ token }) {
  return (
    <Routes>
      <Route path="/login" element={<Navigate replace to="/" />} />
      <Route path="/register" element={<Navigate replace to="/" />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/:itemId" element={<LiquorDetailPage token={token} />} />
      <Route path="/my-account" element={<MyAccountPage token={token} />} />
    </Routes>
  );
}
export default App;
