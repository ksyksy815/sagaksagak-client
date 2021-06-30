import { useRef } from 'react'
import styled from 'styled-components'
import imgVideoChat from '../assets/imgVideoChat.svg'

const StyledSectionOne = styled.section`
  width: 100%;
  height: 100vh;
  background: #F4EBE2;
  overflow: hidden; 
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  div {
    max-width: 500px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    z-index: 5;
    position: absolute;
    bottom: 20%;
    left: 10%;
    color: #1B1110;

    h1 {
      font-size: 3rem;
      color: #F58820;
      letter-spacing: 2px;
      margin-top: -0.7rem;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.6;
    }

    button {
      width: 150px;
      padding: 1rem;
      border-radius: 15px;
    }
  }

  img {
    max-width: 900px;
    object-fit: cover;
    position: absolute;
    top: 5%;
    right: 5%;
  }
`

export default function LandingPageTop( { handleView } ) {

  return (
    <StyledSectionOne>
      <div>
        <h3>목표 달성을 위한 긴 여정,</h3>
        <h1>사각사각과 함께 하세요!</h1>
        <p>
          Aliquid id voluptatem minus quae ipsam fugit sint nostrum ut accusantium 
          magnam laudantium molestias culpa libero error, possimus, dolorem saepe 
          veniam non.
        </p>
        <button onClick={handleView}>더 알아보기</button>
      </div>
      <img src={imgVideoChat} alt="Video chat illustration"/>
    </StyledSectionOne>
  )
}
