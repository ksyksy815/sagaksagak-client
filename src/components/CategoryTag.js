import React from "react";
import styled from "styled-components";

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => {
    return `rgba(${props.colorSet.bgColor})`;
  }};
  width: 80px;
  height: 30px;
  border-radius: 5px;

  p {
    color: ${(props) => {
      return `rgba(${props.colorSet.color})`;
    }};
    font-weight: 500;
    display: flex;
    align-items: center;
  }
`;

const CategoryTag = ({ category }) => {
  const handleColor = (category) => {
    switch (category) {
      case "국내입시":
        return { bgColor: "255, 15, 15, 0.2", color: "255, 15, 15, 0.8" };
      case "해외입시":
        return { bgColor: "255, 132, 10, 0.2", color: "255, 132, 10, 0.8" };
      case "영어":
        return { bgColor: "163, 146, 0, 0.2", color: "163, 146, 0, 0.8" };
      case "제2외국어":
        return { bgColor: "97, 163, 0, 0.2", color: "97, 163, 0, 0.8" };
      case "코딩":
        return { bgColor: "0, 163, 65, 0.2", color: "0, 163, 65, 0.8" };
      case "취업":
        return { bgColor: "0, 163, 146, 0.2", color: "0, 163, 146, 0.8" };
      case "자격증":
        return { bgColor: "10, 132, 255, 0.2", color: "10, 132, 255, 0.8" };
      case "공무원":
        return { bgColor: "132, 10, 255, 0.2", color: "132, 10, 255, 0.8" };
      case "예체능":
        return { bgColor: "255, 10, 255, 0.2", color: "255, 10, 255, 0.8" };
      case "자유":
        return { bgColor: "255, 10, 132, 0.2", color: "255, 10, 132, 0.8" };
      default:
        return { bgColor: "255, 15, 15, 0.2", color: "255, 15, 15, 0.8" };
    }
  };

  return (
    <StyledTagContainer colorSet={handleColor(category)}>
      <p>{category}</p>
    </StyledTagContainer>
  );
};

export default CategoryTag;
