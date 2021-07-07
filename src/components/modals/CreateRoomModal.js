import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { FaAngleUp, FaAngleDown, FaCheck } from "react-icons/fa";

const StyledCreateRoomModal = styled.section`
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

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

const CreateRoomModal = ({ handleCRCloseBtn }) => {
  const state = useSelector((state) => state.logInStatusReducer);
  const history = useHistory();
  const [roomname, setRoomname] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("카테고리를 선택해 주세요");
  const [selectedItem, setSelectedItem] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [roomReady, setRoomReady] = useState(false);
  const [roomId, setRoomId] = useState("");

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
      });
  };

  const handleEntrance = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/room/${roomId}`)
      .then((data) => {
        history.push(`/room/${roomId}`);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            setErrMessage(`Oops! 방이 가득찼습니다. 다른 방에 참여해주세요.`);
            console.log(err.response);
          }
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  return (
    <StyledCreateRoomModal>
      <div className="CR-modal-contents-wrapper">
        <div className="room-name-input">
          <span>방이름</span>
          <input type="text" onChange={handleRoomnameInput}></input>
        </div>
        <div className="category-select">
          <button className="dd-header">
            <div className="dd-header-title">{headerTitle}</div>
            {isListOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          <div className="dd-list">
            <button
              className="dd-list-item"
              onClick={() => handleSelect("국내입시")}
            >
              {`국내입시`}{" "}
              {selectedItem === "국내입시" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("해외입시")}
            >
              {`해외입시`}{" "}
              {selectedItem === "해외입시" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("영어")}
            >
              {`영어`} {selectedItem === "영어" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("제2외국어")}
            >
              {`제2외국어`}{" "}
              {selectedItem === "제2외국어" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("코딩")}
            >
              {`코딩`} {selectedItem === "코딩" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("취업")}
            >
              {`취업`} {selectedItem === "취업" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("자격증")}
            >
              {`자격증`}{" "}
              {selectedItem === "자격증" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("공무원")}
            >
              {`공무원`}{" "}
              {selectedItem === "공무원" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("예체능")}
            >
              {`예체능`}{" "}
              {selectedItem === "예체능" && <FaCheck fontSize={10} />}
            </button>
            <button
              className="dd-list-item"
              onClick={() => handleSelect("자유")}
            >
              {`자유`} {selectedItem === "자유" && <FaCheck fontSize={10} />}
            </button>
          </div>
        </div>
        {roomReady ? (
          <div>
            방 다 만들어졌슴다 참여하실?
            <button onClick={handleEntrance}>입장하기</button>
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
