import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import {
  StyledLandingPage,
  StyledSectionTop,
  StyledSectionMid,
  ButtonBox,
  LandingPageBtn,
  ParallaxImg,
} from "../components/LandingPage.styles.js";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import CategorySelectModal from "../components/modals/CategorySelectModal.js";
import imgVideoChat from "../assets/imgVideoChat.png";
import imgStudyingAloneHard from "../assets/imgStudyingAloneHard.svg";
import calculator from "../assets/calculator.svg";
import book from "../assets/book-stack.svg";
import mouse from "../assets/mouse.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logIn, logOut } from "../actions/index";
import getCookie from "../utilities/getCookie";
import GoToTopButton from "../components/GoToTopButton.js";
import { BsBookHalf, BsCheck } from "react-icons/bs";
import videochatView from "../assets/videos/videochatView.mov"
import iMac from '../assets/videos/imac.png'
import roomList from '../assets/videos/roomList.mov'
import studyRecordMov from '../assets/videos/studyRecordMov.mov'

export default function LandingPage() {
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;
  const [isCSModalOpen, setIsCSModalOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const sectionMid = useRef();
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

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  const divProps = useSpring({
    from: { bottom: "100%", opacity: "0" },
    to: { bottom: "15%", opacity: "1" },
  });

  useEffect(() => {
    const setModal = () => {
      modalRef.current();
    };

    const logInRefresh = () => {
      refreshLogInRef.current();
    };

    logInRefresh();
    setModal();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledLandingPage>
      <CategorySelectModal open={isCSModalOpen} close={catSelModalClose} />
      <StyledSectionTop>
        <animated.div style={divProps}>
          <h3>목표 달성을 위한 긴 여정,</h3>
          <h1>사각사각에서 함께 하세요!</h1>
          <p>
            사각사각은 온라인 모각공(모여서 각자 공부) 플랫폼 입니다. <br />
            때로는 카페처럼, 때로는 도서관처럼! <br />내 방에서도 외롭지 않은
            공부를 이어가세요.
          </p>
          <ButtonBox>
            <LandingPageBtn backgroundColor={`#F5D0A9`} color={`#F58820`}>
              <Link to="/studyroom">스터디룸 참여하기</Link>
            </LandingPageBtn>
            <LandingPageBtn backgroundColor={`#A2C8BF`} color={`#205B5A`}>
              <Link to="/studylog">To-do 작성하기</Link>
            </LandingPageBtn>
          </ButtonBox>
        </animated.div>
        <animated.img
          src={imgVideoChat}
          alt="Video chat illustration"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        />
      </StyledSectionTop>
      <StyledSectionMid>
        <ParallaxImg
          img={`url(${calculator})`}
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
          top={`0%`}
          left={`5%`}
        />
        <ParallaxImg
          img={`url(${book})`}
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
          top={`35%`}
          right={`15%`}
        />
        <ParallaxImg
          img={`url(${mouse})`}
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
          bottom={`50%`}
          left={`15%`}
        />
        <div ref={sectionMid} className="one">
          <img
            src={imgStudyingAloneHard}
            alt="Studying alone is not easy"
            style={{ transform: `translateY(${offsetY * 0.1}px)` }}
          />
          <div
            className="one-text"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          >
            <h1>공부 방식은 모두 다릅니다.</h1>
            <p>
              누군가는 혼자 공부할 때 능률이 오릅니다. <br />
              하지만 또 다른 누군가는 여러 사람들이 있는 곳에서 더욱 집중력을
              발휘합니다.
            </p>
            <p>
              언택트가 일상이 된 <span>포스트 코로나 시대</span>. <br />{" "}
              <span>사각사각</span>은 이러한 분들을 위해 탄생했습니다.
            </p>
          </div>
        </div>
        <div
          className="two"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        >
          <div className="two-text">
            <h1>온라인 스터디카페, 사각사각</h1>
            <p>
              <span>사각사각</span>은 같은 목적을 가지고 공부하는 동료들과
              온라인 상으로 함께 공부할 수 있도록 해주는 플랫폼입니다.
            </p>
            <p className="mid-title">
              {" "}
              <BsBookHalf /> 내 방에서도 카페처럼, 도서관처럼!
            </p>
            <p>
              언택트 시대, 사각사각과 함께라면 목표 달성의 여정이 더 이상 외롭지
              않습니다.
            </p>
            <div className="three-btnBox">
              <LandingPageBtn backgroundColor={`#F5C3B8`} color={`#DE877F`}>
                <Link to="/studyroom">체험하기</Link>
              </LandingPageBtn>
            </div>
          </div>
          <div className="two-img">
            <img src={iMac} alt="imac"/>
            <video src={videochatView}  autoPlay muted loop></video>
          </div>
        </div>
        <div
          className="three"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        >
          <div className="three-img-top">
            <img src={iMac} alt="imac"/>
            <video src={roomList}  autoPlay muted loop></video>
          </div>
          <div className="three-text" id="three-text-top">
            <ul>
              <h1>같은 목표를 가진 사람들과 공부하기</h1>
              <li>
                <BsCheck /> 방 생성 시, 원하는 주제를 선택할 수 있습니다.
              </li>
              <li>
                <BsCheck /> 직접 방을 만들거나 다른 사용자가 만든 방을 선택해서
                입장할 수 있습니다.
              </li>
            </ul>
            <ul>
              <h1>방 추천 기능</h1>
              <li>
                <BsCheck /> 사용자 맞춤 주제의 화상 공부방을 추천해드립니다.
              </li>
            </ul>
            <div className="three-btnBox">
              <LandingPageBtn backgroundColor={`#F5C3B8`} color={`#DE877F`}>
                <Link to="/studyroom">스터디룸으로 이동</Link>
              </LandingPageBtn>
            </div>
          </div>
          <div className="three-img-bottom">
            <img src={iMac} alt="imac"/>
            <video src={studyRecordMov}  autoPlay muted loop></video>
          </div>
          <div className="three-text" id="three-text-bottom">
            <ul>
              <h1>스터디 로그 기능</h1>
              <li>
                <BsCheck /> 각 주제별 공부 참여 시간 기록을 제공합니다.
              </li>
            </ul>
            <ul>
              <h1>까먹지 말자! 투두(To-Do) 리스트</h1>
              <li>
                <BsCheck /> 공부방 참여 도중에도, 방을 나와서도 투두 리스트를
                작성할 수 있습니다.
              </li>
            </ul>
            <ul>
              <h1>카메라 On/Off 기능</h1>
              <li>
                <BsCheck /> 원할 때 자유롭게 자신의 영상을 끄고 킬 수 있습니다.
              </li>
            </ul>
            <div className="three-btnBox">
              <LandingPageBtn backgroundColor={`#F5C3B8`} color={`#DE877F`}>
                <Link to="/studylog">스터디로그로 이동</Link>
              </LandingPageBtn>
            </div>
          </div>
        </div>
      </StyledSectionMid>
      <Testimonials />
      <Footer />
      <GoToTopButton />
    </StyledLandingPage>
  );
}
