import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";

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

const ControllBar = ({ handleCRBtn, getRoomList, setRoomList }) => {
  const [input, setInput] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;

  const getSearchResult = (input) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/room/search`, {
        params: { q: input },
        headers: { userId: user.userId },
      })
      .then((res) => {
        const { rooms } = res.data;
        setRoomList(rooms);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            setErrMessage("검색 정보가 없습니다");
          }
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

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
        {errMessage && <span>{errMessage}</span>}
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={handleInput}
        ></input>
        <button className="search" onClick={() => getSearchResult(input)}>
          검색
        </button>
      </div>
    </StyledControllBar>
  );
};

export default ControllBar;
