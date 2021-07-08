import React from "react";
import styled from "styled-components";

const StyledDot = styled.span`
  padding: 7px;
  margin-right: 5px;
  border-radius: 50%;
  border: solid 1px white;
  background: ${(props) => (props.active ? "white" : "transparent")};
`;

const StyledDots = styled.div`
  position: absolute;
  bottom: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = ({ active }) => {
  return <StyledDot active={active} />;
};

const Dots = ({ slides, activeIndex }) => {
  return (
    <StyledDots>
      {slides.map((slide, idx) => (
        <Dot key={idx} active={activeIndex === idx} />
      ))}
    </StyledDots>
  );
};

export default Dots;
