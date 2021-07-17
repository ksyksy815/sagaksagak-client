import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../actions/index";

const StyledLogInPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  .login-page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 15px;
    width: 400px;

    @media only screen and (max-width: 445px) {
      width: 90%;
    }

    h1 {
      border-bottom: 2px solid black;
      padding: 10px 0;
      width: 100%;
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
      width: 100%;

      input {
        border: none;
        border-bottom: 1px solid black;
        width: 100%;
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
          width: 100%;
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
  }
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  width: 100%;
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
    axios
      .post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/oauth/google/login`,
        {
          tokenId: res.tokenId,
          subId: res.googleId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const { email, userId, username, subId, accessToken, category } =
          res.data;

        dispatch(logIn(email, userId, username, accessToken, category, subId));

        history.push("/");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
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
  };

  const handleGoogleLogInErr = (err) => {
    console.log(err);
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
          `${process.env.REACT_APP_SERVER_DOMAIN}/user`,
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const { email, accessToken, username, userId, category } = res.data;
          dispatch(logIn(email, userId, username, accessToken, category));
          history.push("/");
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
      <div className="login-page-wrapper">
        <h1>Sign In</h1>
        <form>
          <label>Email</label>
          <input type="text" onChange={handleUserInput("email")}></input>
          <label>Password</label>
          <input type="password" onChange={handleUserInput("password")}></input>
          {errMessage && <p>{errMessage}</p>}
          <div>
            <button onClick={handleLogIn}>Log In</button>
          </div>
        </form>
        <StyledGoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleGoogleLogIn}
          onFailure={handleGoogleLogInErr}
          cookiePolicy={"single_host_origin"}
        />
        <p id="sign-up-link">
          아직 회원이 아니신가요?
          <span onClick={() => history.push("/signup")}>
            회원가입 하러 가기
          </span>
        </p>
      </div>
    </StyledLogInPage>
  );
};

export default LogInPage;
