import React from "react";
import styled from "styled-components";

const SliderContent = styled.div`
  transform: translateX(-${(props) => props.translate}px);
  transition: transform ease-out ${(props) => props.transition}s;
  height: 100%;
  width: ${(props) => props.width}px;
  display: flex;
`;

export default SliderContent;
