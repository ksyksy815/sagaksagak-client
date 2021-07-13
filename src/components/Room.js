import React from "react";
import styled from "styled-components";
import CategoryTag from "./CategoryTag";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsPeopleCircle } from "react-icons/bs";

const StyledRoom = styled.div`
  width: 320px;
  height: 240px;
  padding: 10px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
  row-gap: 4px;

  &:hover {
    transform: translateY(-10px);
  }

  .category-tag {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }

  .room-title {
    width: 100%;
    height: 148px;
    box-shadow: 0 5px 6px -6px rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h3 {
      text-align: center;
    }

    p {
      text-align: end;
    }
  }

  .room-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 32px;

    .active-time {
      display: flex;
      align-items: center;
      column-gap: 5px;

      .time-icon {
        font-size: 1.1em;
      }
    }

    .active-users {
      display: flex;
      align-items: center;
      column-gap: 5px;

      .user-icon {
        font-size: 1.1em;
      }
    }
  }
`;

const getTime = (time) => {
  if (time < 1) return "1분미만";
  if (time < 60) return `${parseInt(time, 10)}분`;
  if (time >= 60) return `${parseInt(time / 60, 10)}시간`;
};

const Room = ({ handleEntance, room, lastRoomElRef }) => {
  return (
    <StyledRoom
      ref={lastRoomElRef}
      onClick={() => handleEntance(room.roomUuid)}
    >
      <div className="category-tag">
        <CategoryTag category={room.category} />
      </div>
      <div className="room-title">
        <h3>{room.roomName}</h3>
        <p>{`by ${room.masterName}`}</p>
      </div>
      <div className="room-info">
        <div className="active-time">
          <AiOutlineClockCircle className="time-icon" />
          <span>{getTime(room.created)}</span>
        </div>
        <div className="active-users">
          <BsPeopleCircle className="user-icon" />
          <span>{`${room.usersNum} / 6`}</span>
        </div>
      </div>
    </StyledRoom>
  );
};

export default Room;
