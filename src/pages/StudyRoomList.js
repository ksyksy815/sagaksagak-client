import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import styled from "styled-components";
import ControllBar from "../components/ControllBar";
import RoomList from "../components/RoomList";
import CreateRoomModal from "../components/modals/CreateRoomModal";
import FullRoomModal from "../components/modals/FullRoomModal";
import Slider from "../components/Slider";
import { setParticipants, logIn, logOut } from "../actions/index";
import getCookie from "../utilities/getCookie";
import GoToTopButton from "../components/GoToTopButton";

const StyledStudyLoby = styled.div`
  position: relative;
  top: 45px;
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
  const dispatch = useDispatch();
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;
  const [recommend, setRecommend] = useState([
    {
      roomName: "2021년 10월 지방직 9급 대비 함께 해요",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 3,
      category: "공무원",
      created: 325.1215261,
      masterName: "서울시립공무원(진)",
    },
    {
      roomName: "토익 만점이 1000점 이냐?",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "영어",
      created: 0.1231,
      masterName: "토익1000점",
    },
    {
      roomName: "11월의 영광을 위해 함께 가즈아!",
      roomUuid: "eiikc3ef-sasdf-aeijv11231",
      usersNum: 5,
      category: "국내입시",
      created: 54.2212125,
      masterName: "예비샤대생",
    },
  ]);
  const [isCRModalOpen, setIsCRModalOpen] = useState(false);
  const [isRoomFull, setIsRoomFull] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const handleCRBtn = () => {
    setIsCRModalOpen(true);
  };

  const handleCRCloseBtn = () => {
    setIsCRModalOpen(false);
  };

  const handleFRMCloseBtn = () => {
    setIsRoomFull(false);
  };

  const handleEntrance = (roomId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/room/${roomId}`, {
        userId: state.user.userId,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setParticipants(res.data.users));
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

  const getRoomListRef = useRef();
  const refreshLogInRef = useRef();

  useEffect(() => {
    getRoomListRef.current = getRoomList;
    refreshLogInRef.current = handleRefreshLogIn;
  });

  const handleRefreshLogIn = () => {
    if (!getCookie("refreshToken")) return;

    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`, {
        headers: {
          relogin: true,
        },
        withCredentials: true,
      })
      .then((res) => {
        const { accessToken, username, userId, email, category, subId } =
          res.data;

        if (subId)
          dispatch(
            logIn(email, userId, username, accessToken, category, subId)
          );
        dispatch(logIn(email, userId, username, accessToken, category));
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/logout`, {
                headers: { authorization: `bearer ${user.accessToken}` },
                withCredentials: true,
              })
              .then(() => {
                dispatch(logOut());
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
            history.push("/unauthorized");
          }
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  const getRoomList = () => {
    let cancel;

    const axiosConfig = (query, pageNum) => {
      if (state.user.isLogedIn) {
        if (query.length === 0)
          return {
            headers: {
              authorization: `bearer ${state.user.accessToken}`,
              userid: state.user.userId,
            },
            params: { page: pageNum },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          };
        else
          return {
            headers: {
              authorization: `bearer ${state.user.accessToken}`,
              userid: state.user.userId,
            },
            params: { q: query, page: pageNum },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          };
      } else {
        if (query.length === 0)
          return {
            headers: { userid: 1 },
            params: { page: pageNum },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          };
        else
          return {
            headers: { userid: 1 },
            params: { q: query, page: pageNum },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          };
      }
    };

    return {
      axios: () => {
        axios
          .get(
            `${process.env.REACT_APP_SERVER_DOMAIN}/room/list`,
            axiosConfig(query, pageNum)
          )
          .then((res) => {
            setRooms((prevRooms) => {
              return [...prevRooms, ...res.data.rooms];
            });
            if (res.data.recommend) setRecommend(res.data.recommend);
            setHasMore(res.data.rooms.length > 0);
            setLoading(false);
          })
          .catch((err) => {
            if (axios.isCancel(err)) return;
            setError(true);
          });
      },

      cancel: () => cancel,
    };
  };

  useEffect(() => {
    const logInRefresh = () => {
      refreshLogInRef.current();
    };

    logInRefresh();
  }, []);

  useEffect(() => {
    setRooms([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const { axios, cancel } = getRoomListRef.current();

    axios();

    return () => cancel();
  }, [query, pageNum]);

  return (
    <StyledStudyLoby>
      <CreateRoomModal
        handleCRCloseBtn={handleCRCloseBtn}
        handleEntrance={handleEntrance}
        isCRModalOpen={isCRModalOpen}
      />
      <FullRoomModal handleFRMCloseBtn={handleFRMCloseBtn} open={isRoomFull} />
      <Slider recommend={recommend} handleEntrance={handleEntrance} />
      <ControllBar setQuery={setQuery} setPageNum={setPageNum} query={query} />
      <RoomList
        rooms={rooms}
        handleEntrance={handleEntrance}
        handleCRBtn={handleCRBtn}
        loading={loading}
        error={error}
        getRoomList={getRoomList}
        hasMore={hasMore}
        setPageNum={setPageNum}
        setQuery={setQuery}
        setRooms={setRooms}
      />
      <GoToTopButton />
    </StyledStudyLoby>
  );
};

export default StudyRoomList;
