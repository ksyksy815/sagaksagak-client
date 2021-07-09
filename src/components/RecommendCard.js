import React from "react";
import styled from "styled-components";

const StyledRecommendCard = styled.div`
  width: 400px;
  height: 300px;
  background: #c7d2fe66;
  border-radius: 10px;
  backdrop-filter: blur(10px);

  @media only screen and (max-width: 600px) {
    width: 300px;
    height: 200px;
    top: 10%;
    font-size: 0.8rem;
  }

  .rec-room {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const RecommendCard = ({ handleEntrance, content }) => {
  return (
    <StyledRecommendCard>
      <div
        className="rec-room"
        onClick={() => handleEntrance(content.roomUuid)}
      >
        <h1>이런 방을 추천해요</h1>
        <h2>{`[${content.category}] ${content.roomName}`}</h2>
        <h3> {`${content.usersNum}/6`} </h3>
      </div>
    </StyledRecommendCard>
  );
};

export default RecommendCard;
