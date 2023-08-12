import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Registration from "./Pages/Registration/Registration";
import { AuthContext } from "./Context/AuthContext";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
          <Route path="/profile/:username" element={<Profile />}></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/registration"
            element={user ? <Navigate to="/" /> : <Registration />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
