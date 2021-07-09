import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import DataSlider from "../components/DataSlider";
import styled from "styled-components";
import ControllBar from "../components/ControllBar";
import RoomList from "../components/RoomList";
import CreateRoomModal from "../components/modals/CreateRoomModal";
import FullRoomModal from "../components/modals/FullRoomModal";
import Slider from "../components/Slider";

const StyledStudyLoby = styled.div`
  position: relative;
  top: 70px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 1010px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1010px) {
    max-width: 100%;
  }
`;

const StudyRoomList = () => {
  const history = useHistory();
  const state = useSelector((state) => state.logInStatusReducer);
  const [roomList, setRoomList] = useState([
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
  ]);
  const [recommend, setRecommend] = useState([
    {
      roomName: "2021년 10월 지방직 9급 대비 함께 해요",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 3,
      category: "공무원",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
    },
    {
      roomName: "11월의 영광을 위해 함께 가즈아!",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "국내입시",
    },
  ]);
  const [isCRModalOpen, setIsCRModalOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomReady, setRoomReady] = useState(false);
  const [isRoomFull, setIsRoomFull] = useState(false);

  const handleCRBtn = () => {
    setIsCRModalOpen(true);
  };

  const handleCRCloseBtn = () => {
    setIsCRModalOpen(false);
  };

  const handleFRMCloseBtn = () => {
    setIsRoomFull(false);
  };

  const handleAjax = (isLogedIn) => {
    if (isLogedIn) {
      return axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/room/list`, {
        headers: { authorization: state.user.accessToken },
      });
    } else {
      return axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/room/list`);
    }
  };

  const getRoomList = useCallback(() => {
    handleAjax(state.user.isLogedIn)
      .then((res) => {
        const { rooms, recommend } = res.data;
        setRoomList(rooms);
        setRecommend(recommend);
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
  }, []);

  const handleEntrance = (roomId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/room/${roomId}`, {
        userId: state.user.userId,
      })
      .then(() => {
        history.push(`/room/${roomId}`);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            setIsRoomFull(true);
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

  useEffect(() => {
    getRoomList();
  }, [getRoomList]);

  return (
    <StyledStudyLoby>
      {isCRModalOpen && (
        <CreateRoomModal
          handleCRCloseBtn={handleCRCloseBtn}
          handleEntrance={handleEntrance}
          setRoomId={setRoomId}
          setRoomReady={setRoomReady}
          roomId={roomId}
          roomReady={roomReady}
        />
      )}
      {isRoomFull && <FullRoomModal handleFRMCloseBtn={handleFRMCloseBtn} />}
      {/* <DataSlider recommend={recommend} /> */}
      <Slider recommend={recommend} handleEntrance={handleEntrance} />
      <ControllBar handleCRBtn={handleCRBtn} getRoomList={getRoomList} />
      <RoomList roomList={roomList} handleEntrance={handleEntrance} />
    </StyledStudyLoby>
  );
};

export default StudyRoomList;
