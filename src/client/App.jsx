import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import AllLiquors from "./components/AllLiquors";

function App() {
  const [token, setToken] = useState(0);

  return (
    <div className="App">
      <h1>Boilerplate</h1>
      <img id="comp-img" src="./computer.png"></img>
      <p>Replace the starter code in this template with something cool</p>
      <Login />
      <AllLiquors />
      <LiquorDetails />
    </div>
  );
}

function PublicRoutes({setToken, token}) {
  <Routes>
    <Route path="/" element={Navigate replace to "/login" />} />
  </Routes>
}

export default App;


function PublicRoutes() {}

function PrivateRoutes() {}