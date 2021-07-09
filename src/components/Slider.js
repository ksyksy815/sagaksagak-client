import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

const images = [
  {
    category: "국내입시",
    image:
      "https://images.unsplash.com/photo-1584601218757-8a412705aaa6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2F0JTIwZXhhbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=60",
  },
  {
    category: "코딩",
    image:
      "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGluZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=2850&q=60",
  },
  {
    category: "영어",
    image:
      "https://images.unsplash.com/photo-1517849325426-6eac321919a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlYXJuaW5nJTIwZW5nbGlzaHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=60",
  },
];

const StyledSlider = styled.section`
  position: relative;
  height: 400px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const getWidth = () => {
  if (window.innerWidth > 1010) return 1010;
  return window.innerWidth;
};

const Slider = ({ recommend, handleEntrance }) => {
  const firstSlide = images[0];
  const secondSlide = images[1];
  const lastSlide = images[images.length - 1];

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
    console.log(getWidth());
  };

  const smoothTransition = () => {
    let slides = [];

    //마지막 슬라이드
    if (activeIndex === images.length - 1)
      slides = [images[images.length - 2], lastSlide, firstSlide];
    //첫번째 슬라이드
    else if (activeIndex === 0) slides = [lastSlide, firstSlide, secondSlide];
    //중간 슬라이드
    else slides = images.slice(activeIndex - 1, activeIndex + 2);

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
      activeIndex: activeIndex === images.length - 1 ? 0 : activeIndex + 1,
      translate: translate + getWidth(),
    });
  };

  const prevSlide = () => {
    setState({
      ...state,
      activeIndex: activeIndex === 0 ? images.length - 1 : activeIndex - 1,
      translate: 0,
    });
  };

  return (
    <StyledSlider>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
      >
        {_slides.map((slide, idx) => {
          return <Slide key={slide.image + idx} content={slide.image} />;
        })}
      </SliderContent>
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <Dots slides={images} activeIndex={activeIndex} />
    </StyledSlider>
  );
};

export default Slider;
