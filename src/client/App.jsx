import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import MyAccountPage from "./pages/MyAccountPage";
import RegisterPage from "./pages/RegisterPage";
import AllLiquors from "./components/AllLiquors";
import LiquorDetailPage from "./pages/LiquorDetailPage";

function App() {
  const [token, setToken] = useState(0);

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
      <Route path="/" element={<Navigate replace to="/HomePage" />} />
      <Route path="/my-account" element={<Navigate replace to="/login" />} />
      <Route path="/:item_id" element={<Navigate replace to="/login" />} />
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
      <Route path="/:item_id" element={<LiquorDetailPage token={token} />} />
      <Route path="/my-account" element={<MyAccountPage token={token} />} />
    </Routes>
  );
}
export default App;
