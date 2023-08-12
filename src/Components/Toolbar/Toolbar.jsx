import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Person, Message, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Toolbar.css";
import { AuthContext } from "../../Context/AuthContext";

function Toolbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PF
  return (
    <div className="topbar">
      <div className="topbar-right">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h3>Socail Media</h3>
        </Link>
      </div>
      <div className="topbar-center">
        <div>
          <SearchIcon className="search-icon" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search for friend, post or video"
        />
      </div>
      <div className="topbar-left">
        <div className="links">
          <span className="topbar-link">Homepage</span>
          <span className="topbar-link">TimeLine</span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item">
            <Person />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Message />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            className="profile-pic"
            src={user.profile ? PF+user.profile : PF+'noAvatar.jpeg'}
            alt="img..."
          />
        </Link>
      </div>
    </div>
  );
}

export default Toolbar;
