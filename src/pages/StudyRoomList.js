import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DataSlider from "../components/DataSlider";
import styled from "styled-components";
import ControllBar from "../components/ControllBar";
import RoomList from "../components/RoomList";
import CreateRoomModal from "../components/modals/CreateRoomModal";

const StyledStudyLoby = styled.div`
  position: relative;
  top: 70px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-width: 70%;

  @media only screen and (max-width: 860px) {
    max-width: 100%;
  }
`;

const StudyRoomList = () => {
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
  const [recommend, setRecommend] = useState([]);
  //모달 조건부 렌더링 나중에 제대로 상태 설정 해야함
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCRBtn = () => {
    setIsModalOpen(true);
  };

  const handleCRCloseBtn = () => {
    setIsModalOpen(false);
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
  }, [handleAjax]);

  useEffect(() => {
    getRoomList();
  }, [getRoomList]);

  return (
    <StyledStudyLoby>
      {isModalOpen && <CreateRoomModal handleCRCloseBtn={handleCRCloseBtn} />}
      <DataSlider recommend={recommend} />
      <ControllBar handleCRBtn={handleCRBtn} getRoomList={getRoomList} />
      <RoomList roomList={roomList} />
    </StyledStudyLoby>
  );
};

export default StudyRoomList;
