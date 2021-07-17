import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { device } from "../device";
import { AiOutlineMenu } from "react-icons/ai";
import MobileMainNav from "../components/MobileMainNav";
import { logOut } from "../actions/index";
import axios from "axios";

const StyledMainNav = styled.nav`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  width: 100vw;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 100;
  letter-spacing: 1.5px;
  padding: 0.5rem 2rem;
  box-sizing: border-box;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
      color: #7f554f;
    }
  }

  .menu-btn {
    display: none;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background: #7f554f;
    border: none;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    svg {
      fill: #fff;
      pointer-events: none;
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
          transition: 0.2s;
          &:hover {
            transform: translateY(-3px);
            cursor: pointer;
            color: #7f554f;
          }
        }

        a,
        button {
          color: #444444;
          font-weight: bold;
          text-decoration: none;
          padding: 1rem 0;
        }

        &:hover {
          transform: translateY(-3px);
          & a {
            cursor: pointer;
            color: #7f554f;
          }
        }
      }
    }
  }

  @media ${device.laptop} {
    max-width: 1200px;
  }

  @media ${device.tablet} {
    background-color: #7f554f;

    h2 {
      a {
        font-size: 1.2rem;
        color: #fff;
      }
    }

    .menu-btn {
      display: flex;
    }
    .nav-menus {
      display: none;
    }
  }

  @media ${device.mobile} {
    h2 {
      a {
        font-size: 1.1rem;
        color: #fff;
      }
    }

    .menu-btn {
      font-size: 1.5rem;
    }
  }
`;

export default function MainNav({ isLogedIn }) {
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;
  const [menuOn, setMenuOn] = useState(false);
  const [aniMode, setAniMode] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();

    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/logout`, {
        headers: { authorization: `bearer ${user.accessToken}` },
        withCredentials: true,
      })
      .then(() => {
        dispatch(logOut());
        history.push("/");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  const toggleMenus = () => {
    setMenuOn(!menuOn);
    setAniMode(true);
  };

  return (
    <StyledMainNav>
      <h2>
        <Link to="/">사각사각</Link>
      </h2>
      <button className="menu-btn" onClick={toggleMenus}>
        <AiOutlineMenu />
      </button>
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
            <li>
              <button onClick={handleLogOut}>로그아웃</button>
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
      {menuOn && (
        <MobileMainNav
          aniMode={aniMode}
          setAniMode={setAniMode}
          setMenuOn={setMenuOn}
          isLogedIn={isLogedIn}
          handleLogOut={handleLogOut}
        />
      )}
    </StyledMainNav>
  );
}
