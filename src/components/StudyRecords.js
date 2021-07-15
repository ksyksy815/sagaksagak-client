import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from "../actions/index";
import styled from "styled-components";
import {
  AiFillPieChart,
  AiOutlineBarChart,
  AiOutlineUnorderedList,
  AiFillCaretRight,
} from "react-icons/ai";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { device } from "../device";
import { logOut } from "../actions/index";
import getCookie from "../utilities/getCookie";

const RecordsWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1000px;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100%;
  padding: 1rem;
  background-color: #e9e4de;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .no-records {
    padding: 2rem;
  }

  .records-top {
    width: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;

    h1 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-self: flex-start;
      padding: 1rem;
      padding-bottom: 0.5rem;
      column-gap: 1rem;
    }

    .pie-box {
      width: 500px;
      height: 500px;
      padding: 2rem 0;
      display: flex;
      justify-content: center;
      align-items: center;

      @media ${device.tablet} {
        width: 500px;
      }
      @media ${device.mobile} {
        width: 300px;
      }
    }
  }

  .records-mid {
    width: 100%;
    height: 100vh;
    display: flex;
    min-height: 70vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    row-gap: 2rem;

    h2 {
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;
      padding: 1rem;
      padding-bottom: 0.5rem;
    }
  }

  .records-bottom {
    width: 100%;
    height: auto;
    min-height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;
    row-gap: 2rem;

    h2 {
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;
      padding: 1rem;
      padding-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

const Record = styled.li`
  flex: 1 1 30%;
  padding: 1.5rem;
  background-color: #ebebeb;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 0.5rem;
  transition: 0.2s;

  &:hover {
    background-color: #fff;
    transform: translateY(-2px);
  }

  .record-category {
    padding: 0.3rem 0.5rem;
    background-color: #eccc81;
    border-radius: 10px;
  }
  .record-roomName {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .record-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 0.9rem;
    column-gap: 1rem;
    padding-left: 0.3rem;
  }

  @media (max-width: 1000px) {
    flex: 1 1 47%;
    min-width: 300px;
  }
  @media ${device.mobile} {
    padding: 0.8rem;
    .record-category {
      font-size: 0.9rem;
    }
    .record-roomName {
      font-size: 1.2rem;
    }
    .record-info {
      padding: 0;
    }
  }
`;

const MemberOnlyContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const dummyRecords = [
  {
    roomName: "한쿡어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "중국어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "베트남어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "포르투갈어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "아랍어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "일본어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
];

const dummyHoursByCategory = [
  {
    category: "국내입시",
    hours: 0,
  },
  {
    category: "해외입시",
    hours: 0,
  },
  {
    category: "영어",
    hours: 7,
  },
  {
    category: "제2외국어",
    hours: 3,
  },
  {
    category: "코딩",
    hours: 5,
  },
  {
    category: "취업",
    hours: 7,
  },
  {
    category: "자격증",
    hours: 1,
  },
  {
    category: "공무원",
    hours: 0,
  },
  {
    category: "예체능",
    hours: 0,
  },
  {
    category: "자유",
    hours: 0,
  },
];

const dummyHoursByDay = [
  {
    day: "월요일",
    hours: 2,
  },
  {
    day: "화요일",
    hours: 8,
  },
  {
    day: "수요일",
    hours: 3,
  },
  {
    day: "목요일",
    hours: 5,
  },
  {
    day: "금요일",
    hours: 1,
  },
  {
    day: "토요일",
    hours: 1,
  },
  {
    day: "일요일",
    hours: 2,
  },
];

const pieContentStyle = {
  borderRadius: "15px",
  padding: `0.2rem 0.5rem`,
  border: `none`,
};

export default function StudyRecords() {
  const hasFetchedData = useRef(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.logInStatusReducer);
  const [records, setRecords] = useState(dummyRecords);
  const [totalHours, setTotalHours] = useState(1);
  const [hoursByCategory, setHoursByCategory] = useState(dummyHoursByCategory);
  const [hoursByDay, setHoursByDay] = useState(dummyHoursByDay);
  const [innerWidth, setInnerWidth] = useState(0);

  const refreshLogInRef = useRef();

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

  useEffect(() => {
    refreshLogInRef.current = handleRefreshLogIn;
  });

  useEffect(() => {
    const logInRefresh = () => {
      refreshLogInRef.current();
    };

    logInRefresh();
  }, []);

  //chart
  const COLORS = ["#A9C2DB", "#ECCC81", "#EBAB87", "#D4859A", "#B685D4"];

  const changeInnerWidthState = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", changeInnerWidthState);
    return window.removeEventListener("resize", changeInnerWidthState);
  }, []);

  useEffect(() => {
    if (user.isLogedIn) {
      if (!hasFetchedData.current) {
        axios
          .get(
            `${process.env.REACT_APP_SERVER_DOMAIN}/studylog/user/${user.userId}`,
            {
              headers: { authorization: `bearer ${user.accessToken}` },
              withCredentials: true,
            }
          )
          .then((res) => {
            setRecords(res.data.records);
            setHoursByCategory(res.data.totalHours);
            setTotalHours(() => {
              let hours = Object.values(hoursByCategory);
              return hours.reduce((acc, cur) => acc + cur);
            });

            //hoursByDay를 여기서 구해줘야함
            //서버에서 받은 setRecords에서 요일 기반으로 데이터를 다듬은 후 setHoursByDay해야함
          })
          .catch((err) => {
            if (err.response.status === 403) {
              // access token 만료
              axios
                .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
                .then((res) => {
                  dispatch(setAccessToken(res.data.accessToken));
                  axios
                    .get(
                      `${process.env.REACT_APP_SERVER_DOMAIN}/studylog/user/${user.userId}`,
                      {
                        headers: {
                          authorization: `bearer ${user.accessToken}`,
                        },
                        withCredentials: true,
                      }
                    )
                    .then((res) => {
                      axios
                        .get(
                          `${process.env.REACT_APP_SERVER_DOMAIN}/studylog/user/${user.userId}`,
                          {
                            headers: {
                              authorization: `bearer ${user.accessToken}`,
                            },
                            withCredentials: true,
                          }
                        )
                        .then((res) => {
                          setRecords(res.data.records);
                          setHoursByCategory(res.data.totalHours);
                          setTotalHours(() => {
                            let hours = Object.values(hoursByCategory);
                            return hours.reduce((acc, cur) => acc + cur);
                          });

                          //hoursByDay를 여기서 구해줘야함
                        })
                        .catch((err) => console.log(err));
                    });
                });
            } else {
              console.log(err);
            }
          });
      }
    }
  }, [
    user.isLogedIn,
    dispatch,
    user.accessToken,
    user.userId,
    hoursByCategory,
  ]);

  return (
    <RecordsWrapper>
      {user.isLogedIn ? (
        <>
          <section className="records-top">
            <h1>
              {" "}
              <AiFillPieChart /> 나의 총 공부시간: {totalHours}시간
            </h1>
            <div className="pie-box">
              {hoursByCategory.length !== 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart id="pie-chart">
                    <Pie
                      data={hoursByCategory}
                      dataKey="hours"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {hoursByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                    <Tooltip contentStyle={pieContentStyle} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-record">참여 기록이 없습니다.</div>
              )}
            </div>
          </section>
          <section className="records-mid">
            <h2>
              <AiOutlineBarChart /> 요일별 공부시간
            </h2>
            <ResponsiveContainer
              width={innerWidth > 770 ? "70%" : "100%"}
              height={innerWidth > 770 ? "70%" : "50%"}
            >
              <BarChart width={700} height={400} data={hoursByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#8884d8">
                  {hoursByDay.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>
          <section className="records-bottom">
            <h2>
              <AiOutlineUnorderedList />
              참여기록
            </h2>
            <ul>
              {records.length !== 0 ? (
                records.map((record) => {
                  return (
                    <Record key={record.roomName}>
                      <div className="record-category">{record.category}</div>
                      <div className="record-roomName">{record.roomName}</div>
                      <div className="record-info">
                        <span>
                          <AiFillCaretRight /> {`날짜: ${record.date}`}
                        </span>
                        <span>
                          <AiFillCaretRight /> {`참여시간: ${record.workHours}`}
                        </span>
                      </div>
                    </Record>
                  );
                })
              ) : (
                <div className="no-record">참여한 방이 없습니다.</div>
              )}
            </ul>
          </section>
        </>
      ) : (
        <MemberOnlyContents>
          로그인 전용 서비스 입니다. 로그인해주세요!
        </MemberOnlyContents>
      )}
    </RecordsWrapper>
  );
}
