import React from "react";
import styled from "styled-components";

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #003333;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  
  cursor: pointer;
  transition: 0.2s ease;

  p {
    color: #e5e5e5;
    letter-spacing: 1.2px;
    display: flex;
    align-items: center;
  }
`;

const CategoryTag = ({ category, selected }) => {
  return (
    <StyledTagContainer selected={selected}>
      <p>{category}</p>
    </StyledTagContainer>
  );
};

export default CategoryTag;
