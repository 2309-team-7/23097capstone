import React from "react";
import { useState } from "react";
import HomePage

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

function PublicRoutes({setToken, token}) {
  <Routes>
    <Route path="/" element={Navigate replace to "/login" />} />
  </Routes>
}

export default App;
