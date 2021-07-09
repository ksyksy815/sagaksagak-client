import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AiFillCloseCircle } from 'react-icons/ai'

const MobileNav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  width: 80vw;
  height: 100vh;
  background: green;
  z-index: 5000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #EBEBEB;

  .mobile-menu-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;

    &:hover {
      cursor: pointer;
    }
  }

  ul {
    list-style: none;
    width: 100%;
    li {
      width: 100%;
      text-align: center;
      padding: 2rem 0;
      transition: 0.2s;

      a {
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
      }

      &:hover {
        cursor: pointer;
        background: #f5f5f5;
        transform: translateY(-3px);
        & a {
          font-weight: bold;
        }
      }
    }
  }
`

export default function MobileMainNav({toggleMenus, isLogedIn, handleLogOut}) {
  const closeMenu = () => {
    toggleMenus()
  }

  useEffect(() => {
    window.addEventListener('click', closeMenu)
    
    return(()=> window.removeEventListener('click', closeMenu))
  }, [])

  return (
    <MobileNav>
      <AiFillCloseCircle className="mobile-menu-close" onClick={closeMenu}/>
      <ul>
        <li><Link to='/'>홈</Link></li>
        <li><Link to='/studyroom'>스터디룸</Link></li>
        <li><Link to='/studylog'>스터디로그</Link></li>
      </ul>

      {
        isLogedIn ? 
        <ul>
          <li><Link to='/mypage'>마이페이지</Link></li>
          <li onCLick={handleLogOut}><button>로그아웃</button></li>
        </ul>
          :
        <ul>
          <li><Link to='/login'>로그인</Link></li>
          <li><Link to='/signup'>회원가입</Link></li>
        </ul>
      }
    </MobileNav>
  )
}
