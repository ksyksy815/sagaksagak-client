import React from "react";
import DataSlider from "../components/DataSlider";
import styled from "styled-components";
import ControllBar from "../components/ControllBar";

const StyledStudyLoby = styled.div`
  position: relative;
  top: 70px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const StudyRoomList = () => {
  return (
    <StyledStudyLoby>
      <DataSlider />
      <ControllBar />
    </StyledStudyLoby>
  );
};

export default StudyRoomList;
