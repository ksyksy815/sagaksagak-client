import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../actions/index";

const StyledLogInPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 15px;
  min-height: 100vh;

  h1 {
    border-bottom: 2px solid black;
    padding: 10px 0;
    width: 400px;
    margin: 10px;
  }

  #sign-up-link {
    padding: 1rem;
    font-size: 0.8rem;

    span {
      padding: 0.5rem;
      display: inline-block;
      transition: 0.2s linear;

      &:hover {
        color: #f58820;
        cursor: pointer;
        transform: translateY(-3px);
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    input {
      border: none;
      border-bottom: 1px solid black;
      width: 400px;
      font-size: 1.3rem;

      &:focus {
        outline: none;
      }
    }

    p {
      color: #fa8900;
      margin: 0;
      font-size: 0.9rem;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        border: none;
        width: 400px;
        height: 40px;
        background: #f5d0a9;
        border-radius: 3px;

        &:hover {
          cursor: pointer;
          background: #f58820;
          transition: 0.2s linear;
        }
      }
    }
  }
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogInPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");

  const handleGoogleLogIn = (res) => {
    console.log(res);
  };

  const handleGoogleLogInErr = (res) => {
    console.log(res);
  };

  const handleUserInput = (key) => (e) =>
    setUserInput({ ...userInput, [key]: e.target.value });

  const handleLogIn = (e) => {
    e.preventDefault();

    const { email, password } = userInput;

    if (!email || !password) {
      setErrMessage("이메일과 비밀번호는 필수 항목 입니다");
      return;
    } else if (email && password) {
      setErrMessage("");
      axios
        .post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const { accessToken, userName } = res.data;
          dispatch(logIn(userName, accessToken));
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 401) {
              setErrMessage("잘못된 비밀번호 입니다");
              return;
            } else if (err.response.status === 404) {
              setErrMessage("회원정보를 찾을 수 없습니다");
              return;
            }
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error :", err.message);
          }
          console.log(err.config);
        });
    }
  };

  return (
    <StyledLogInPage>
      <h1>Sign In</h1>
      <form>
        <label>Email</label>
        <input type="text" onChange={handleUserInput("email")}></input>
        <label>Password</label>
        <input type="password" onChange={handleUserInput("password")}></input>
        {errMessage && <p>{errMessage}</p>}
        <div>
          <button onClick={handleLogIn}>Log In</button>
          {/* <button onClick={() => history.push("/signup")}>회원가입</button> */}
        </div>
      </form>
      <StyledGoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={handleGoogleLogIn}
        onFailure={handleGoogleLogInErr}
        cookiePolicy={"single_host_origin"}
      />
      <p id="sign-up-link">
        아직 회원이 아니신가요?
        <span onClick={() => history.push("/signup")}>회원가입 하러 가기</span>
      </p>
    </StyledLogInPage>
  );
};

export default LogInPage;
