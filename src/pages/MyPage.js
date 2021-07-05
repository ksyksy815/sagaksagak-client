import React from "react";
import styled from "styled-components";

const StyledMyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px red;
  width: 100vw;
  height: 100vh;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: solid 1px blue;
  width: 50%;
  height: 70%;
`;

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;

  & p {
    margin: 0;
    padding: 10px 0 0 0;
    font-size: 1.1rem;
  }

  & label {
    font-size: 1.8rem;
    font-weight: 700;
    border-bottom: solid 1px black;
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & div {
      display: flex;
      justify-content: center;
      align-items: center;

      & button {
        height: 1.5rem;
        background: #dddddd;
        border: none;
        border-radius: 5px;
        width: 100px;
      }
    }
  }
`;

const MyPage = () => {
  return (
    <StyledMyPage>
      <StyledContentWrapper>
        <StyledSectionWrapper>
          <label>이메일</label>
          <p>test@gmail.com</p>
        </StyledSectionWrapper>
        <StyledSectionWrapper>
          <label>
            닉네임
            <div>
              <button>변경하기</button>
            </div>
          </label>
          <p>나는실험용</p>
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
          <ul></ul>
        </StyledSectionWrapper>
      </StyledContentWrapper>
    </StyledMyPage>
  );
};

export default MyPage;
