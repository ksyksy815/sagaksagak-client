import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { device } from "../device";
import { BiMenuAltRight } from "react-icons/bi";
import MobileMainNav from "./MobileMainNav";
import { logOut } from "../actions/index";
import axios from "axios";

const MainHeader = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 100;
  letter-spacing: 1.5px;
  padding: 1rem 5rem;
  box-sizing: border-box;
  
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    
    a {
      text-decoration: none;
      color: #fff;
      font-size: 3rem;
      font-family: 'Nanum Pen Script', cursive;
    }
  }

  .menu-btn {
    display: none;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border: none;
    background: transparent;
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
          }
        }

        a,
        button {
          color: #fff;
          text-decoration: none;
          padding: 1rem 0;
        }

        &:hover {
          transform: translateY(-3px);
          & a {
            cursor: pointer;
          }
        }
      }
    }
  }

  @media ${device.laptop} {
    max-width: 1440px;
  }

  @media (max-width: 900px) {
    padding: 1rem;
    h2 {
      a {
        font-size: 2rem;
        color: #fff;
      }
    }

    .menu-btn {
      display: flex;
      font-size: 3rem;
    }
    .nav-menus {
      display: none;
    }
  }
`;

export default function Header({ isLogedIn }) {
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
    <MainHeader>
      <h2>
        <Link to="/">사각사각</Link>
      </h2>
      <button className="menu-btn" onClick={toggleMenus}>
        <BiMenuAltRight />
      </button>
      <nav className="nav-menus">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/studyroom">Room List</Link></li>
          <li><Link to="/studylog">Study Log</Link></li>
        </ul>
        {isLogedIn ? (
          <ul>
            <li><Link to="/mypage">My Page</Link></li>
            <li><button onClick={handleLogOut}>Logout</button></li>
          </ul>
        ) : (
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signin</Link></li>
          </ul>
        )}
      </nav>
      {menuOn && (
        <MobileMainNav
          aniMode={aniMode}
          setAniMode={setAniMode}
          setMenuOn={setMenuOn}
          isLogedIn={isLogedIn}
          handleLogOut={handleLogOut}
        />
      )}
    </MainHeader>
  );
}
