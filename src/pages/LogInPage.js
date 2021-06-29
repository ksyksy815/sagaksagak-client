import React from "react";
import GoogleLogin from "react-google-login";

const LogInPage = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="email"></input>
        {/* 에러메세지 */}
        <input type="password" placeholder="password"></input>
        {/* 에러메세지 */}
        <div>
          <button>로그인</button>
          <button>회원가입</button>
        </div>
        {/* OAuth 로그인 컴포넌트 */}
        <GoogleLogin
          clientId=''
          onSuccess={}
          onFailure={ }
          cookiePolicy={'single_host_origin'}
        />
      </form>
    </div>
  );
};

export default LogInPage;
