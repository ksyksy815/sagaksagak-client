import { useState, useRef } from 'react'
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
    color: #F5C3B8;

    h1 {
      color: #fff;
      letter-spacing: 3px;
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
        color: #F5C3B8;

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

const StyledDevInfo = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0.5rem;

  div {
    display: flex;
    column-gap: 1rem;
    a {
      display: flex;
      column-gap: 1rem;
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Vero numquam quasi eius neque error eum?
          </p>
        </div>
        <span>&copy; SagakSagak by Team DevPull {new Date().getFullYear()}</span>
      </div>
      <ul className="footer-right">
        <li>
          <span>WOOSUNG KIM</span>
          <StyledDevInfo>
            <div><MdPerson/>김우성</div>
            <div onClick={handleClickCopy}><MdEmail/>rladntjd320@gmail.com</div>
            <div><a href='https://github.com/IJMilk-WS'><AiFillGithub/>IJMilk-WS</a></div>
          </StyledDevInfo>
        </li>
        <li>
          <span>SEOYEON KIM</span>
          <StyledDevInfo>
            <div><MdPerson/>김서연</div>
            <div onClick={handleClickCopy}><MdEmail/>seoyeonkim815@gmail.com</div>
            <div><a href='https://github.com/ksyksy815'><AiFillGithub/>ksyksy815</a></div>
          </StyledDevInfo>
        </li>
        <li>
          <span>HYUNWOO JEONG</span>
          <StyledDevInfo>
            <div><MdPerson/>정현우</div>
            <div onClick={handleClickCopy}><MdEmail/>wijeong@gmail.com</div>
            <div><a href='https://github.com/david-Jeong95'><AiFillGithub/>david-Jeong95</a></div>
          </StyledDevInfo>
        </li>
        <li>
          <span>SOONEUN HWANG</span>
          <StyledDevInfo>
            <div onClick={handleClickCopy}><MdPerson/>황순은</div>
            <div><MdEmail/>catalyst8849@gmail.com</div>
            <div><a href='https://github.com/Hwangsooneun'><AiFillGithub/>Hwangsooneun</a></div>
          </StyledDevInfo>
        </li>
      </ul>
    </StyledFooter>
  )
}
