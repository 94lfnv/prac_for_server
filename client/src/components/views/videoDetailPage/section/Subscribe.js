import React, { useEffect, useState } from "react";
import axios from "axios";

const Subscribe = (props) => {
  const [subscribeNumber, setSubscribeNumber] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const variable = { userTo: props.userTo };
  useEffect(() => {
    axios.post("/api/subscribe/subscribeNumber", variable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });

    const subscribeVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };

    axios.post("/api/subscribe/subscribed", subscribeVariable).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("구독 정보를 가져오지 못했습니다.");
      }
    });
  }, []);
  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? "#AAAAAA " : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick
      >
        {subscribed ? `${subscribeNumber} Subscribed` : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscribe;
