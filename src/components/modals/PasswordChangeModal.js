import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { passwordCheck } from "../../utilities/availCheck";
import { useHistory } from "react-router";
import { logOut, setAccessToken } from "../../actions/index";

const StyledPCModal = styled.div`
  ${(props) =>
    props.open
      ? `display: flex;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        align-items: center;
        justify-content: center;
        animation: modal-bg-show .3s;`
      : `display: none;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;`}
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  .PC-Modal-success {
    background: white;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: modal-show 0.3s;
    padding: 40px 20px;
    row-gap: 30px;
  }

  .PC-Modal-content-wrapper {
    background: white;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    animation: modal-show 0.3s;
    padding: 40px 20px;
    row-gap: 30px;

    .cur-PW {
      display: flex;
      align-items: center;
      column-gap: 10px;

      input {
        border-radius: 20px;
        height: 30px;
        width: 240px;
        border: solid 1px lightgray;
        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
        padding: 0 20px;

        &:focus {
          outline: none;
        }
      }
    }

    .chan-PW {
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        column-gap: 10px;

        input {
          border-radius: 20px;
          height: 30px;
          width: 240px;
          border: solid 1px lightgray;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
          padding: 0 20px;

          &:focus {
            outline: none;
          }
        }
      }
    }

    .check-PW {
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        column-gap: 10px;

        input {
          border-radius: 20px;
          height: 30px;
          width: 240px;
          border: solid 1px lightgray;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
          padding: 0 20px;

          &:focus {
            outline: none;
          }
        }
      }
    }

    .btn-container {
      align-self: center;
      display: flex;
      column-gap: 30px;

      button {
        align-self: center;
        border: none;
        border-radius: 10px;
        background: #7f554f;
        height: 30px;
        width: 80px;
        cursor: pointer;
        color: white;
        font-size: 0.9em;
        font-weight: 500;
      }
    }

    p {
      color: #fa8900;
      font-size: 0.8rem;
      padding: 5px;
      align-self: center;
    }

    span {
      font-weight: 600;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0px;
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const PasswordChangeModal = ({ open, close }) => {
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;

  const dispatch = useDispatch();
  const history = useHistory();

  const [userInput, setUserInput] = useState({
    curPW: "",
    chanPW: "",
    checkPW: "",
  });
  const [errMessage, setErrMessage] = useState({
    passwordErr: "",
    passwordCheckErr: "",
    err: "",
  });
  const [changeSuccess, setchangeSuccess] = useState(false);

  const modalEl = useRef();

  useOnClickOutside(modalEl, () => {
    close();
  });

  const handleUserInput = (key) => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInput.curPW || !userInput.chanPW || !userInput.chanPW) return;
    if (userInput.chanPW !== userInput.checkPW) return;
    if (userInput.curPW === userInput.chanPW) {
      setErrMessage((prev) => {
        return {
          ...prev,
          err: "???????????? ??????????????? ?????? ??????????????? ???????????????",
        };
      });
      return;
    }
    if (passwordCheck(userInput.chanPW) !== "passwordAvail") return;

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/user/${user.userId}/password`,
        {
          currentpassword: userInput.curPW,
          newpassword: userInput.chanPW,
        },
        {
          headers: { authorization: `bearer ${user.accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        setErrMessage({ ...errMessage, err: "" });
        setchangeSuccess(true);
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
        setTimeout(() => history.push("/login"), 5000);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            setErrMessage({
              ...errMessage,
              err: "?????? ???????????? ??????????????? ?????? ?????????????????????",
            });
          } else if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
              .then((res) => {
                dispatch(setAccessToken(res.data.accessToken));

                axios
                  .patch(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/user/${user.userId}/password`,
                    {
                      currentpassword: userInput.curPW,
                      newpassword: userInput.chanPW,
                    },
                    {
                      headers: {
                        authorization: `bearer ${user.accessToken}`,
                      },
                      withCredentials: true,
                    }
                  )
                  .then(() => {
                    setErrMessage({ ...errMessage, err: "" });
                    setchangeSuccess(true);
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
                    setTimeout(() => history.push("/login"), 5000);
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
              })
              .catch((err) => {
                if (err.response) {
                  if (err.response.status === 403) {
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
        setErrMessage({
          ...errMessage,
          passwordErr: "??????????????? 8?????? ??????????????? ?????????",
        });
        break;
      case "2":
        setErrMessage({
          ...errMessage,
          passwordErr: "??????????????? ??????,??????,??????????????? ???????????? ?????????",
        });
        break;
      case "3":
        setErrMessage({
          ...errMessage,
          usernameErr: "??????????????? 2?????? ??????????????? ?????????",
        });
        break;
      case "4":
        setErrMessage({
          ...errMessage,
          usernameErr:
            "??????????????? ??????,??????,????????? ???????????? ????????? ????????? ?????????",
        });
        break;
      case "5":
        setErrMessage({
          ...errMessage,
          emailErr: "????????? ???????????? ????????? ?????????",
        });
        break;
      case "emailAvail":
        setErrMessage({
          ...errMessage,
          emailErr: "",
        });
        break;
      case "usernameAvail":
        setErrMessage({
          ...errMessage,
          usernameErr: "",
        });
        break;
      case "passwordAvail":
        setErrMessage({
          ...errMessage,
          passwordErr: "",
        });
        break;
      default:
        return "";
    }
  };

  return (
    <StyledPCModal open={open}>
      {changeSuccess ? (
        <div className="PC-Modal-success">
          <h3>???????????? ????????? ?????????????????????</h3>
          <h5>????????? ????????????????????? ???????????????</h5>
          <h5>?????? ????????? ????????????</h5>
        </div>
      ) : (
        <form className="PC-Modal-content-wrapper" ref={modalEl}>
          <div className="cur-PW">
            <span>?????? ????????????</span>
            <input type="password" onChange={handleUserInput("curPW")}></input>
          </div>
          <div className="chan-PW">
            <div>
              <span>????????? ????????????</span>
              <input
                type="password"
                onChange={handleUserInput("chanPW")}
                onKeyUp={() =>
                  handleErrMessage(passwordCheck(userInput.chanPW))
                }
              ></input>
            </div>
            {errMessage.passwordErr && <p>{errMessage.passwordErr}</p>}
          </div>
          <div className="check-PW">
            <div>
              <span>???????????? ??????</span>
              <input
                type="password"
                onChange={handleUserInput("checkPW")}
              ></input>
            </div>
            {userInput.chanPW &&
              userInput.checkPW &&
              userInput.chanPW !== userInput.checkPW && (
                <p>????????? ??????????????? ????????????</p>
              )}
          </div>
          {errMessage.err && <p>{errMessage.err}</p>}
          <div className="btn-container">
            <button onClick={handleSubmit}>????????????</button>
            <button onClick={close}>??????</button>
          </div>
        </form>
      )}
    </StyledPCModal>
  );
};

export default PasswordChangeModal;
