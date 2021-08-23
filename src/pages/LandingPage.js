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
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'

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
    scroll-snap-stop: always;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    padding: 5rem;
    position: relative;

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
    background-image: url(${image1});
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: bottom 0 left 80%;
    position: relative;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      right: 50%;
    }
  }

  #landing-section2 {
    justify-content: flex-start;
    align-items:center;
    position: relative;
    background: #003366;
    background-image: url(${image2});
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: bottom 0 right 0;  
  }

  #landing-section3 {
    background: #cc6633;
    background-image: url(${image3});
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center left 5rem;
    justify-content: center;
    div {
      position: absolute;
      left: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      row-gap: 2rem;
      h1 {
        font-size: 2.5rem;
      }
    }
  }
  #landing-section4 {
    background: #f5aa14;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2rem;
  }

  // tablet
  @media (max-width: 900px) {
    section {
      padding: 1rem;
    }

    #landing-section1 {
      background-size: 70%;
      div {
        position: static;
      }
    }
    #landing-section2 {
      background-size: 100%;
    }
    #landing-section3 {
      background-position: center left 1rem;
      div {
        left: 45%;
      }
      h1 {
        font-size: 3rem;
      }
    }
  }

  // mobile
  @media (max-width: 425px) {
    section {
      h1 {
          font-size: 2rem;
        }
      button {
        margin-top: 1rem
      }
    }
    #landing-section1 {
      background-size: 90%;
      background-position: top 20% center;
      justify-content: center;
      align-items: flex-end;
      div {
        position: static;
        padding-bottom: 2rem;
      }
    }
    #landing-section2 {
      background-size: 180%;
      background-position: bottom 0 right -100px;
      align-items: flex-start;
      div {
        padding-top: 30%;
      }
    }
    #landing-section3 {
      background-size: 80%;
      background-position: top 80px center;
      align-items: flex-end;
      div {
        position: static;
        left: 0;
        padding-bottom: 3rem;
        article {
          h1 {
            font-size: 2rem;
          }
        }
      }
    }
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

  const animation1 = useScrollFadeIn('down', 1, 0);
  const animation2 = useScrollFadeIn('right', 1, 0.3);
  const animation3 = useScrollFadeIn('left', 1, 0.3);
  const animation4 = useScrollFadeIn('left', 1, 0.6);
  const animation5 = useScrollFadeIn('left', 1, 0.9);
  const animation6 = useScrollFadeIn('up', 1, 0.3);

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
        <div {...animation1}>
          <span>목표 달성을 위한 긴 여정,</span>
          <h1>사각사각과 함께 하세요!</h1>
          <p>사각사각은 화상 채팅을 기반으로한 <br/> 온라인 스터디윗미(Study With Me)입니다.</p>
          <p>때로는 카페처럼, 때로는 도서관처럼! <br/> 내 방에서도 외롭지 않은 공부를 이어가세요.</p>
          <Link to='/studyroom'><Button>Learn More</Button></Link>
        </div>
      </section>
      <section id="landing-section2">
        <div {...animation2}>
          <h1>Q. 스터디윗미(Study With Me)란?</h1>
          <p>화상 채팅을 켜고 온라인상에 함께 모여 공부하는 트랜디한 공부 방법입니다.</p>
          <p>언택트 시대, 사각사각은 여러 사람이 있는 곳에서 더욱 공부가 잘되는 분들을 위해 탄생했습니다.</p>
          <Link to='/studyroom'><Button>Learn More</Button></Link>
        </div>
      </section>
      <section id="landing-section3">
        <div>
          <article {...animation3}>
            <h1>같은 목표를 가진 사람들과 공부하기</h1>
            <p>방 생성 시, 원하는 주제를 선택할 수 있습니다.</p>
            <p>직접 방을 만들거나 다른 사용자가 만든 방을 선택해서 입장할 수 있습니다.</p>
          </article>
          <article {...animation4}>
            <h1>공부 기록과 To-Do 리스트</h1>
            <p>각 주제별 공부 참여 시간 기록을 제공합니다.</p>
            <p>공부방 참여 도중에도, 방을 나와서도 투두 리스트를 작성할 수 있습니다.</p>
          </article>
          <Link to='/studyroom'><Button  {...animation5}>Learn More</Button></Link>
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
