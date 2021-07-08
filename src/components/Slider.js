import React, { useState } from "react";
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
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`;

const Slider = () => {
  const getWidth = () => window.innerWidth;

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
  });

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    if (activeIndex === images.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth(),
    });
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (images.length - 1) * getWidth(),
        activeIndex: images.length - 1,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth(),
    });
  };

  return (
    <StyledSlider>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * images.length}
      >
        {images.map((slide, idx) => (
          <Slide key={slide.image + idx} content={slide.image} />
        ))}
      </SliderContent>
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <Dots slides={images} activeIndex={activeIndex} />
    </StyledSlider>
  );
};

export default Slider;
