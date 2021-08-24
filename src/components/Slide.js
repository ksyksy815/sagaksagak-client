import React from "react";
import styled from "styled-components";
import RecommendCard from "./RecommendCard";

const SytledSlide = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 51, 51, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Slide = ({ content, handleEntrance }) => {
  return (
    <SytledSlide content={content.image}>
      <RecommendCard handleEntrance={handleEntrance} content={content} />
    </SytledSlide>
  );
};

export default Slide;
