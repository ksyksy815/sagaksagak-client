import React from "react";
import styled from "styled-components";

const StyledFRModal = styled.section`
  ${(props) =>
    props.open
      ? `display: flex;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        align-items: center;
        justify-content: center;
        animation: modal-bg-show .3s;`
      : `display: none;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;`}
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  .FR-modal-contents-wrapper {
    background: white;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: modal-show 0.3s;
    padding: 20px;
    row-gap: 30px;

    button {
      border: none;
      border-radius: 20px;
      background: #7f554f;
      height: 40px;
      width: 90px;
      cursor: pointer;
      color: white;
      font-size: 0.9em;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0px;
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const FullRoomModal = ({ handleFRMCloseBtn, open }) => {
  return (
    <StyledFRModal open={open}>
      <div className="FR-modal-contents-wrapper">
        <h1>
          Oops! 방이 가득찼습니다.
          <br />
          <br /> 다른 방에 참가해주세요
        </h1>
        <button onClick={handleFRMCloseBtn}>닫기</button>
      </div>
    </StyledFRModal>
  );
};

export default FullRoomModal;
