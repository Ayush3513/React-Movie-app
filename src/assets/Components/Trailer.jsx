import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Notfound from "./Notfound"

const Trailer = () => {
  document.title = "Trailer"
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const videos = useSelector((state) => state[category].info.videos);

  return (
    <div className="fixed bg-[rgba(0,0,0,.8)] top-0 left-0 h-screen w-full flex items-center justify-center">
      
      {videos ? (<div className="relative">
        <i
        onClick={() => navigate(-1)}
        className="ri-close-fill text-3xl fixed z-[10] text-white  right-[8%] top-[8%]"
      ></i>
        <ReactPlayer
        height={"70vh"}
        width={"70vw"}
        url={`https://www.youtube.com/watch?v=${videos.key}`}
      />
      </div>
      ):<Notfound />}
    </div>
  );
};

export default Trailer;
