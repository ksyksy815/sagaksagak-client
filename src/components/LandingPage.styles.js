import styled, { keyframes } from 'styled-components'
import circle from '../assets/circle-bg.svg'
import { device } from '../device'


export const StyledLandingPage = styled.div`
  width: 100vw;
  height: auto;

  background-image: url(${circle}), url(${circle}), url(${circle}), url(${circle}), url(${circle});
  background-repeat: no-repeat;
  background-size:  50%, 30%, 80%, 40%, 80%;
  background-position: top -5% left -20%, top 20% right -10%, bottom 60% left -50%, bottom 30% right -20%, bottom 0% left -80%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  @media ${device.tablet} {
    background-image:   url(${circle}), url(${circle}), url(${circle}), url(${circle});
    background-repeat: no-repeat;
    background-size:  60%, 80%, 50%, 80%;
    background-position:  top 20% right -200px, top 35% left -200px, bottom 30% right -40%, bottom 5% left -80%;
  }

  @media ${device.mobile} {
    background-image:   url(${circle}), url(${circle}), url(${circle}), url(${circle});
    background-repeat: no-repeat;
    background-size: 80%, 90%, 70%, 90%;
    background-position: top 12% right -200px, top 30% left -200px, bottom 35% right -100px, bottom 10% left -150px;
  }


`

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
  padding: 0 20%;
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
    row-gap: 1rem;
    
    h3 {
      font-size: 2rem;
      font-family: 'Nanum Pen Script', cursive;
      color: #444444;
    }

    h1 {
      font-size: 2.5rem;
      color: #7F554F;

      letter-spacing: 2px;
      margin: 0;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.6;
      color: #444444;
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

  @media ${device.tablet} {
    height: auto;
    min-height: 100vh;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    row-gap: 0.5rem;

    div {
      min-width: 100vw;
      position: static;
      background-color: #CCB19D;
      padding: 1rem 2rem;

      h3 {
        color: #fff;
        font-size: 1.5rem;
      }
      h1 {
        font-size: 2rem;
        margin: 0.5rem 0;
      }
      p {
        color: #e5e5e5;
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
`

export const StyledSectionMid = styled.section`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  width: 100%;
  height: 430vh;
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
      left: 5%;
    }

    .one-text {
      width: 450px;
      height: auto;
      position: absolute;
      right: 15%;
      top: 20%;
      padding: 2rem;
      background-color: #a2c8bfc4;
      border-radius: 15px;
      box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      row-gap: 1rem;

      h1 {
        font-family: 'Nanum Pen Script', cursive;
        color: #205b5a;
        font-size: 2rem;
      }

      p {
        color: #fff;
        font-size: 1.2rem;
      }
    }

    @media (max-width: 1190px) {
      .one-text {
        top: 10%;
        right: 5%;
      }
    }

    @media ${device.tablet} {
      height: 100vh;
      flex-direction: column;
      img {
        position: static;
        max-width: 500px;
      }
      .one-text {
        position: static;
        width: 100%;
        height: 50vh;
        border-radius: 0;
        box-shadow: none;
        row-gap: 1rem;
      }
    }

    @media ${device.mobile} {
      .one-text {
        padding: 2rem 1rem;
        h1 {
          font-size: 1.5rem;
        }
      }
    }
  }

  .two {
    .two-text {
      width: 450px;
      height: auto;
      position: absolute;
      left: 15%;
      top: 0%;
      padding: 2rem;
      background-color: #a2c8bfc4;
      border-radius: 15px;
      box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      row-gap: 1rem;
    
      h1 {
        font-family: 'Nanum Pen Script', cursive;
        color: #205B5A;
        font-size: 2rem;

      }

      p {
        color: #fff;
        font-size: 1.2rem;
        line-height: 1.6;
      }
    }

    .two-img {
      position: absolute;
      top: 50%;
      right: 30%;
    }

    @media ${device.tablet} {
      flex-direction: column-reverse;
      .two-text, .two-img {
        position: static;
        width: 100vw;
      }
      .two-text {
        height: 40vh;
        border-radius: 0;
        box-shadow: none;
      }
      .two-img {
        height: 60vh;
      }
    }

    @media ${device.mobile} {
      .two-text {
        padding: 2rem 1rem;
      }
    }
  }

  .three {
    height: 130px;
    .three-text {
      width: 450px;
      height: auto;
      position: absolute;
      right: 15%;
      top: 5%;
      padding: 2rem;
      background-color: #a2c8bfc4;
      border-radius: 15px;
      box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      row-gap: 1rem;
      
      h1 {
        font-family: 'Nanum Pen Script', cursive;
        color: #205B5A;
        font-size: 2rem;
      }

      p {
        color: #fff;
        font-size: 1.2rem;
        line-height: 1.6;
      }
    }

    .three-img {
      position: absolute;
      top: 0%;
      left: 20%;
    }

    .three-btnBox {
      width: 100%;
      display: flex;
      column-gap: 2rem;
      justify-content: flex-end;
      align-items: center;
      margin-top: 1rem;
    }

    @media ${device.tablet} {
      height: 100vh;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .three-img, .three-text {
        position: static;
        width: 100vw;
      }
      .three-img {
        height: 60vh;
      }
      .three-text {
        box-shadow: none;
        border-radius: 0;
        height: 40vh;
      }
    }

    @media ${device.mobile} {
      .three-text {
        padding: 2rem 1rem;
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
  height: auto;
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

    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
  }

  @media ${device.tablet} {
    height: 130vh;
  }
`

export const ButtonBox = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;

  @media ${device.tablet} {
    width: 100%;
    justify-content: flex-end;
  }
`

export const LandingPageBtn = styled.button`
  width: 130px;
  padding: 0.7rem;
  border-radius: 15px;
  background-color: #7F554F;
  border: none;
  font-weight: bold;
  transition: 0.2s;

  a {
    text-decoration: none;
    color: #f5f5f5;
  }

  &:hover {
    background-color: #f5f5f5;
    background-color: #205B59;
    transform: translateY(-3px);
  }

`

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
