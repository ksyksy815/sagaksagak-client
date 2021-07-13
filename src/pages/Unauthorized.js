import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import squid from '../assets/squid.jpeg'
import { TiSpiral } from 'react-icons/ti'
import { device } from '../device'

const UnauthorizedPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #191919;
  overflow: hidden;
  position: relative;
  column-gap: 1rem;

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    row-gap: 1rem;

    button {
      padding: 0.3rem 1rem;
      border: none;
      background-color: #ebebeb;
      border-radius: 15px;

      &:hover {
        cursor: pointer;
      }
    }
  }
  span {
    color: #fff;
    font-size: 5rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
  }
  p {
    color: #fff;
  }
  
  img {
    object-fit: cover;
  }

  .pic {
    position: relative;
    display: flex;

    div{
      font-size: 5rem;

      svg {
        position: absolute;
        fill: red;
        bottom: 300px;
        z-index: 100;
      }

      #left {
        right: 150px;
      }
      #right {
        right: 30px;
      }
    }
  }

  @media ${device.tablet} {
    flex-direction: column-reverse;

    .text {
      position: absolute;
        z-index: 50;
        bottom: 50px;
        left: 50px;
      span {
        font-size: 3rem;
        
      }
    }
  }

  @media ${device.mobile} {
    .text {
      top: 150px;
      left: 20px;
      span {
        font-size: 2rem;
      }

    }
  }
`

export default function Unauthorized() {
  const history = useHistory()
  const handleClick = () => {
    history.push('/')
  }

  return (
    <UnauthorizedPage>
      <div className="text">
        <span>Hey, wake up!</span>
        <p>잘못된 요청입니다. 로그인 후 시도해주세요!</p>
        <button onClick={handleClick}>메인페이지로 돌아가기</button>
      </div>
      <div className="pic">
        <img src={squid} alt="잠자는 짬뽕 속의 오징어"/>
        <div>
          <TiSpiral id="left"/>
          <TiSpiral id="right"/>
        </div>
      </div>
    </UnauthorizedPage>
  )
}
