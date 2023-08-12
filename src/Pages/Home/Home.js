import React from "react";
import Toolbar from "../../Components/Toolbar/Toolbar";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import Feed from "../../Components/Feed/Feed";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import './Home.css' 

function Home() {
  return(
    <>
      <Toolbar/>
      <div className="homeContainer">
        <LeftSideBar/>
        <Feed/>
        <RightSideBar/>
      </div>
    </>
  ); 
}

export default Home;
