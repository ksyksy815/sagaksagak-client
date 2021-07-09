import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { device } from '../device'
import { AiOutlineMenu } from 'react-icons/ai'
import MobileMainNav from '../components/MobileMainNav'

const StyledMainNav = styled.nav`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 100;
  letter-spacing: 1.5px;
  margin: 0 2rem;
  padding: 0.5rem 2rem;
  box-sizing: border-box;

  h2 {
    a {
      text-decoration: none;
      color: #7F554F;
    }
  }
  
  .menu-btn {
    display: none;
    color: #f5f5f5;
    font-size: 2rem;
    &:hover {
      cursor: pointer;
      color: #fff;
    }
  }

  .nav-menus {
    display: flex;
    column-gap: 6rem;
    justify-content: center;
    align-items: center;

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      text-decoration: none;
      column-gap: 3rem;
      
  
      li {
        transition: 0.2s;

        button {
          background: transparent;
          border: none;
          font-size: 1rem;
          
          &:hover {
            transform: translateY(-3px);
            cursor: pointer;
            color: #444444;
          }
  
        }

        a, button {
          color: #444444;
          font-weight: bold;
          text-decoration: none;
          padding: 1rem 0;
        }
        
        &:hover {
          transform: translateY(-3px);
          & a {
            cursor: pointer;
            color: #7F554F;
            
          }
        }
      }
    }
  }

  @media ${device.laptop} {
      max-width: 1200px;
  }

  @media ${device.tablet} {
    background-color: #7F554F;
    .menu-btn {
      display: block;
    }
    .nav-menus {
      display: none;
    }
  }

  @media ${device.mobile} {
    h2 {
      font-size: 1rem;
      color: #fff;
    }
    .menu-btn {
      font-size: 1.5rem;
    }
  }

`

export default function MainNav( {isLogedIn} ) {
  const [menuOn, setMenuOn] = useState(false)

  const handleLogOut = () => {
    //로그아웃 로직 구현
  };

  const toggleMenus = () => {
    setMenuOn(prev=>!prev)
  }


  return (
    <StyledMainNav>
      <h2><Link to='/'>사각사각</Link></h2>
      <AiOutlineMenu className="menu-btn" onClick={toggleMenus}/>
      <div className="nav-menus">
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/studyroom">스터디룸</Link>
          </li>
          <li>
            <Link to="/studylog">스터디로그</Link>
          </li>
        </ul>
        {isLogedIn ? (
          <ul>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li onCLick={handleLogOut}>
              <button>로그아웃</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        )}
      </div>
      {
        menuOn &&
        <MobileMainNav toggleMenus={toggleMenus} isLogedIn={isLogedIn} handleLogOut={handleLogOut} />
      }
    </StyledMainNav>
  );
}
