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
          err: "사용중인 비밀번호와 변경 비밀번호가 동일합니다",
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
              err: "현재 사용중인 비밀번호를 잘못 입력하였습니다",
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
          passwordErr: "비밀번호는 8자리 이상이어야 합니다",
        });
        break;
      case "2":
        setErrMessage({
          ...errMessage,
          passwordErr: "비밀번호는 영어,숫자,특수문자를 포함해야 합니다",
        });
        break;
      case "3":
        setErrMessage({
          ...errMessage,
          usernameErr: "유저이름은 2글자 이상이어야 합니다",
        });
        break;
      case "4":
        setErrMessage({
          ...errMessage,
          usernameErr:
            "유저이름은 한글,영어,숫자로 구성되며 공백이 없어야 합니다",
        });
        break;
      case "5":
        setErrMessage({
          ...errMessage,
          emailErr: "올바른 이메일을 입력해 주세요",
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
          <h3>비밀번호 변경에 성공하였습니다</h3>
          <h5>잠시후 로그인페이지로 이동합니다</h5>
          <h5>다시 로그인 해주세요</h5>
        </div>
      ) : (
        <form className="PC-Modal-content-wrapper" ref={modalEl}>
          <div className="cur-PW">
            <span>현재 비밀번호</span>
            <input type="password" onChange={handleUserInput("curPW")}></input>
          </div>
          <div className="chan-PW">
            <div>
              <span>새로운 비밀번호</span>
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
              <span>비밀번호 확인</span>
              <input
                type="password"
                onChange={handleUserInput("checkPW")}
              ></input>
            </div>
            {userInput.chanPW &&
              userInput.checkPW &&
              userInput.chanPW !== userInput.checkPW && (
                <p>입력한 비밀번호와 다릅니다</p>
              )}
          </div>
          {errMessage.err && <p>{errMessage.err}</p>}
          <div className="btn-container">
            <button onClick={handleSubmit}>변경하기</button>
            <button onClick={close}>닫기</button>
          </div>
        </form>
      )}
    </StyledPCModal>
  );
};

export default PasswordChangeModal;
