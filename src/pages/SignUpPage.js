import React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

const SignUpPage = () => {
  const handleLogIn = (res) => {
    console.log(res);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>email</label>
        <input type="text"></input>
        {/* 에러메세지 */}
        <label>username</label>
        <input type="text"></input>
        {/* 에러메세지 */}
        <label>password</label>
        <input type="password"></input>
        {/* 에러메세지 */}
        <label>password check</label>
        <input type="password"></input>
        {/* 에러메세지 */}
        <button>Submit</button>
      </form>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={handleLogIn}
        onFailure={handleLogIn}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default SignUpPage;
