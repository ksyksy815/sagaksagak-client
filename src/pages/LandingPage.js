import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import Footer from "../components/Footer";
import CategorySelectModal from "../components/modals/CategorySelectModal.js";
import { logIn, logOut } from "../actions/index";
import getCookie from "../utilities/getCookie";
import GoToTopButton from "../components/GoToTopButton.js";
import image1 from '../assets/study-with-laptop.png';
import image2 from '../assets/laptop.png';
import image3 from '../assets/livingroom-objects.png';
import { Button } from '../components/WhiteButton.style'
import Testimonials from '../components/Testimonials'

const LandingPageWrapper = styled.div`
  scroll-snap-type: y mandatory;
  width: 100vw;
  max-width: 1440px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  section {
    width: 100vw;
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 5rem;

    span, h1, p {
        color: #fff;
    }

    h1 {
      font-family: 'Nanum Pen Script', cursive;
      font-size: 3.5rem;
    }

    p {
      margin-top: 1rem;
      line-height: 1.6;
    }

    button {
      margin-top: 2rem;
    }
  }

  #landing-section1 {
    background: #003333;
    position: relative;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex: 1 1 auto;

      &:first-child {
        z-index: 10;
        padding-left: 5%;
      }

      &:nth-child(2) {
        position: absolute;
        left: 40%;
        img {
          width: 100%;
          max-width: 600px;
          object-fit: cover;
        }
      }
    }
  }

  #landing-section2 {
    justify-content: flex-start;
    align-items:center;
    position: relative;
    background: #003366;
    img {
      width: 70%;
      object-fit: cover;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  #landing-section3 {
    background: #cc6633;
    column-gap: 3rem;
    div {
      width: 100%;
      height: 100%;

      &:first-child {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
      }

      &:last-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        row-gap: 2rem;
      }
    }
    img {
      width: 100%;
    }
  }
  #landing-section4 {
    background: #f5aa14;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2rem;
  }
`

export default function LandingPage() {
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;
  const [isCSModalOpen, setIsCSModalOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const modalRef = useRef();
  const refreshLogInRef = useRef();

  const handleRefreshLogIn = () => {
    if (!getCookie("refreshToken")) return;

    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`, {
        headers: {
          relogin: true,
        },
        withCredentials: true,
      })
      .then((res) => {
        const { accessToken, username, userId, email, category, subId } =
          res.data;

        dispatch(logIn(email, userId, username, accessToken, category, subId));
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/logout`, {
                headers: { authorization: `bearer ${user.accessToken}` },
                withCredentials: true,
              })
              .then(() => {
                dispatch(logOut());
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
            history.push("/unauthorized");
          }
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  const catSelModalHandle = () => {
    if (user.isFirstLogedIn) setIsCSModalOpen(true);
    else setIsCSModalOpen(false);
  };

  useEffect(() => {
    modalRef.current = catSelModalHandle;
    refreshLogInRef.current = handleRefreshLogIn;
  });

  const catSelModalClose = () => {
    setIsCSModalOpen(false);
  };

  useEffect(() => {
    const setModal = () => { modalRef.current() };
    const logInRefresh = () => { refreshLogInRef.current() };
    logInRefresh();
    setModal();
  }, []);

  return (
    <LandingPageWrapper>
      <CategorySelectModal open={isCSModalOpen} close={catSelModalClose} />
      <section id="landing-section1">
        <div>
          <span>목표 달성을 위한 긴 여정,</span>
          <h1>사각사각과 함께 하세요!</h1>
          <p>사각사각은 화상 채팅을 기반으로한 <br/> 온라인 스터디윗미(Study With Me)입니다.</p>
          <p>때로는 카페처럼, 때로는 도서관처럼! <br/> 내 방에서도 외롭지 않은 공부를 이어가세요.</p>
          <Link to='/studyroom'><Button>Learn More</Button></Link>
        </div>
        <div><img src={image1} alt="A woman studying with a laptop by rawpixel.com"/></div>
      </section>
      <section id="landing-section2">
        <div>
          <h1>Q. 스터디윗미(Study With Me)란?</h1>
          <p>화상 채팅을 켜고 온라인상에 함께 모여 공부하는 트랜디한 공부 방법입니다.</p>
          <p>언택트 시대, 사각사각은 여러 사람이 있는 곳에서 더욱 공부가 잘되는 분들을 위해 탄생했습니다.</p>
          <Link to='/studyroom'><Button>Learn More</Button></Link>
        </div>
        <img src={image2} alt="Laptop by rawpixel.com"/>
      </section>
      <section id="landing-section3">
        <div><img src={image3} alt="Objects by rawpixel.com"></img></div>
        <div>
          <article>
            <h1>title</h1>
            <p>words</p>
          </article>
          <article>
            <h1>title</h1>
            <p>words</p>
          </article>
        </div>
      </section>
      <section id="landing-section4">
        <h1>Testimonials</h1>
        <Testimonials />
      </section>
      <Footer />
      <GoToTopButton />
    </LandingPageWrapper>
  );
}
