import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import CategoryTag from "../CategoryTag";

const StyledCreateRoomModal = styled.section`
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  .room-name-input {
    display: flex;

    input {
      width: 240px;
      height: 30px;
      border-radius: 20px;
      border: solid 1px lightgray;
      box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
      padding: 20px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        text-align: center;
      }
    }
  }

  .CR-modal-contents-wrapper {
    z-index: 999;
    background: white;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    row-gap: 30px;
  }

  .category-select {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;

    .dd-list {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      border: solid 1px rgba(0, 0, 0, 0.19);
      border-radius: 10px;
      padding: 30px 10px;

      .first-line {
        display: flex;
        column-gap: 10px;
      }

      .second-line {
        display: flex;
        column-gap: 10px;
      }
    }
  }

  .modal-btns {
    display: flex;
    column-gap: 20px;

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
`;

const categoryListFirst = ["국내입시", "해외입시", "영어", "제2외국어", "코딩"];

const categoryListSecond = ["취업", "자격증", "공무원", "예체능", "자유"];

const CreateRoomModal = ({
  handleCRCloseBtn,
  handleEntrance,
  setRoomId,
  setRoomReady,
  roomId,
  roomReady,
}) => {
  const state = useSelector((state) => state.logInStatusReducer);
  const [roomname, setRoomname] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSelect = (selected) => {
    setSelectedItem(selected);
  };

  const handleRoomnameInput = (e) => {
    setRoomname(e.target.value);
  };

  const handleCreateRoom = () => {
    if (!selectedItem) {
      setErrMessage("카테고리를 선택해 주세요");
      return;
    }
    if (!roomname) {
      setErrMessage("방이름을 입력해주세요");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/room/new`, {
        userId: state.user.isLogedIn ? state.user.userId : 1,
        category: selectedItem,
        roomName: roomname,
      })
      .then((res) => {
        setRoomId(res.data.roomId);
        setRoomReady(true);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
        setErrMessage("방생성에 실패 하였습니다. 다시 시도해 주세요!");
      });
  };

  return (
    <StyledCreateRoomModal>
      <div className="CR-modal-contents-wrapper">
        <div className="room-name-input">
          <input
            type="text"
            onChange={handleRoomnameInput}
            placeholder="방 이름을 입력해 주세요"
          ></input>
        </div>
        <div className="category-select">
          <h3 className="dd-header">카테고리 선택</h3>
          <div className="dd-list">
            <div className="first-line">
              {categoryListFirst.map((category) => {
                return (
                  <div key={category} onClick={() => handleSelect(category)}>
                    <CategoryTag
                      category={category}
                      selected={selectedItem === category}
                    />
                  </div>
                );
              })}
            </div>
            <div className="second-line">
              {categoryListSecond.map((category) => {
                return (
                  <div key={category} onClick={() => handleSelect(category)}>
                    <CategoryTag
                      category={category}
                      selected={selectedItem === category}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {roomReady ? (
          <div className="modal-btns">
            <span>방이 생성되었습니다</span>
            <button onClick={() => handleEntrance(roomId)}>입장하기</button>
          </div>
        ) : (
          <div className="modal-btns">
            <button onClick={handleCreateRoom}>방만들기</button>
            <button onClick={handleCRCloseBtn}>돌아가기</button>
          </div>
        )}
        {errMessage && <p className="err-message">{errMessage}</p>}
      </div>
    </StyledCreateRoomModal>
  );
};

export default CreateRoomModal;
