import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar"
import Videos from "../../components/videos/Videos"
import ShareVideo from "../../components/shareVideo/ShareVideo"
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import "./VideosPage.scss"

function VideosPage() {
  const { userName } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/profile-photo/${userName}`
        );
        setProfilePic(response.data);
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [userName]);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar userName={userName} profilePic={profilePic} />
        <div style={{ display: "flex" }}>
          <LeftBar userName={userName} profilePic={profilePic} />
          <div style={{ flex: 6 }}>
            <div className="home">
              <ShareVideo userName={userName} profilePic={profilePic} />
              <Videos userName={userName} />
            </div>
          </div>
          <RightBar userName={userName} profilePic={profilePic}/>
        </div>
      </div>
    );
  };

  return <Layout />;
}

export default VideosPage;
