import { Link, useNavigate } from "react-router-dom";
import "./registration.css";
import { useRef } from "react";

function Registration() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value === confirmpassword.current.value) {
      try {
        //turning username into lowercase
        const username_lowercase = username.current.value.toLowerCase();
        //Api call
        const res = await fetch("http://localhost:8800/api/user/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username_lowercase,
            email: email.current.value,
            password: password.current.value,
          }),
        });
        Navigate('/login')
      } catch (error) {
        console.log(error)
      }
    } else {
      confirmpassword.current.setCustomValidity('Passwords don\'t match!')
    }
  };
  return (
    <form className="registration" onSubmit={handleSubmit}>
      <div className="registration-wrapper">
        <div className="registration-right">
          <h3 className="registration-logo">Social Media</h3>
          <div className="registration-text">
            Connect with your friends and world around you using social media
          </div>
        </div>
        <div className="registration-left">
          <div className="registration-box">
            <input
              type="username"
              ref={username}
              required
              placeholder="Username"
              className="registration-input"
            />
            <input
              type="email"
              ref={email}
              required
              placeholder="Email"
              className="registration-input"
            />
            <input
              type="password"
              ref={password}
              minLength="6"
              required
              placeholder="Password"
              className="registration-input"
            />
            <input
              type="password"
              ref={confirmpassword}
              minLength="6"
              required
              placeholder="Confirm Password"
              className="registration-input"
            />
            <button type="submit" className="signup-button">
              Sign Up
            </button>
            <Link
              to={"/login"}
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <button className="login-button">Log into Account</button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Registration;
