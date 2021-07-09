import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { useSelector } from 'react-redux'

export default function LandingPage() {
  const [offsetY, setOffsetY] = useState(0);
  const sectionMid = useRef();

  const state = useSelector( state => state.logInStatusReducer );

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  const divProps = useSpring({
    from: { bottom: "100%", opacity: "0" },
    to: { bottom: "15%", opacity: "1" },
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledLandingPage>
      {
        state.user.isFirstLogedIn && <CategorySelectModal />
      }
      <StyledSectionTop>
        <animated.div style={divProps}>
          <h3>목표 달성을 위한 긴 여정,</h3>
          <h1>사각사각과 함께 하세요!</h1>
          <p>
            Aliquid id voluptatem minus quae ipsam fugit sint nostrum ut
            accusantium magnam laudantium molestias culpa libero error,
            possimus, dolorem saepe veniam non.
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
            <h1>문제 제기: 불편한점</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit beatae fuga sapiente iste explicabo non, commodi
              veniam aliquid ad quos!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit beatae fuga sapiente iste explicabo non, commodi
              veniam aliquid ad quos!
            </p>
          </div>
        </div>
        <div
          className="two"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        >
          <div className="two-text">
            <h1>우리 서비스가 그 불편함을 해소할 수 있다</h1>
            <p>
              사각사각은 이러한 서비스이다. 그러하다 저러하다 스터디룸 페이지에
              가면 여러 방들을 볼 수 있고 선택해서 들어갈 수 있다 자신이
              공부하고자하는 카테고리로 검색도 가능하다
            </p>
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
            <p>
              스터디 로그: 공부하면서 간단한 투두(To-do) 리스트도 작성, 스터디룸
              참여 기록 열람 화상채팅방 안에서도 투두리스트에 접근할 수 있음.
            </p>
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
    </StyledLandingPage>
  );
}
