import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const StyledCreateRoomModal = styled.section`
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  .room-name-input {
    display: flex;
  }

  .CR-modal-contents-wrapper {
    z-index: 999;
    background: white;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    row-gap: 8px;
    width: 400px;
  }

  .dd-list {
    display: flex;
    flex-direction: column;
  }

  .dd-list-item {
    background: none;
    border: none;
    padding: 2px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background: lightgrey;
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
            <div className="first-line"></div>
            <div className="second-line"></div>
          </div>
        </div>
        {roomReady ? (
          <div>
            방 다 만들어졌슴다 참여하실?
            <button onClick={() => handleEntrance(roomId)}>입장하기</button>
          </div>
        ) : (
          <div className="modal-btns">
            <button onClick={handleCreateRoom}>방만들기</button>
            <button onClick={handleCRCloseBtn}>돌아가기</button>
          </div>
        )}
        {errMessage && <p>{errMessage}</p>}
      </div>
    </StyledCreateRoomModal>
  );
};

export default CreateRoomModal;
