import React from "react";
import styled from "styled-components";

const StyledRoomListWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;

  @media only screen and (max-width: 1010px) {
    width: 95%;
  }

  .list-header {
    width: 100%;
    border-bottom: 2px solid black;

    h1 {
      align-self: flex-start;
      margin: 0;
      padding: 10px;
    }
  }

  .room-container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
    width: 100%;

    @media only screen and (max-width: 1010px) {
      grid-template-columns: repeat(2, auto);
    }

    @media only screen and (max-width: 600px) {
      grid-template-columns: auto;
    }
  }

  .room {
    padding: 10px 10px;
    background: #c7d2fe66;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
  }
`;

const RoomList = ({ roomList, handleEntrance }) => {
  return (
    <StyledRoomListWrapper>
      <div className="list-header">
        <h1>방목록</h1>
      </div>
      <div className="room-container">
        {roomList.map((room, idx) => {
          return (
            <div
              className="room"
              key={idx}
              onClick={() => handleEntrance(room.roomUuid)}
            >
              <h3>{`[${room.category}] ${room.roomName}`}</h3>
              <h5>{`${room.usersNum}/6`}</h5>
            </div>
          );
        })}
        {/* <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div>
        <div className="test">
          <h3>[영어] 토익 만점이 1000점 이냐?</h3>
          <h5>5/6</h5>
        </div> */}
      </div>
    </StyledRoomListWrapper>
  );
};

export default RoomList;
