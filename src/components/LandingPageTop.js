import React from 'react'
import styled from 'styled-components'
import imgVideoChat from '../assets/imgVideoChat.svg'

const StyledSectionOne = styled.section`
  width: 100%;
  height: 100vh;
  background: #EDC8C5;
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

    h1 {
      font-size: 4rem;
    }

    p {
      font-size: 1.2rem;
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

export default function LandingPageTop() {
  return (
    <StyledSectionOne>
      <div>
        <span>내가 그린 기린 그림은...</span>
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Aliquid id voluptatem minus quae ipsam fugit sint nostrum ut accusantium 
          magnam laudantium molestias culpa libero error, possimus, dolorem saepe 
          veniam non.
        </p>
        <button>Learn more</button>
      </div>
      <img src={imgVideoChat} alt="Video chat illustration"/>
    </StyledSectionOne>
  )
}
