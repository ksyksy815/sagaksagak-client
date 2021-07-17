import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { device } from "../device";

const slideIn = keyframes`
  from {
    right: -500px;
  }
  to {
    right: 0;
  }
`;

const slideOut = keyframes`
  from {
    right: 0;
  }
  to {
    right: -500px;
  }
`;

const MobileNav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 100vh;
  background: green;
  z-index: 5000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ebebeb;
  animation: ${(props) =>
    props.aniMode
      ? css`
          ${slideIn} ease-in-out 0.3s
        `
      : css`
          ${slideOut} ease-in-out 0.3s
        `};

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
      text-align: center;
      transition: 0.2s;
      display: flex;
      a {
        width: 100%;
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
        padding: 2rem 0;
      }
      button {
        width: 100%;
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
        padding: 2rem 0;
        border: none;
        &:hover {
          cursor: pointer;
        }
      }

      &:hover {
        cursor: pointer;
        background: #f5f5f5;
        transform: translateY(-3px);
        & a {
          font-weight: bold;
        }
        & button {
          font-weight: bold;
        }
      }
    }
  }

  @media ${device.mobile} {
    width: 100vw;
  }
`;

export default function MobileMainNav({
  aniMode,
  setAniMode,
  setMenuOn,
  isLogedIn,
  handleLogOut,
}) {
  const [shouldRender, setShouldRender] = useState(aniMode);

  const closeMenu = useCallback(() => {
    setAniMode(false);
  }, [setAniMode]);

  const onAnimationEnd = () => {
    if (!aniMode) {
      setShouldRender(false);
    }
  };

  const handleExitKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") closeMenu();
    },
    [closeMenu]
  );

  useEffect(() => {
    if (aniMode) setShouldRender(true);
  }, [aniMode]);

  useEffect(() => {
    window.addEventListener("keydown", handleExitKeyPress);
    return () => window.removeEventListener("keydown", handleExitKeyPress);
  }, [handleExitKeyPress]);

  return (
    shouldRender && (
      <MobileNav aniMode={aniMode} onAnimationEnd={onAnimationEnd}>
        <AiFillCloseCircle className="mobile-menu-close" onClick={closeMenu} />
        <ul>
          <li onClick={closeMenu}>
            <Link to="/">홈</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/studyroom">스터디룸</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/studylog">스터디로그</Link>
          </li>
        </ul>

        {isLogedIn ? (
          <ul>
            <li onClick={closeMenu}>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li onClick={handleLogOut}>
              <button>로그아웃</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li onClick={closeMenu}>
              <Link to="/login">로그인</Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        )}
      </MobileNav>
    )
  );
}
