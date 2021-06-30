import styled from 'styled-components'

export const StyledSectionTop = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden; 
  display: flex;
  box-sizing: border-box;
  scroll-snap-align: start;
  overflow: hidden;
  padding: 0 20%;

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
    max-width: 600px;
    height: auto;
    object-fit: cover;
    position: absolute;
    bottom: 10%;
    left: 45%;
  }

`

export const StyledSectionMid = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
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