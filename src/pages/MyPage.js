import React from "react";
import styled from "styled-components";

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
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 70%;
  row-gap: 3rem;
`;

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  div {
    margin: 0;
    font-size: 1.1rem;
    justify-self: center;

    button {
      height: 1.5rem;
      background: #dddddd;
      border: none;
      border-radius: 5px;
      width: 100px;
    }
  }

  label {
    font-size: 1.8rem;
    font-weight: 700;
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        height: 1.5rem;
        background: #dddddd;
        border: none;
        border-radius: 5px;
        width: 100px;
      }
    }
  }

  #email {
    position: relative;
    right: -15px;
    height: 1.5em;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }

  #username {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      position: relative;
      right: -15px;
      font-size: 1.1rem;
      height: 1.5rem;
      border: none;
    }
  }

  #category {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1em;

    div {
      border: solid 1px black;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 100px;
      width: 100px;
      border-radius: 10px;
    }
  }
`;

const MyPage = () => {
  return (
    <StyledMyPage>
      <StyledContentWrapper>
        <StyledSectionWrapper>
          <label>이메일</label>
          <div id="email">test@gmail.com</div>
        </StyledSectionWrapper>
        <StyledSectionWrapper>
          <label>닉네임</label>
          <div id="username">
            <div id="username">나는 실험용</div>
            <button>변경하기</button>
          </div>
        </StyledSectionWrapper>
        <StyledSectionWrapper>
          <label>
            비밀번호
            <div>
              <button>변경하기</button>
            </div>
          </label>
        </StyledSectionWrapper>
        <StyledSectionWrapper>
          <label>
            관심 카테고리
            <div>
              <button>변경하기</button>
            </div>
          </label>
          <div id="category">
            <div>영어</div>
            <div>코딩</div>
            <div>자격증</div>
          </div>
        </StyledSectionWrapper>
        <StyledSectionWrapper>
          <label>
            회원탈퇴
            <div>
              <button>탈퇴</button>
            </div>
          </label>
        </StyledSectionWrapper>
      </StyledContentWrapper>
    </StyledMyPage>
  );
};

export default MyPage;
