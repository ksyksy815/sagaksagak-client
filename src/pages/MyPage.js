import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  changeUsername,
  logOut,
  setAccessToken,
  logIn,
} from "../actions/index";
import styled from "styled-components";
import axios from "axios";
import CategorySelectModal from "../components/modals/CategorySelectModal";
import { usernameCheck } from "../utilities/availCheck";
import PasswordChangeModal from "../components/modals/PasswordChangeModal";
import SignoutModal from "../components/modals/SignoutModal";
import getCookie from "../utilities/getCookie";
import { IoIosSchool } from "react-icons/io";
import {
  FaSchool,
  FaLanguage,
  FaLaptopCode,
  FaRegBuilding,
  FaRegIdBadge,
  FaBrush,
  FaPlayCircle,
} from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { GiPoliceBadge } from "react-icons/gi";

const StyledMyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StyledContentWrapper = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: 70%;
  row-gap: 3rem;

  @media only screen and (max-width: 470px) {
    width: 90%;
    row-gap: 2rem;
  }

  label {
    font-size: 1.7em;
    font-weight: 600;

    @media only screen and (max-width: 470px) {
      font-size: 1.2em;
    }
  }

  button {
    border: none;
    border-radius: 20px;
    background: lightgray;
    height: 40px;
    min-width: 70px;
    cursor: pointer;
    color: white;

    @media only screen and (max-width: 470px) {
      font-size: 0.8em;
    }
  }

  .content-email {
    display: flex;
    column-gap: 30px;
    align-items: center;
    width: 100%;

    @media only screen and (max-width: 470px) {
      column-gap: 20px;
    }

    label {
      min-width: 60px;
    }

    div {
      border-radius: 20px;
      height: 40px;
      width: 310px;
      border: solid 1px lightgray;
      box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .content-username {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    width: 100%;

    label {
      min-width: 80px;

      @media only screen and (max-width: 470px) {
        min-width: 60px;
      }
    }

    .username-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 30px;

      @media only screen and (max-width: 470px) {
        column-gap: 20px;
      }

      div {
        display: flex;
        flex-direction: row;
        column-gap: 20px;
        align-items: center;
        width: 100%;

        input {
          border-radius: 20px;
          height: 40px;
          border: solid 1px lightgray;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
          padding: 0 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-x: scroll;
          width: 100%;

          &:focus {
            outline: none;
          }
        }
      }
    }

    .error-message {
      color: #fa8900;
      font-size: 0.8rem;
      align-self: center;
      padding: 5px 0 0 0;
    }
  }

  .content-password {
    display: flex;
    column-gap: 30px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .content-category {
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 10px;

    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 30px;
    }

    .category-items {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .categories {
        position: relative;
        top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 10px;
        align-items: center;
        text-align: center;
        height: 100px;
        width: 100px;
        border-radius: 10px;
        border: solid 1px lightgray;
      }

      .no-category {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .content-signout {
    display: flex;
    column-gap: 30px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const renderIconByCategory = (category) => {
  switch (category) {
    case "????????????":
      return <IoIosSchool fontSize={30} />;
    case "????????????":
      return <FaSchool fontSize={30} />;
    case "??????":
      return <FaLanguage fontSize={30} />;
    case "???2?????????":
      return <BiWorld fontSize={30} />;
    case "??????":
      return <FaLaptopCode fontSize={30} />;
    case "??????":
      return <FaRegBuilding fontSize={30} />;
    case "?????????":
      return <FaRegIdBadge fontSize={30} />;
    case "?????????":
      return <GiPoliceBadge fontSize={30} />;
    case "?????????":
      return <FaBrush fontSize={30} />;
    case "??????":
      return <FaPlayCircle fontSize={30} />;
    default: return;
  }
};

const MyPage = () => {
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;
  const [categorySelectMode, setCategorySelectMode] = useState(false);
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [signoutMode, setSignoutMode] = useState(false);
  const [usernameChanErr, setUsernameChanErr] = useState("");
  const [userInput, setUserInput] = useState("");
  const [placeHolderOutput, setPlaceHolderOutput] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const refreshLogInRef = useRef();

  useEffect(() => {
    refreshLogInRef.current = handleRefreshLogIn;
  });

  useEffect(() => {
    const logInRefresh = () => {
      refreshLogInRef.current();
    };

    logInRefresh();
  }, []);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleCSModalClose = () => {
    setCategorySelectMode(false);
  };

  const handlePCModalClose = () => {
    setPasswordChangeMode(false);
  };

  const handleSOModalClose = () => {
    setSignoutMode(false);
  };

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

  const handleChangeUsername = (e) => {
    e.preventDefault();

    if (!userInput) return;

    if (user.username === userInput) return;

    if (usernameCheck(userInput) !== "usernameAvail") return;

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/user/${user.userId}/username`,
        {
          newusername: userInput,
        },
        {
          headers: {
            authorization: `bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setUsernameChanErr("???????????? ?????????????????????");
        dispatch(changeUsername(userInput));
        setPlaceHolderOutput(userInput);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            setUsernameChanErr("???????????? ??????????????? ????????????");
          } else if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
              .then((res) => {
                dispatch(setAccessToken(res.data.accessToken));

                axios
                  .patch(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/user/${user.userId}/username`,
                    {
                      newusername: userInput,
                    },
                    {
                      headers: {
                        authorization: `bearer ${user.accessToken}`,
                      },
                      withCredentials: true,
                    }
                  )
                  .then(() => {
                    setUsernameChanErr("???????????? ?????????????????????");
                    dispatch(changeUsername(userInput));
                    setPlaceHolderOutput(userInput);
                  })
                  .catch((err) => {
                    if (err.response) {
                      if (err.response.status === 409) {
                        setUsernameChanErr("???????????? ??????????????? ????????????");
                      }
                      console.log(err.response);
                    } else if (err.request) {
                      console.log(err.request);
                    } else {
                      console.log("Error :", err.message);
                    }
                    console.log(err.config);
                  });
              })
              .catch((err) => {
                if (err.response) {
                  if (err.response.status === 403) {
                    dispatch(logOut);
                    axios
                      .get(
                        `${process.env.REACT_APP_SERVER_DOMAIN}/user/logout`,
                        {
                          headers: {
                            authorization: `bearer ${user.accessToken}`,
                          },
                          withCredentials: true,
                        }
                      )
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

  const handleErrMessage = (message) => {
    switch (message) {
      case "1":
        setUsernameChanErr("??????????????? 8?????? ??????????????? ?????????");
        break;
      case "2":
        setUsernameChanErr("??????????????? ??????,??????,??????????????? ???????????? ?????????");
        break;
      case "3":
        setUsernameChanErr("??????????????? 2?????? ??????????????? ?????????");
        break;
      case "4":
        setUsernameChanErr(
          "??????????????? ??????,??????,????????? ???????????? ????????? ????????? ?????????"
        );
        break;
      case "5":
        setUsernameChanErr("????????? ???????????? ????????? ?????????");
        break;
      case "emailAvail":
        setUsernameChanErr("");
        break;
      case "usernameAvail":
        setUsernameChanErr("");
        break;
      case "passwordAvail":
        setUsernameChanErr("");
        break;
      default:
        return "";
    }
  };

  return (
    <StyledMyPage>
      <StyledContentWrapper>
        {categorySelectMode && (
          <CategorySelectModal
            open={categorySelectMode}
            close={handleCSModalClose}
          />
        )}
        {passwordChangeMode && (
          <PasswordChangeModal
            open={passwordChangeMode}
            close={handlePCModalClose}
          />
        )}
        {signoutMode && (
          <SignoutModal open={signoutMode} close={handleSOModalClose} />
        )}
        <div className="content-email">
          <label>?????????</label>
          <div>{user.email}</div>
        </div>
        <div className="content-username">
          <div className="username-info">
            <label>?????????</label>
            <div>
              <input
                type="text"
                placeholder={
                  placeHolderOutput
                    ? `${placeHolderOutput}`
                    : `${user.username}`
                }
                onChange={handleUserInput}
                onKeyUp={() => handleErrMessage(usernameCheck(userInput))}
              ></input>
              <button onClick={handleChangeUsername}>????????????</button>
            </div>
          </div>
          {usernameChanErr && (
            <div className="error-message">{usernameChanErr}</div>
          )}
        </div>
        <div className="content-category">
          <div className="category-header">
            <label>?????? ????????????</label>
            <button onClick={() => setCategorySelectMode(true)}>
              ????????????
            </button>
          </div>
          <div className="category-items">
            {user.category.length === 0 ? (
              <div className="no-category">????????? ???????????? ????????????</div>
            ) : (
              user.category.map((category) => {
                return (
                  <div className="categories">
                    {renderIconByCategory(category)}
                    {category}
                  </div>
                );
              })
            )}
          </div>
        </div>
        {!user.googleId && (
          <>
            <div className="content-password">
              <label>????????????</label>
              <button onClick={() => setPasswordChangeMode(true)}>
                ????????????
              </button>
            </div>
            <div className="content-signout">
              <label>????????????</label>
              <button onClick={() => setSignoutMode(true)}>??????</button>
            </div>
          </>
        )}
      </StyledContentWrapper>
    </StyledMyPage>
  );
};

export default MyPage;
