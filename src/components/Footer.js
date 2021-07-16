import styled from 'styled-components'
import { MdPerson, MdEmail } from 'react-icons/md'
import { AiFillGithub } from 'react-icons/ai'
import { device } from '../device'


const StyledFooter = styled.footer`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  width: 100vw;
  height: 50vh;
  background-color: #7F5550;
  display: flex;
  padding: 2rem 2rem;
  box-sizing: border-box;
  column-gap: 3rem;
  
  a {
    text-decoration: none;
  }

  .footer-left {
    flex: 1 1 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    h1 {
      color: #fff;
      letter-spacing: 3px;
      margin-bottom: 0.5rem;
    }

    span, p {
      color: #ebebeb;
      padding-left: 0.5rem;
    }
  }

  .footer-right {
    flex: 1 1 70%;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    color: #F5C3B8;
    letter-spacing: 1.5px;
    padding: 0;

    li {
      transition: 0.2s;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      span {
        color: #fff;
        transition: 0.2s;
      }

      a {
        color: #ebebeb;

        &:hover {
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }

  @media ${device.tablet} {
    flex-direction: column;
    height: 70vh;
    .footer-left {
      justify-content: flex-start;
      row-gap: 1rem;

      p {
        display: none;
      }
    }
    .footer-right {
      row-gap: 2rem;
    }
  }

  @media (max-width: 600px) {
    height: auto;
    padding: 2rem 1rem;
    row-gap: 2rem;
    .footer-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      li {
        justify-content: center;
        align-items: flex-start;
        width: 250px;
      }
    }
  }
`

const CopyMessage = styled.p`
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: #FECF2D;
  padding: 0.2rem 0.5rem;
  color: #444444;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 999px;
  bottom: -22px;
  right: 20px;
  z-index: 9990;

  @media ${device.mobile} {
    right: -20px;
  }
`

const StyledDevInfo = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0.5rem;

  div {
    display: flex;
    column-gap: 1rem;
    color: #c9c9c9;
    transition: 0.2s;
    position: relative;
    svg {
      fill: #c9c9c9;
    }
    a {
      display: flex;
      column-gap: 1rem;
    }
    &:hover{
      color: #fff;
      transform: translateY(-2px);
    }
  }

  .copy-email {
    &:hover{
      .copy-m {
        display: flex;
      }
    }
  }
`

export default function Footer() {
  const handleClickCopy = (e) => {
    const el = document.createElement('textarea')
    document.body.appendChild(el)
    el.value = e.target.textContent
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  
  return (
    <StyledFooter>
      <div className="footer-left">
        <div>
          <h1>사각사각</h1>
          <span>SAGAKSAGAK</span>
          <p>
            CodeStates SEP 28th Team DevPull
          </p>
        </div>
        <span>Copyrirght &copy; {new Date().getFullYear()} Team DevPull. <br/>All rights reverved. </span>
      </div>
      <ul className="footer-right">
        <li>
          <span>WOOSUNG KIM</span>
          <StyledDevInfo>
            <div><MdPerson/>김우성</div>
            <div className="copy-email" onClick={handleClickCopy}>
              <MdEmail/>rladntjd320@gmail.com
              <CopyMessage className="copy-m">Click to copy!</CopyMessage>
            </div>
            <div><a href='https://github.com/IJMilk-WS'><AiFillGithub/>IJMilk-WS</a></div>
          </StyledDevInfo>
        </li>
        <li>
          <span>SEOYEON KIM</span>
          <StyledDevInfo>
            <div><MdPerson/>김서연</div>
            <div className="copy-email" onClick={handleClickCopy}>
              <MdEmail/>seoyeonkim815@gmail.com
              <CopyMessage className="copy-m">Click to copy!</CopyMessage>
            </div>
            <div><a href='https://github.com/ksyksy815'><AiFillGithub/>ksyksy815</a></div>
          </StyledDevInfo>
        </li>
        <li>
          <span>HYUNWOO JEONG</span>
          <StyledDevInfo>
            <div><MdPerson/>정현우</div>
            <div className="copy-email" onClick={handleClickCopy}>
              <MdEmail/>wijeong@gmail.com
              <CopyMessage className="copy-m">Click to copy!</CopyMessage>
            </div>
            <div><a href='https://github.com/david-Jeong95'><AiFillGithub/>david-Jeong95</a></div>
          </StyledDevInfo>
        </li>
        <li>
          <span>SOONEUN HWANG</span>
          <StyledDevInfo>
            <div onClick={handleClickCopy}><MdPerson/>황순은</div>
            <div className="copy-email" onClick={handleClickCopy}>
              <MdEmail/>catalyst8849@gmail.com
              <CopyMessage className="copy-m">Click to copy!</CopyMessage>
            </div>
            <div><a href='https://github.com/Hwangsooneun'><AiFillGithub/>Hwangsooneun</a></div>
          </StyledDevInfo>
        </li>
      </ul>
    </StyledFooter>
  )
}
