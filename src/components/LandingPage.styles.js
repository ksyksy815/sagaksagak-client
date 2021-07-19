import styled from "styled-components";
import circle from "../assets/circle-bg.svg";
import { device } from "../device";
import iMac from "../assets/videos/imac_27.jpeg";

export const StyledLandingPage = styled.div`
  width: 100vw;
  height: auto;
  background-color: #f5f5f5;
  background-image: url(${circle}), url(${circle}), url(${circle}),
    url(${circle}), url(${circle});
  background-repeat: no-repeat;
  background-size: 50%, 30%, 80%, 40%, 80%;
  background-position: top -5% left -20%, top 20% right -10%,
    bottom 60% left -50%, bottom 30% right -20%, bottom 0% left -80%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  @media (max-width: 1045px) {
    background-image: url(${circle}), url(${circle}), url(${circle}),
      url(${circle});
    background-repeat: no-repeat;
    background-size: 60%, 80%, 50%, 80%;
    background-position: top 20% right -200px, top 35% left -200px,
      bottom 30% right -40%, bottom 5% left -80%;
  }

  @media ${device.mobile} {
    background-image: url(${circle}), url(${circle}), url(${circle}),
      url(${circle});
    background-repeat: no-repeat;
    background-size: 80%, 90%, 70%, 90%;
    background-position: top 12% right -200px, top 30% left -200px,
      bottom 35% right -100px, bottom 10% left -150px;
  }
`;

export const StyledSectionTop = styled.section`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  scroll-snap-align: start;
  overflow: hidden;
  padding: 2rem 20%;
  position: relative;

  div {
    max-width: 500px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    z-index: 5;
    color: #1b1110;
    position: absolute;
    left: 15%;
    bottom: 15%;

    h3 {
      font-size: 2rem;
      font-family: "Nanum Pen Script", cursive;
      color: #444444;
    }

    h1 {
      font-size: 2.5rem;
      color: #7f554f;
      letter-spacing: 2px;
      margin-bottom: 1rem;
    }

    p {
      line-height: 1.6;
      color: #777777;
    }
  }

  img {
    max-width: 550px;
    height: auto;
    object-fit: cover;
    position: absolute;
    bottom: 15%;
    left: 50%;
  }

  @media (max-width: 1045px) {
    height: auto;
    min-height: 100vh;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    row-gap: 0.5rem;

    div {
      min-width: 100vw;
      position: static;
      background-color: #ccb19d;
      padding: 1rem 2rem;

      h3 {
        color: #fff;
        font-size: 1.5rem;
      }
      h1 {
        font-size: 2rem;
        margin: 0.5rem 0 1rem 0;
      }
      p {
        color: #fff;
        margin-bottom: 1rem;
      }
    }
    img {
      position: static;
      max-width: 370px;
    }
  }

  @media ${device.mobile} {
    div {
      h3 {
        font-size: 1rem;
      }
      h1 {
        font-size: 1.5rem;
      }
      p {
        font-size: 1rem;
      }
    }
    img {
      max-width: 350px;
    }
  }
`;

export const StyledSectionMid = styled.section`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  width: 100%;
  height: 500vh;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .one,
  .two,
  .three {
    width: 100%;
    height: 150vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .one {
    img {
      max-width: 600px;
      height: auto;
      object-fit: cover;
      position: absolute;
      top: 30%;
      right: 50%;
    }

    .one-text {
      width: 500px;
      height: 400px;
      position: absolute;
      left: 50%;
      top: 10%;
      padding: 3rem;
      background-color: rgba(252, 252, 252, 0.9);
      box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      row-gap: 2rem;

      h1 {
        color: #444444;
        font-size: 2rem;
        line-height: 1.3;
        margin-bottom: 2rem;
      }

      p {
        color: #777777;
        line-height: 1.6;
        span {
          color: #fe5244;
          font-weight: bold;
        }
      }
    }

    @media (max-width: 1190px) {
      .one-text {
        top: 10%;
        right: 5%;
      }
    }

    @media (max-width: 1045px) {
      height: 100vh;
      flex-direction: column;
      img {
        position: static;
        max-width: 500px;
      }
      .one-text {
        position: static;
        width: 100%;
        height: 40vh;
        border-radius: 0;
        box-shadow: none;
        row-gap: 1rem;
        h1 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }

    @media ${device.mobile} {
      .one-text {
        padding: 2rem 1rem;
      }
    }
  }

  .two {
    .two-text {
      width: 500px;
      height: 500px;
      position: absolute;
      right: 50%;
      top: 0%;
      padding: 3rem;
      background-color: rgba(252, 252, 252, 0.9);
      box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      row-gap: 1rem;

      h1 {
        color: #444444;
        font-size: 2rem;
        margin-bottom: 2rem;
      }

      p {
        color: #777777;
        line-height: 1.6;

        span {
          color: #fe5244;
          font-weight: bold;
        }
      }
      .mid-title {
        font-family: "Nanum Pen Script", cursive;
        font-size: 2rem;
        color: #444444;
        font-weight: bold;
        margin-top: 2rem;
      }
      .three-btnBox {
        align-self: flex-end;
      }
    }

    .two-img {
      position: absolute;
      top: 30%;
      left: 55%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 400px;
        object-fit: cover;
      }
      video {
        position: absolute;
        top: 25px;
        width: 360px;
      }
    }

    @media (max-width: 1045px) {
      flex-direction: column-reverse;
      .two-text,
      .two-img {
        position: static;
        width: 100vw;
      }
      .two-text {
        height: 60vh;
        border-radius: 0;
        box-shadow: none;
        h1 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1rem;
        }
        .mid-title {
          font-size: 1.5rem;
        }
      }
      .two-img {
        video {
          top: 210px;
        }
      }
    }

    @media ${device.mobile} {
      .two-text {
        padding: 2rem 1rem;
      }
      .two-img {
        img {
          width: 350px;
        }
        video {
          width: 320px;
          top: 220px;
        }
      }
    }
  }

  .three {
    height: 250vh;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;

    .three-text {
      width: 500px;
      padding: 3rem;
      background-color: rgba(252, 252, 252, 0.9);
      box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      row-gap: 2rem;

      h1 {
        color: #444444;
        font-size: 1.5rem;
      }

      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        margin-bottom: 1rem;
      }
    }

    #three-text-top {
      position: absolute;
      left: 50%;
      top: 5%;
    }

    #three-text-bottom {
      position: absolute;
      right: 50%;
      top: 35%;
    }

    .three-img-top {
      position: absolute;
      top: 0;
      right: 55%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 400px;
        object-fit: cover;
      }
      video {
        position: absolute;
        top: 25px;
        width: 360px;
      }
    }
    .three-img-bottom {
      position: absolute;
      top: 45%;
      left: 55%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 400px;
        object-fit: cover;
      }
      video {
        position: absolute;
        top: 25px;
        width: 360px;
      }
    }

    .three-btnBox {
      width: 100%;
      display: flex;
      column-gap: 2rem;
      justify-content: flex-end;
      align-items: center;
      margin-top: 1rem;
    }

    @media (max-width: 1045px) {
      height: 100vh;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .three-img,
      .three-text {
        position: static;
        width: 100vw;
        ul {
          margin: 0;
        }
      }
      .three-img-top {
        position: static;
        margin-top: 40rem;
        margin-bottom: 3rem;
        video {
          top: -20px;
        }
      }
      .three-img-bottom {
        position: static;
        video {
          top: 740px;
        }
        margin-top: 5rem;
        margin-bottom: 2rem;
      }
      .three-text {
        box-shadow: none;
        border-radius: 0;
        height: 40vh;
        h1 {
          font-size: 1.5rem;
        }
      }
      #three-text-top {
        position: static;
        height: auto;
        padding: 1.5rem;
      }
      #three-text-bottom {
        position: static;
        height: auto;
        padding: 1.5rem;
      }
      .three-btnBox {
        margin: 0;
      }
    }

    @media ${device.mobile} {
      .three-text {
        padding: 2rem 1rem;
        h1 {
          font-size: 1.2rem;
        }
      }

      .three-img-top {
        img {
          position: relative;
          width: 350px;
        }
        video {
          width: 320px;
          top: -10px;
        }
      }

      .three-img-bottom {
        img {
          width: 350px;
        }
        video {
          width: 320px;
          top: 740px;
        }
      }
    }
  }
`;
export const StyledSectionBottom = styled.section`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  width: 100%;
  height: 250vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 30% 0;

  h1 {
    margin-bottom: 7rem;
    font-size: 2rem;
    color: #444444;
  }

  @media (max-width: 1070px) {
    height: 100vh;
    padding: 0;
    justify-content: flex-end;
    margin-top: 20rem;
    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
  }

  @media (max-width: 1045px) {
    height: 130vh;
  }
`;

export const ButtonBox = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 1045px) {
    width: 100%;
    justify-content: flex-end;
    margin: 0;
  }
  @media ${device.mobile} {
    justify-content: center;
  }
`;

export const LandingPageBtn = styled.button`
  width: 130px;
  padding: 0.7rem;
  border-radius: 15px;
  background-color: #7f554f;
  border: none;
  font-weight: bold;
  transition: 0.2s;

  a {
    text-decoration: none;
    color: #f5f5f5;
  }

  &:hover {
    background-color: #f5f5f5;
    background-color: #205b59;
    transform: translateY(-3px);
  }
`;

export const ParallaxImg = styled.div`
  background-image: ${(props) => props.img};
  background-repeat: no-repeat;
  background-size: 70%;
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  width: 100px;
  height: 100px;
`;
