import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./section/SideVideo";
import Subscribe from "./section/Subscribe";

const VideoDetailPage = (props) => {
  const [videoDetail, setVideoDetail] = useState([]);

  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        // 성공
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오는 데 실패했습니다.");
      }
    });
  }, []);

  if (videoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${videoDetail.filePath}`}
              controls
            />
            <List.Item
              actions={[<Subscribe userTo={videoDetail.writer._id} />]}
            >
              <List.Item.Meta
                title={videoDetail.writer?.name}
                description={videoDetail.description}
                avatar={<Avatar src={videoDetail.writer?.image} />}
              />
            </List.Item>

            {/* comments */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div> ...loading </div>;
  }
};

export default VideoDetailPage;
