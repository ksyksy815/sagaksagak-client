import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledMainNav = styled.nav`
  width: 100vw;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  position: absolute;
  top: 0;
  z-index: 2;

  div {
    display: flex;
    column-gap: 6rem;
    justify-content: center;
    align-items: center;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    text-decoration: none;
    column-gap: 3rem;
    

    li {
      a {
        color: black;
        text-decoration: none;
      }
    }
  }
`


export default function MainNav() {
  return (
    <StyledMainNav>
      <div>Logo Here</div>
      <div>
        <ul>
          <li><Link to='/'>홈</Link></li>
          <li><Link to='/studyroom'>스터디룸</Link></li>
          <li><Link to='/studylog'>스터디로그</Link></li>
        </ul>
        <ul>
          <li><Link to='/login'>로그인</Link></li>
          <li><Link to='/signup'>회원가입</Link></li>
        </ul>
      </div>
    </StyledMainNav>
  )
}
