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

        if (subId)
          dispatch(
            logIn(email, userId, username, accessToken, category, subId)
          );
        dispatch(logIn(email, userId, username, accessToken, category));
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
          <h1>사각사각과 함께 하세요!</h1>
          <p>
            <h4>도서관 분위기를 내거나 가고 싶은데 귀찮으시다고요?</h4>
            <h4>공부계획을 적고 공부시간을 한 눈에 보고 싶으시다고요?</h4>
            <h3>사각사각이 이 모든 고민을 해결해드리겠습니다.</h3>
            <h3>나만의 스터디 플랫폼이 필요하시다면 사각사각이 함께하겠습니다.</h3>
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
            <h1>"언텍트 시대, <br /> 혼자 공부하기 너무 힘들어요!"</h1>
            <p><h4>사람들마다 다양한 공부 체질이 존재합니다.</h4></p>
            <p><h4>혼자 공부할 때 더 능률이 오르는 체질, 또는 같이 공부할 때 더
              능률이 오르는 체질이 존재합니다.</h4></p>
            <p><h4>저희 사각사각은 이러한 같이 공부하고 싶은 사람들을 위해, 언택트 시대임에도 불구하고
              같은 목적을 가지고 공부하는 동료들과 같은 방에서 공부할 수 있도록 하게 해주는 플랫폼입니다.</h4></p>
          </div>
        </div>
        <div
          className="two"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        >
          <div className="two-text">
            <h1>집에서도 카페처럼, 도서관처럼!</h1>
            <p><h4>사각사각은 카메라를 켜서 서로 공부할수 있는 모습을 보며 카페처럼 도서관처럼
              공부할수있는 서비스이다.</h4></p>
            <p><h4>사용자는 카메라를 껐다가 켰다가 할 수 있어 부담없이 자유롭게 공부하는 분위기를 즐길 수 있다.</h4></p>
            <p><h4>사용자는 스터디룸이라는 곳에 가면 여러 방들을 선택해서 입장할 수 있고 사용자 본인이 원하는 방을 만들수 있다.</h4></p>
            <p><h4>사용자는 선택한 관심사와 검색한 내용을 바탕으로 사용자에게 더 관심있을 방들이 추천되어진다.</h4></p>
          </div>
          <div className="two-img">화상 채팅 사용 비주얼 요기에</div>
        </div>
        <div
          className="three"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        >
          <div className="three-img">화상 채팅 사용 비주얼 요기에</div>
          <div className="three-text">
            <h1>그러하다 이런 것도 할 수 있다</h1>
            <p><h4>저희 서비스는 단지 같이 공부할 수 있는 방 뿐만이 아니라
              사용자가 미리 공부할 내용을 만들어 스터디로그라고 하는 미니 다이어리 서비스도 제공드립니다.</h4></p>
            <p><h4>사용자는 스터디로그에서 공부한 내용을 적고 완료되어 체크하면 완료된 목록으로 자동으로 넘어갑니다.</h4></p>
            <p><h4>사용자는 또한 원하는 관심사별로 공부기록도 한눈에 차트로 알아볼 수 있습니다.</h4></p>
            <p><h4>아 참!! 사용자는 공부방에서도 갑자기 급하게 해야할 공부 목록이 생각났다면 공부방에서도 공부할 내용을 저장할 수 있습니다</h4></p>
            <div className="three-btnBox">
              <LandingPageBtn backgroundColor={`#F5C3B8`} color={`#DE877F`}>
                <Link to="/studyroom">스터디룸 참여하기</Link>
              </LandingPageBtn>
              <LandingPageBtn backgroundColor={`#A2C8BF`} color={`#205B5A`}>
                <Link to="/studylog">To-do 작성하기</Link>
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
