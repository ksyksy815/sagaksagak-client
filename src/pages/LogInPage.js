import React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

const StyledLogInPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 30px;
  min-height: 100vh;

  h1 {
    border-bottom: 2px solid black;
    padding: 10px 0;
    width: 300px;
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    input {
      border: none;
      border-bottom: 1px solid black;
      width: 300px;
      font-size: 1.3rem;

      &:focus {
        outline: none;
      }
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        border: none;
        width: 130px;
        height: 40px;
        background: #f5cb42;
        border-radius: 3px;

        &:hover {
          cursor: pointer;
          background: #f5b342;
          transition: 0.2s linear;
        }
      }
    }
  }
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  width: 300px;
`;

const LogInPage = () => {
  const handleLogIn = (res) => {
    console.log(res);
  };

  return (
    <StyledLogInPage>
      <h1>Sign In</h1>
      <form>
        <label>email</label>
        <input type="text"></input>
        {/* 에러메세지 */}
        <label>password</label>
        <input type="password"></input>
        {/* 에러메세지 */}
        <div>
          <button>로그인</button>
          <button>회원가입</button>
        </div>
        {/* OAuth 로그인 컴포넌트 */}
      </form>
      <StyledGoogleLogin
        clientId="683197008025-foad0k2r2fklt9dk5fh6uhde9j4befti.apps.googleusercontent.com"
        onSuccess={handleLogIn}
        onFailure={handleLogIn}
        cookiePolicy={"single_host_origin"}
      />
    </StyledLogInPage>
  );
};

export default LogInPage;
