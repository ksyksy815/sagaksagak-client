import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import Room from "./Room";
import { AiOutlinePlus } from "react-icons/ai";
import { RiRefreshLine } from "react-icons/ri";

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
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      align-self: flex-start;
      margin: 0;
      padding: 10px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      column-gap: 10px;
      padding: 10px;

      .new-room-icon {
        font-size: 1.7em;
        cursor: pointer;
      }

      .refresh-icon {
        font-size: 1.6em;
        cursor: pointer;
      }
    }
  }

  .room-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 25px;
    width: 100%;
  }
`;

const RoomList = ({
  rooms,
  handleEntrance,
  handleCRBtn,
  loading,
  error,
  getRoomList,
  hasMore,
  setPageNum,
  setQuery,
  setRooms,
}) => {
  const observer = useRef();

  const lastRoomElRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <StyledRoomListWrapper>
      <div className="list-header">
        <h1>방목록</h1>
        <div className="icon-container">
          <AiOutlinePlus className="new-room-icon" onClick={handleCRBtn} />
          <RiRefreshLine
            className="refresh-icon"
            onClick={() => {
              setRooms([]);
              setPageNum(0);
              setQuery("");
              getRoomList().axios();
            }}
          />
        </div>
      </div>
      <div className="room-container">
        {rooms.length === 0 ? (
          <h2>검색 결과가 없습니다</h2>
        ) : (
          <>
            {rooms.map((room, idx) => {
              if (rooms.length === idx + 1) {
                return (
                  <Room
                    lastRoomElRef={lastRoomElRef}
                    key={idx}
                    room={room}
                    handleEntance={handleEntrance}
                  ></Room>
                );
              } else {
                return (
                  <Room
                    key={idx}
                    room={room}
                    handleEntance={handleEntrance}
                  ></Room>
                );
              }
            })}
            <div>{loading && "Loading..."}</div>
            <div>{error && "Error..."}</div>
          </>
        )}
      </div>
    </StyledRoomListWrapper>
  );
};

export default RoomList;
