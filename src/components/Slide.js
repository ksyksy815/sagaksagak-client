import React from "react";
import styled from "styled-components";

const SytledSlide = styled.div`
  height: 100%;
  width: 100%;
  background-image: url("${(props) => props.content}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Slide = ({ content }) => {
  return <SytledSlide content={content}></SytledSlide>;
};

export default Slide;
