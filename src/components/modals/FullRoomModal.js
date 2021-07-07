import React from "react";
import styled from "styled-components";

const StyledFRModal = styled.section`
  z-index: 999;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FullRoomModal = ({ handleFRMCloseBtn }) => {
  return (
    <StyledFRModal>
      <h1>
        Oops! 방이 가득찼습니다.
        <br /> 다른 방에 참가해주세요
      </h1>
      <button onClick={handleFRMCloseBtn}>닫기</button>
    </StyledFRModal>
  );
};

export default FullRoomModal;
