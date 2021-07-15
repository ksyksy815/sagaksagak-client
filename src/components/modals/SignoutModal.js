import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logOut } from "../../actions/index";

const StyledSignoutModal = styled.div`
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

  .SO-Modal-content-wrapper {
    background: white;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: modal-show 0.3s;
    padding: 40px 20px;
    row-gap: 30px;

    p {
      color: #fa8900;
      font-size: 1rem;
    }
  }

  .password-input-container {
    display: flex;
    align-items: center;
    column-gap: 10px;

    span {
      font-weight: 600;
    }

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

const SignoutModal = ({ open, close }) => {
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;
  const [errMessage, setErrMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [signoutSuccess, setSignoutSuccess] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const modalEl = useRef();

  useOnClickOutside(modalEl, () => {
    close();
  });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSignout = (e) => {
    e.preventDefault();

    setErrMessage("");

    if (!userInput) {
      setErrMessage("비밀번호를 입력해 주세요");
      return;
    }

    axios
      .delete(`${process.env.REACT_APP_SERVER_DOMAIN}/user/${user.userId}`, {
        headers: { password: userInput },
        withCredentials: true,
      })
      .then(() => {
        setSignoutSuccess(true);
        dispatch(logOut());
        setTimeout(() => history.push("/"), 5000);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            setErrMessage("잘못된 비밀번호 입니다");
            return;
          }
          if (err.response.status === 403) {
            dispatch(logOut());
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

  return (
    <StyledSignoutModal open={open}>
      {signoutSuccess ? (
        <div className="SO-Modal-content-wrapper" ref={modalEl}>
          <h3>회원탈퇴에 성공하였습니다</h3>
          <h3>잠시후 메인페이지로 이동합니다</h3>
        </div>
      ) : (
        <div className="SO-Modal-content-wrapper" ref={modalEl}>
          <div className="password-input-container">
            <span>비밀번호</span>
            <input type="password" onChange={handleUserInput}></input>
          </div>
          {errMessage && <p>{errMessage}</p>}
          <div className="btn-container">
            <button onClick={handleSignout}>회원탈퇴</button>
            <button onClick={close}>닫기</button>
          </div>
        </div>
      )}
    </StyledSignoutModal>
  );
};

export default SignoutModal;
