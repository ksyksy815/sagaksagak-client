import { useRef } from 'react'
import styled from 'styled-components'
import { StyledSectionTop, StyledSectionMid, StyledSectionBottom, ButtonBox, LandingPageBtn } from '../components/LandingPageStyles'
import imgVideoChat from '../assets/imgVideoChat.png'

const StyledLandingPage = styled.div`
  width: 100vw;
  height: 430vh;
  background-color: #F4EBE2;
`

export default function LandingPage() {
  const sectionMid = useRef()
  const executeScroll = () => {
    sectionMid.current.scrollIntoView()
  }

  return (
    <StyledLandingPage>
      <StyledSectionTop>
        <div>
          <h3>목표 달성을 위한 긴 여정,</h3>
          <h1>사각사각과 함께 하세요!</h1>
          <p>
            Aliquid id voluptatem minus quae ipsam fugit sint nostrum ut accusantium 
            magnam laudantium molestias culpa libero error, possimus, dolorem saepe 
            veniam non.
          </p>
          <ButtonBox>
            <LandingPageBtn onClick={executeScroll} backgroundColor={`#F5C3B8`} color={`#DE877F`}>
              더 알아보기
            </LandingPageBtn>
            <LandingPageBtn backgroundColor={`#F5D0A9`} color={`#F58820`}>
              참여하기
            </LandingPageBtn>
            <LandingPageBtn backgroundColor={`#A2C8BF`} color={`#205B5A`}>
              데이빋졍
            </LandingPageBtn>
          </ButtonBox>
        </div>
        <img src={imgVideoChat} alt="Video chat illustration"/>
      </StyledSectionTop>
      <StyledSectionMid>
        <div ref={sectionMid}>
          내용1. 사각사각은 이러한 서비스이다. 그러하다 저러하다
          스터디룸 페이지에 가면 여러 방들을 볼 수 있고 선택해서 들어갈 수 있다
          자신이 공부하고자하는 카테고리로 검색도 가능하다
        </div>
        <div>
          내용2. 스터디 로그: 공부하면서 간단한 투두(To-do) 리스트도 작성, 스터디룸 참여 기록 열람
          화상채팅방 안에서도 투두리스트에 접근할 수 있음.
          버튼: 구경하기
        </div>
        
      </StyledSectionMid>
      <StyledSectionBottom>
        후기 carousel
      </StyledSectionBottom>
    </StyledLandingPage>
  )
}
