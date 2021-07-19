import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

const images = [
  {
    국내입시:
      "https://images.unsplash.com/photo-1584601218757-8a412705aaa6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2F0JTIwZXhhbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=60",
  },
  {
    코딩: "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGluZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=1200&q=60",
  },
  {
    영어: "https://images.unsplash.com/photo-1517849325426-6eac321919a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlYXJuaW5nJTIwZW5nbGlzaHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=60",
  },
  {
    해외입시:
      "https://images.unsplash.com/photo-1604872423159-61ef082dab75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  },
  {
    제2외국어:
      "https://images.unsplash.com/photo-1557728939-a173794e8672?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  },
  {
    취업: "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  },
  {
    자격증:
      "https://images.unsplash.com/photo-1614036417651-efe5912149d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  },
  {
    공무원:
      "https://images.unsplash.com/photo-1453873531674-2151bcd01707?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
  },
  {
    예체능:
      "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  },
  {
    자유: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  },
];

const StyledSlider = styled.section`
  position: relative;
  height: 400px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  @media only screen and (max-width: 500px) {
    height: 350px;
  }

  .err-message {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const getWidth = () => {
  if (window.innerWidth > 1010) return 1010;
  return window.innerWidth;
};

const Slider = ({ recommend, handleEntrance, loading }) => {
  const getImage = (roomList) => {
    const mappedRooms = roomList.map((r) => {
      return {
        ...r,
        image: images.filter(
          (image) => Object.keys(image)[0] === r.category
        )[0][r.category],
      };
    });

    return mappedRooms;
  };

  const mappedRoomList = getImage(recommend);

  const firstSlide = mappedRoomList[0];
  const secondSlide = mappedRoomList[1];
  const lastSlide = mappedRoomList[mappedRoomList.length - 1];

  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { translate, transition, activeIndex, _slides } = state;

  const autoPlayRef = useRef();
  const transitionRef = useRef();
  const resizeRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const smooth = (e) => {
      if (e.target.id === "slider-content") {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    const transitionEnd = window.addEventListener("transitionend", smooth);
    const interval = setInterval(play, 7000);
    const onResize = window.addEventListener("resize", resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("transitionend", transitionEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 });
  }, [transition]);

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 });
  };

  const smoothTransition = () => {
    let slides = [];

    //마지막 슬라이드
    if (activeIndex === mappedRoomList.length - 1)
      slides = [
        mappedRoomList[mappedRoomList.length - 2],
        lastSlide,
        firstSlide,
      ];
    //첫번째 슬라이드
    else if (activeIndex === 0) slides = [lastSlide, firstSlide, secondSlide];
    //중간 슬라이드
    else slides = mappedRoomList.slice(activeIndex - 1, activeIndex + 2);

    setState({
      ...state,
      _slides: slides,
      transition: 0,
      translate: getWidth(),
    });
  };

  const nextSlide = () => {
    setState({
      ...state,
      activeIndex:
        activeIndex === mappedRoomList.length - 1 ? 0 : activeIndex + 1,
      translate: translate + getWidth(),
    });
  };

  const prevSlide = () => {
    setState({
      ...state,
      activeIndex:
        activeIndex === 0 ? mappedRoomList.length - 1 : activeIndex - 1,
      translate: 0,
    });
  };

  return (
    <StyledSlider>
      {loading ? (
        <div className="err-message">
          <div>Loading...</div>
        </div>
      ) : (
        <SliderContent
          translate={translate}
          transition={transition}
          width={getWidth() * _slides.length}
        >
          {_slides.map((slide, idx) => {
            return (
              <Slide
                key={slide.image + idx}
                content={slide}
                handleEntrance={handleEntrance}
              />
            );
          })}
        </SliderContent>
      )}
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <Dots slides={mappedRoomList} activeIndex={activeIndex} />
    </StyledSlider>
  );
};

export default Slider;
