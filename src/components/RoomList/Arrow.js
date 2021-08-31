import React from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const StyledArrow = styled.div`
  display: flex;
  position: absolute;
  top: 45%;
  ${(props) => (props.direction === "right" ? "right: 25px" : "left: 25px")};
  height: 50px;
  width: 50px;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;

  @media only screen and (max-width: 500px) {
    display: none;
  }

  &:hover {
    transform: scale(1.2);
  }

  .arrow {
    font-size: 2em;
    transform: translateX(
      ${(props) => (props.direction === "left" ? "-2" : "2")}px
    );
    fill: white;

    &:focus {
      outline: 0;
    }
  }
`;

const Arrow = ({ direction, handleClick }) => {
  return (
    <StyledArrow direction={direction} onClick={handleClick}>
      {direction === "right" ? (
        <FaArrowRight className="arrow" />
      ) : (
        <FaArrowLeft className="arrow" />
      )}
    </StyledArrow>
  );
};

export default Arrow;
