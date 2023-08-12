import { useContext, useRef } from "react";
import "./login.css";
import { LoginCall } from "./loginCall";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();

  const { isFetching, user, error, dispatch } = useContext(AuthContext);

  const handldeSubmit = async (e) => {
    e.preventDefault();
    LoginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const currentuser = localStorage.getItem("username");
  const fetch_user = async () => {
    if (currentuser) {
      const res = await fetch(
        `http://localhost:8800/api/?username=${currentuser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      dispatch({type: 'LoginSuccess', payload: result })
    }
  };
  fetch_user();

  return (
    <form className="login" onSubmit={handldeSubmit}>
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Social Media</h3>
          <div className="login-text">
            Connect with your friends and world around you using social media
          </div>
        </div>
        <div className="login-right">
          <div className="login-box">
            <input
              ref={email}
              type="email"
              required
              placeholder="Email"
              className="login-input"
            />
            <input
              ref={password}
              type="password"
              minLength="6"
              required
              placeholder="Password"
              className="login-input"
            />
            <button className="login-btn" type="Submit">
              Login
            </button>
            <span className="forgot-password">Forgot Password?</span>
            <Link
              to={"/registration"}
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <button className="regitration-btn">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
