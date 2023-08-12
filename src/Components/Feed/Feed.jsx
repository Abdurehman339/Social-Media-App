import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { AuthContext } from '../../Context/AuthContext'

function Feed(props) {
  const [post, setPost] = useState([]);
  const {user} = useContext(AuthContext)
  useEffect(() => {
    const fetch_data = async () => {
      const res = await fetch(
        props.username
          ? `http://localhost:8800/api/posts/profile/${props.username}`
          : `http://localhost:8800/api/posts/timeline/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setPost(result);
    };
    fetch_data();
  }, [props]);
  return (
    <div className="feed">
      {props.username? user.username===props.username && <Share /> : <Share /> }
      {post.map((e) => {
        return <Post key={e._id} post={e} />;
      })}
    </div>
  );
}

export default Feed;
