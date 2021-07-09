import React from "react";
import styled from "styled-components";

const StyledSliderContent = styled.div`
  transform: translateX(-${(props) => props.translate}px);
  transition: transform ease-out ${(props) => props.transition}s;
  height: 100%;
  width: ${(props) => props.width}px;
  display: flex;
`;

const SliderContent = (props) => {
  const { translate, transition, width } = props;
  return (
    <StyledSliderContent
      id="slider-content"
      translate={translate}
      transition={transition}
      width={width}
    >
      {props.children}
    </StyledSliderContent>
  );
};

export default SliderContent;
