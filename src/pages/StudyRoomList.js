import React from "react";
import DataSlider from "../components/DataSlider";
import styled from "styled-components";

const StyledStudyLoby = styled.div`
  position: relative;
  top: 70px;
`;

const StudyRoomList = () => {
  return (
    <StyledStudyLoby>
      <DataSlider />
    </StyledStudyLoby>
  );
};

export default StudyRoomList;
