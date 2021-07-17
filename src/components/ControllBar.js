import React, { useState } from "react";
import styled from "styled-components";

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
    width: 480px;

    button {
      border: none;
      border-radius: 10px;
      background: #7f554f;
      height: 40px;
      min-width: 80px;
      cursor: pointer;
      color: white;
      font-size: 0.9em;
      font-weight: 600;
    }

    input {
      border-radius: 20px;
      height: 40px;
      width: 100%;
      border: solid 1px lightgray;
      box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
      padding: 20px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        @media only screen and (max-width: 400px) {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const ControllBar = ({ setQuery, setPageNum, query }) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleBtnClick = (e) => {
    e.preventDefault();

    if (query === input) return;
    setQuery(input);
    setPageNum(0);
  };

  return (
    <StyledControllBar>
      <form className="search-controller">
        <input
          type="text"
          placeholder="참여를 원하는 방을 검색해 보세요"
          onChange={handleInput}
        ></input>
        <button onClick={handleBtnClick}>검색</button>
      </form>
    </StyledControllBar>
  );
};

export default ControllBar;
