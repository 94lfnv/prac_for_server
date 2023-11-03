import React, { useState, useEffect } from "react";
import Axios from "axios";

const SideVideo = () => {
  const [sideVideos, setSideVideos] = useState([]);
  useEffect(() => {
    Axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        setSideVideos(res.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
  }, []);

  const renderSideVideo = sideVideos.map((video, idx) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div
        key={`${idx}_sideVideo`}
        style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
      >
        <div
          style={{ width: "40%", marginBottom: "1rem", marginRight: "1rem" }}
        >
          <a href="">
            <img
              style={{ width: "100%", height: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="side_video_thumbnail"
            />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href="" style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });
  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }}>{renderSideVideo}</div>
    </React.Fragment>
  );
};

export default SideVideo;
