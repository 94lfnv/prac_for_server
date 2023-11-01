import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data, "???");
        setVideoData(res.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
  }, []);
  const renderCards = [];
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row gutter={[32, 16]}>
        {videoData.map((video, index) => {
          var minutes = Math.floor(video.duration / 60);
          var seconds = Math.floor(video.duration - minutes * 60);

          return (
            <Col lg={6} md={8} xs={24} key={`${index}_video`}>
              {/* 창 사이즈가 가장 작을 때 칼럼 한 칸이 24 사이즈 크기가 된다는 뜻 창이 md면 칼럼 하나가 8, 영상 세 개가 보인다는 거고 lg면 6, 즉 4개가 보인다는 뜻이다. */}
              <a href={`/video/${video._id}`}>
                <div style={{ position: "relative" }}>
                  <img
                    style={{ width: "100%" }}
                    src={`http://localhost:5000/${video.thumbnail}`}
                    alt="videos"
                  />
                  <div className="duration">
                    <span>
                      {minutes} : {seconds}
                    </span>
                  </div>
                </div>
              </a>
              <br />
              <Meta
                avatar={<Avatar src={video.writer.image} />}
                title={video.title}
              />
              <span>{video.writer.name} </span>
              <br />
              <span style={{ marginLeft: "3rem" }}> {video.views}</span> views
              <span> {moment(video.createdAt).format("MMM Do YY")} </span>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default LandingPage;
