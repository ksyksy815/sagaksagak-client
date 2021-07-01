import styled, { keyframes } from 'styled-components'
import circle from '../assets/circle-bg.svg'

const effectOnLanding = keyframes`
  from {
    opacity: 0;
    bottom: 35%;
  }
  to {
    opacity: 1;
    bottom: 15%;
  }
`

export const StyledLandingPage = styled.div`
width: 100vw;
height: auto;
background-image: url(${circle}),  url(${circle}), url(${circle}), url(${circle}), url(${circle});
background-repeat: no-repeat;
background-size: 50%, 30%, 80%, 40%, 80%;
background-position: top -5% left -20%, top 20% right -10%, bottom 60% left -50%, bottom 30% right -20%, bottom 0% left -80%;
display: flex;
flex-direction: column;
justify-content: flex-start;
position: relative;
`
export const StyledSectionTop = styled.section`
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
    color: #1B1110;
    position: absolute;
    left: 10%;
    bottom: 15%;
    animation: ${effectOnLanding} 2s;

    h1 {
      font-size: 3rem;
      color: #F58820;
      letter-spacing: 2px;
      margin: 0;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.6;
    }
  }

  img {
    max-width: 550px;
    height: auto;
    object-fit: cover;
    position: absolute;
    bottom: 15%;
    left: 45%;
    animation: ${effectOnLanding} 0.5s;
  }

`

export const StyledSectionMid = styled.section`
  width: 100%;
  height: 430vh;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .one, .two, .three {
    width: 100%;
    height: 150vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .one {
    img {
      max-width: 800px;
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

      h1 {
        color: #205B5A;
      }

      p {
        color: #fff;
        font-size: 1.2rem;
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
      background-color: #F5C3B8;
      border-radius: 15px;
      box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
    
      h1 {
        color: #DE877F;
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
      background-color: #f5d0a9c4;
      border-radius: 15px;
      box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
      
      h1 {
        color: #F58820;
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
      display: flex;
      column-gap: 2rem;
      justify-content: flex-end;
      align-items: center;
    }
  }
`
export const StyledSectionBottom = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
`

export const ButtonBox = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
`

export const LandingPageBtn = styled.button`
  width: 120px;
  padding: 0.7rem;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  font-weight: bold;
  color: ${(props) => props.color};
`

export const ParallaxImg = styled.div`
  background-image: ${(props) => props.img} ;
  background-repeat: no-repeat;
  background-size: 70%;
  position: absolute;
  top: ${(props)=> props.top};
  right: ${(props)=> props.right};
  bottom: ${(props)=> props.bottom};
  left: ${(props)=> props.left};
  width: 100px;
  height: 100px;
`