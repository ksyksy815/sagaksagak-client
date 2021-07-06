import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const sliderData = [
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
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .rec-room {
    width: 400px;
    height: 300px;
    background: #c7d2fe66;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media only screen and (max-width: 600px) {
      width: 300px;
      height: 200px;
      top: 18%;
      font-size: 0.8rem;
    }
  }

  .image {
    width: 100%;
  }

  .trim {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 400px;
    max-width: 100%;
    overflow: hidden;
  }

  .right-arrow {
    position: absolute;
    top: 47%;
    right: 32px;
    font-size: 2rem;
    color: white;
    z-index: 10;
    cursor: pointer;
    user-select: none;
  }

  .left-arrow {
    position: absolute;
    top: 47%;
    left: 32px;
    font-size: 2rem;
    color: white;
    z-index: 10;
    cursor: pointer;
    user-select: none;
  }

  .slide {
    opacity: 0;
    transition: 0.5s ease;
  }

  .slide.active {
    opacity: 1;
    transition: 0.5s ease;
  }

  .container-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid white;
    margin: 0 5px;
    background: white;
    cursor: pointer;
  }

  .dot.active {
    background: transparent;
  }
`;

const DataSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;
  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const moveDot = (idx) => {
    setCurrent(idx);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <StyledSlider>
      <FaArrowLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowRight className="right-arrow" onClick={nextSlide} />
      {sliderData.map((slide, idx) => {
        return (
          <div className={idx === current ? "slide active" : "slide"} key={idx}>
            {idx === current && (
              <div className="content-container">
                <div className="rec-room">
                  <h1>이런 방을 추천해요</h1>
                  <h2>[영어] 토익 만점이 1000점 이냐?</h2>
                  <h3> 5/6 </h3>
                </div>
                <div className="trim">
                  <img src={slide.image} alt="no data" className="image" />
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="container-dots">
        {Array.from({ length: length }).map((item, idx) => {
          return (
            <div
              className={current === idx ? "dot active" : "dot"}
              onClick={() => moveDot(idx)}
            ></div>
          );
        })}
      </div>
    </StyledSlider>
  );
};

export default DataSlider;
