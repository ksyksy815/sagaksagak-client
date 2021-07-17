import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken, logIn } from "../../actions/index";
import {
  RecordsWrapper,
  Record,
  MemberOnlyContents,
} from "./StudyRecords.style";
import {
  AiFillPieChart,
  AiOutlineUnorderedList,
  AiFillCaretRight,
} from "react-icons/ai";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dummyRecords } from "./StudyRecordsDummies";
import { logOut } from "../../actions/index";
import getCookie from "../../utilities/getCookie";
import GoToTopButton from "../GoToTopButton";

const pieContentStyle = {
  borderRadius: "15px",
  padding: `0.2rem 0.5rem`,
  border: `none`,
};

const COLORS = ["#A9C2DB", "#ECCC81", "#EBAB87", "#D4859A", "#B685D4"];

export default function StudyRecords() {
  const hasFetchedData = useRef(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.logInStatusReducer);
  const [records, setRecords] = useState([]);
  const [totalHours, setTotalHours] = useState("");
  const [hoursByCategory, setHoursByCategory] = useState([]); //배열

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

        dispatch(logIn(email, userId, username, accessToken, category, subId));
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
            let processed = res.data.records.map((record) => {
              let str = String(record.updatedAt);
              let result = str.slice(0, 10);
              record.updatedAt = result;
              return record;
            });
            setRecords(processed);
            setHoursByCategory(res.data.totalHours);
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
                          let processed = res.data.records.map((record) => {
                            let str = String(record.updatedAt);
                            let result = str.slice(0, 10);
                            record.updatedAt = result;
                            return record;
                          });
                          setRecords(processed);
                          setHoursByCategory(res.data.totalHours);
                        })
                        .catch((err) => console.log(err));
                    });
                });
            } else {
              console.log(err);
            }
          });
        hasFetchedData.current = true;
      }
    }
  }, [
    user.isLogedIn,
    dispatch,
    user.accessToken,
    user.userId,
    hoursByCategory,
  ]);

  useEffect(() => {
    setTotalHours(() => {
      let minutes = 0;
      hoursByCategory.forEach((el) => {
        minutes += el.hours;
      });
      if (minutes < 60) return `${minutes}분`;
      else {
        let hours = Math.round(minutes / 60);
        minutes = minutes % 60;
        return `${hours}시간 ${minutes}분`;
      }
    });
  }, [hoursByCategory]);

  return (
    <RecordsWrapper>
      {user.isLogedIn ? (
        <>
          <section className="records-top">
            <h1>
              <AiFillPieChart /> 나의 총 공부시간: {totalHours}
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
                          <AiFillCaretRight />{" "}
                          {`날짜: ${record.updatedAt || record.date}`}
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
      <GoToTopButton />
    </RecordsWrapper>
  );
}
