import "./profile.css";
import Toolbar from "../../Components/Toolbar/Toolbar";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import Feed from "../../Components/Feed/Feed";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

function Profile() {
  const { user: currentuser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = process.env.REACT_APP_PF;

  //Fetching friends after the user updated
  useEffect(() => {
    const fetch_data = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/friends/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.json();
        console.log(result);
        setFriends(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetch_data();
  }, [user]);

  //Getting user from username from params
  useEffect(() => {
    const fetch_data = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.json();
        setUser(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetch_data();
  }, [username]);

  //Uploading Image onto server and updating user
  useEffect(() => {
    const handleSubmit = async () => {
      console.log("hello");
      if (profile) {
        const updateuser = {
          id: user._id,
        };
        const Data = new FormData();
        Data.append("file", profile);
        try {
          let res = await fetch("http://localhost:8800/api/uploadimg", {
            method: "POST",
            body: Data,
          });
          let result = await res.json();
          updateuser.profile = result.filename;
          try {
            const response = await fetch(
              `http://localhost:8800/api/updateuser/${user._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateuser),
              }
            );
            const result = await response.json();
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setProfile(null);
    };
    handleSubmit();
  }, [profile]);

  //Setting up followed state
  useEffect(() => {
    setFollowed(currentuser.following.includes(user?._id));
  }, [currentuser, user]);

  //Handling of follow and unfollow a user
  const handleFollow = async () => {
    try {
      if (!followed) {
        const res = await fetch(
          `http://localhost:8800/api/${user._id}/follow`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: currentuser._id }),
          }
        );
        const result = await res.json();
        console.log(result);
      } else {
        const res = await fetch(
          `http://localhost:8800/api/${user._id}/unfollow`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: currentuser._id }),
          }
        );
        const result = await res.json();
        console.log(result);
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toolbar />
      <div className="homeContainer">
        <LeftSideBar className="LeftSideBar" />
        <div className="Profile">
          <div className="Profile-top">
            <img
              src={user.cover ? user.cover : "/assets/noCover.jpg"}
              className="profile-cover-img"
              alt="img..."
            />
            <label>
              <img
                htmlFor="file"
                src={user.profile ? PF + user.profile : PF + "noAvatar.jpeg"}
                className="profile-user-img"
                alt="img..."
              />
              <input
                disabled={username !== currentuser.username}
                type="file"
                id="file"
                style={{ display: "none" }}
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setProfile(e.target.files[0]);
                }}
              />
            </label>
          </div>
          <div className="Profile-bottom">
            <Feed username={username} />
            <div className="user-info">
              {username !== currentuser.username && (
                <button className="follow-btn" onClick={handleFollow}>
                  {!followed ? "Follow" : "Unfollow"}
                  {!followed ? <Add /> : <Remove />}
                </button>
              )}
              <span className="user-info-heading">User Information</span>
              <div className="user-info-item">
                <span className="user-info-item-heading">Username:</span>
                <span className="user-info-item-text">{user.username}</span>
              </div>
              <div className="user-info-item">
                <span className="user-info-item-heading">City:</span>
                <span className="user-info-item-text">Newyork</span>
              </div>
              <div className="user-info-item">
                <span className="user-info-item-heading">From:</span>
                <span className="user-info-item-text">Madrid</span>
              </div>
              <div className="user-info-item">
                <span className="user-info-item-heading">Relationship:</span>
                <span className="user-info-item-text">Single</span>
              </div>
              <div className="user-friend-list">
                <span className="user-friend-list-heading">User Friends</span>
                <div className="user-friend-list-items">
                  {friends.length
                    ? friends.map((friend) => (
                        <Link
                          to={`/profile/${friend.username}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div
                            key={friend._id}
                            className="user-friend-list-item"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              className="user-friend-list-item-img"
                              src={
                                friend.profile
                                  ? PF + friend.profile
                                  : PF + "noAvatar.jpeg"
                              }
                              alt="img..."
                            />
                            <span className="user-friend-list-item-text">
                              {friend.username}
                            </span>
                          </div>
                        </Link>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
  