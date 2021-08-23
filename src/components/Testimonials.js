import { useState } from 'react'
import styled from 'styled-components'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import deco from '../assets/doubleMark.svg'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'

const Testimonial = styled.div`
  background: #003366;
  background-image: url(${deco});
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: left 20px top 20px;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  position: relative;
  padding: 6rem 3rem 5rem 3rem;
  row-gap: 2rem;

  #testi-bottom-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
    
    div {
      display: flex;
      column-gap: 0.5rem;
      justify-content: center;
      align-items:center;
      h3 {
        color: #fff;
      }
    }
  }

  #testi-text {
    margin: 0;
    font-family: 'Nanum Pen Script', cursive;
    font-size: 1.8rem;
    line-height: 1.3;
  }

  button {
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid white;
    border-radius: 999px;
    width: 50px;
    height: 50px;
    margin-top: 0;
    font-size: 2rem;
    display: grid;
    place-content: center;
    transition: 0.2s;
    svg {
      pointer-events: none;
      path {
        fill: #fff;
      }
    }
    &:hover {
      cursor: pointer;
      transform: translateY(-3px);
      font-weight: bold;
      box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.3);
    }
  }

  #testi-left-btn {
    margin-top: 0;
    left: -25px;
    
  }

  #testi-right-btn {
    margin-top: 0;
    right: -25px;
  }

  @media (max-width: 900px) {
    width: 80vw;
    height: 60vh;
    background-size: 10%;
  }
`

const userInfo = [
  {
    job: '입시생',
    title: `김원희(19)`,
    text: '코로나 시국에 도서관 독서실이 많이 열지 않은 상황에서 정말 같이 공부할 수 있는 느낌을 받아서 좋았습니다. 집중도 더 잘되는 것 같아요!!'
  },
  {
    job: '취준생',
    title: '김은기(27)',
    text: `취업을 앞둔 상태로 왠지 모를 막연한 불안감이 있었는데 같은 처지의 사람들과 같은 방에서 서로 정보도 공유하고 같이 공부도 할 수 있었고 많이 의지도 할 수 있어서 좋았어요~~`
  },
  {
    job: '뮤지션',
    title: `데이비드 황(23)`,
    text: `오우 생각보다 다양한 방들이 존재하더라구요~~ 좀 놀랐어요 영상도 잘 안끊기고 시간가는줄 모르고 이용하고 있어요! 아주 good이에요`
  },
  {
    job: '직장인',
    title: '구은재(29)',
    text: '제2외국어를 공부하고 싶었는데 따로 강의듣는거 외에도 이렇게 같이 공부하는 사람들과 같은 공간에서 정보도 공유하고 같이 공부하는 시간을 가질수 있다니,,, 앞으로 자주 이용할 것 같아요 '
  },
  {
    job: '대학생',
    title: '강병수(21)',
    text: '제가 어떤것을 공부할건지 미리 리스트로 작성하고 완료된 목록까지 볼 수 있어서 또 하나의 저만의 다이어리가 생긴 것 같아서 너무 좋아요!!'
  }
]

export default function Testimonials() {
  const [user, setUser] = useState({
    index: 0,
    title: userInfo[0].title,
    job: userInfo[0].job,
    text: userInfo[0].text,
  })

  const animation = useScrollFadeIn('up', 1, 0.3)

  const changeUser = (e) => {
    let index;

    if (e.target.id === "testi-left-btn") {
      if (user.index === 0) index = 4;
      else if (user.index <= 4) index = user.index - 1;

    } else if (e.target.id === "testi-right-btn") {
      if (user.index < 4) index = user.index + 1;
      else if (user.index === 4) index = 0;
    }      

    const { job, title, text } = userInfo[index]
    setUser({ index, title, job, text })
  }

  return (
    <Testimonial {...animation}>
      <button id="testi-left-btn" onClick={changeUser}><BiLeftArrow /></button>
      <p id ="testi-text">{user.text}</p>
      <div id="testi-bottom-box">
        <div>
          <h3>{user.title}</h3>
          <span>{user.job}</span>
        </div>
      </div>
      <button id="testi-right-btn" onClick={changeUser}><BiRightArrow /></button>
    </Testimonial>
  )
}
