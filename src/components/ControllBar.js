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
    column-gap: 1rem;
    padding: 20px 0 0 0;
    width: 480px;

    button {
      border: none;
      border-radius: 10px;
      padding: 0.5rem 2rem;
      background: rgb(97,163,152);
      cursor: pointer;
      color: white;
      font-size: 0.9em;
      font-weight: bold;
      text-align: center;
    }

    input {
      border-radius: 5px;
      height: 40px;
      width: 100%;
      border: solid 1px lightgray;
      box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
      padding: 0.5rem 1rem;

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
          placeholder="원하는 방을 검색하세요!"
          onChange={handleInput}
        ></input>
        <button onClick={handleBtnClick}>Search</button>
      </form>
    </StyledControllBar>
  );
};

export default ControllBar;
