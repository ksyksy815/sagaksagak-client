import React from "react";
import styled from "styled-components";
import { RiRefreshLine } from "react-icons/ri";

const StyledControllBar = styled.section`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-self: center;
    column-gap: 5px;
  }

  .room-controller {
    button {
      border: none;
      border-radius: 5px;
      background: #66b0f0;
      height: 30px;
      cursor: pointer;
    }
  }

  .refresh-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  }

  .search-controller {
    button {
      border: none;
      border-radius: 5px;
      background: #66b0f0;
      height: 30px;
      cursor: pointer;
    }

    input {
      border-radius: 5px;

      &:focus {
        outline: none;
      }
    }
  }
`;

const ControllBar = ({ handleCRBtn, getRoomList }) => {
  return (
    <StyledControllBar>
      <div className="room-controller">
        <button className="make-room" onClick={handleCRBtn}>
          방만들기
        </button>
        <button>
          <RiRefreshLine className="refresh-btn" onClick={getRoomList} />
        </button>
      </div>
      <div className="search-controller">
        <input type="text" placeholder="검색어를 입력해주세요"></input>
        <button className="search">검색</button>
      </div>
    </StyledControllBar>
  );
};

export default ControllBar;
