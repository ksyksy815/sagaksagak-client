import React from "react";
import styled from "styled-components";
import RecommendCard from "./RecommendCard";

const SytledSlide = styled.div`
  height: 100%;
  width: 100%;
  background-image: url("${(props) => props.content}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slide = ({ content }) => {
  return (
    <SytledSlide content={content}>
      <RecommendCard />
    </SytledSlide>
  );
};

export default Slide;
