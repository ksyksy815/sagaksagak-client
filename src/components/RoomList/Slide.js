import React from "react";
import styled from "styled-components";
import RecommendCard from "./RecommendCard";

const SytledSlide = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(255,255,255, 0.3);
  box-shadow: 2px 2px 20px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slide = ({ content, handleEntrance }) => {
  return (
    <SytledSlide>
      <RecommendCard handleEntrance={handleEntrance} content={content} />
    </SytledSlide>
  );
};

export default Slide;
