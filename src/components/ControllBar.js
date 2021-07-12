import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

const StyledControllBar = styled.section`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;

  .search-controller {
    display: flex;
    justify-content: center;
    align-self: center;
    column-gap: 20px;
    padding: 20px 0 0 0;

    button {
      border: none;
      border-radius: 10px;
      background: #7f554f;
      height: 40px;
      width: 80px;
      cursor: pointer;
      color: white;
      font-size: 0.9em;
      font-weight: 600;
    }

    input {
      border-radius: 20px;
      height: 40px;
      width: 380px;
      border: solid 1px lightgray;
      box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
      padding: 20px;

      &:focus {
        outline: none;
      }
    }
  }
`;

const ControllBar = ({ setRoomList }) => {
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
      <div className="search-controller">
        {errMessage && <span>{errMessage}</span>}
        <input
          type="text"
          placeholder="참여를 원하는 방을 검색해 보세요"
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
