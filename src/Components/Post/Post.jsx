import { MoreVertRounded } from "@mui/icons-material";
import "./post.css";
import { useContext, useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Post(props) {
  const post = props.post;
  const [user, setUser] = useState("");
  let [likes, setLikes] = useState(post.likes.length);
  const { user: Loggedinuser } = useContext(AuthContext);

  useEffect(() => {
    const fetch_data = async () => {
      const res = await fetch(
        `http://localhost:8800/api?userid=${post.userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setUser(result);
    };
    fetch_data();
  }, [post.userid]);

  const handleLike = async () => {
    const res = await fetch(
      `http://localhost:8800/api/posts/${post._id}/like`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: Loggedinuser._id }),
      }
    );
    const result = await res.json();
    if (result === "Post has been liked") {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };
  const PF = process.env.REACT_APP_PF
  return (
    <div className="post">
      <div className="post-top">
        <div className="post-top-left">
          <Link to={"/profile/" + user.username}>
            <img
              className="post-profile"
              src={user.profile ? PF+user.profile : PF+"noAvatar.jpeg"}
              alt=""
            />
          </Link>
          <span className="post-profile-name">{user.username}</span>
          <p className="post-profile-date">
            <TimeAgo date={`${post.createdAt}`} />
          </p>
        </div>
        <div className="post-top-right">
          <MoreVertRounded className="post-top-options" />
        </div>
      </div>
      <div className="post-center">
        <span className="post-description">{post.description}</span>
        {post.img && <img className="post-img" src={`${PF+post.img}`} alt='img...'/>}
      </div>
      <div className="post-bottom">
        <div className="post-bottom-left">
          <img
            className="post-bottom-img"
            onClick={handleLike}
            src="/assets/heart.png"
            alt=""
          />
          <img
            className="post-bottom-img"
            onClick={handleLike}
            src="/assets/like.png"
            alt=""
          />
          <span className="post-bottom-text">{likes} People like it</span>
        </div>
        <div className="post-bottom-right">
          <span className="post-bottom-text">{post.comment} comments</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
