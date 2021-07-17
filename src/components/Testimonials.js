import { useState } from 'react'
import styled from 'styled-components'
import { StyledSectionBottom } from '../components/LandingPage.styles.js'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { IoFlowerOutline } from 'react-icons/io5'
import user0 from '../assets/testimonials/user2.png'
import user1 from '../assets/testimonials/user4.png'
import user2 from '../assets/testimonials/user5.png'
import user3 from '../assets/testimonials/user3.png'
import user4 from '../assets/testimonials/user1.png'
import doubleMark from '../assets/doubleMark.svg'
import { device } from '../device'

// 후기 부분에 한해서 device 사이즈를 1070px로 사용

const UserCard = styled.div`
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
  padding: 1rem;
  box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
  transition: 0.2s;

  &::before {
    content: '';
    width: 50px;
    height: 50px;
    background-image: url(${doubleMark});
    background-repeat: no-repeat;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  p {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.6;
    font-size: 0.9rem;
    margin-top: 3rem;
    padding: 0 1rem;
  }

  .userInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;

    div{
      margin-top: 2rem;
      display: flex;
      flex-direction: column;

      .testi-job {
        font-family: 'Nanum Pen Script', cursive;
        font-size: 1.5rem;
      }
      .testi-name {
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
  
  .userImg {
    object-fit: cover;
    transition: 0.2s;
  }

  &:hover .userImg{
    transform: rotateZ(15deg)
  }
`

const MainCard = styled(UserCard)`
  width: 300px;
  height: 55vh;
  background-color: #CCB19D;

  p {
    color: #fff;
  }

  .userInfo {
    .userImg {
      width: 100px;
    }

    div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .testi-job {
        color: #e5e5e5;
      }
      .testi-name {
          color: #fff;
      }
    }
  }

  @media (max-width: 1070px) {
    flex: 1 1 auto;
    max-height: 300px;
    max-width: 540px;

    &::before {
      width: 40px;
      height: 40px;
    }

    p {
      font-size: 1rem;
      padding: 1rem;
    }

    .userInfo {
      .userImg {
        width: 80px;
      }
      
      span {
        font-size: 0.8rem;
      }
    }
  }

  @media ${device.mobile} {
    p {
      padding-top: 1rem;
      margin-top: 2rem;
      font-size: 0.8rem;
    }

    .userInfo {
      .userImg {
        width: 70px;
      }
    }
  }
`
const SideCard = styled(UserCard)`
  width:270px;
  min-width: 225px;
  height: 45vh;
  opacity: 0.6;
  background-color: #E9E4DE;

  &:hover {
    opacity: 1;
  }

  .userImg {
    width: 80px;
  }
`

const UserCardBox = styled.div`
  display: flex;
  column-gap: 1rem;
  justify-content: center;
  align-items: center;

  .arrows {
    font-size: 3rem;
    fill: #7F554F;
    position: relative;
    z-index: 500;
    &:hover {
      cursor: pointer;
      fill: #B7D5CE;
    }
  }

  @media (max-width: 1070px) {
    display: none;
  }
`

const Carousel = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;

  @media (max-width: 1070px) {
    display: none;
  }
`

const MobileTestimonials = styled.div`
  display: none;

  @media (max-width: 1070px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70vh;
    column-gap: 1rem;

    .arrows {
      font-size: 3rem;
      fill: #7F554F;
      &:hover {
        cursor: pointer;
        fill: #B7D5CE;
      }
    }
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
  const [userCards, setUserCards] = useState({
    left: { id: 4, job: userInfo[4].job, title: userInfo[4].title, text: userInfo[4].text,image: user4},
    main: { id: 0, job: userInfo[0].job, title: userInfo[0].title, text: userInfo[0].text, image: user0},
    right: { id: 1, job: userInfo[1].job, title: userInfo[1].title, text: userInfo[1].text, image: user1}
  })
  
  const handleClickLeft = () => {
    setUserCards(prev => {
      switch (prev.main.id) {
        case 0:
          return { 
            left: { id: 3, job: userInfo[3].job, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            main: { id: 4, job: userInfo[4].job, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            right: { id: 0, job: userInfo[0].job, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color }
          }
        case 1:
          return { 
            left: { id: 4, job: userInfo[4].job, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            main: { id: 0, job: userInfo[0].job, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            right: { id: 1, job: userInfo[1].job, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color }
          }
        case 2:
          return { 
            left: { id: 0, job: userInfo[0].job, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            main: { id: 1, job: userInfo[1].job, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            right: { id: 2, job: userInfo[2].job, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color }
          }
        case 3:
          return { 
            left: { id: 1, job: userInfo[1].job, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            main: { id: 2, job: userInfo[2].job, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            right: { id: 3, job: userInfo[3].job,title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color }
          }
        case 4:
          return { 
            left: { id: 2, job: userInfo[2].job, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            main: { id: 3, job: userInfo[3].job, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            right: { id: 4, job: userInfo[4].job, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color }
          }
        default:
          console.log(`default`)
      }
    })
  }

  const handleClickRight = () => {
    setUserCards(prev => {
      switch (prev.main.id) {
        case 0:
          return { 
            left: { id: 0,job: userInfo[0].job, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            main: { id: 1,job: userInfo[1].job, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            right: { id: 2,job: userInfo[2].job, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color }
          }
        case 1:
          return { 
            left: { id: 1, job: userInfo[1].job, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            main: { id: 2, job: userInfo[2].job, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            right: { id: 3, job: userInfo[3].job, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color }
          }
        case 2:
          return { 
            left: { id: 2, job: userInfo[2].job, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            main: { id: 3, job: userInfo[3].job, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            right: { id: 4, job: userInfo[4].job, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color }
          }
        case 3:
          return { 
            left: { id: 3, job: userInfo[3].job, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            main: { id: 4, job: userInfo[4].job, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            right: { id: 0, job: userInfo[0].job, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color }
          }
        case 4:
          return { 
            left: { id: 4, job: userInfo[4].job, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            main: { id: 0, job: userInfo[0].job, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            right: { id: 1, job: userInfo[1].job, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color }
          }
        default:
          console.log(`default`)
      }
    })
  }

  return (
    <StyledSectionBottom>
      <h1><IoFlowerOutline/> 이용 후기 <IoFlowerOutline/></h1>
      <UserCardBox>
        <BiLeftArrow className="arrows" onClick={handleClickLeft} />
        <Carousel>
          <SideCard onClick={handleClickLeft}>
            <p>{userCards.left.text}</p>
            <div className="userInfo">
              <img className="userImg" src={userCards.left.image} alt="User avatar"/>
              <div>
                <span className="testi-job">{userCards.left.job}</span>
                <span className="testi-name">{userCards.left.title}</span>
              </div>
            </div>
          </SideCard>
          <MainCard>
            <p>{userCards.main.text}</p>
            <div className="userInfo">
              <img className="userImg" src={userCards.main.image} alt="User avatar"/>
              <div>
                <span className="testi-job">{userCards.main.job}</span>
                <span className="testi-name">{userCards.main.title}</span>
              </div>
            </div>
          </MainCard>
          <SideCard onClick={handleClickRight}>
            <p>{userCards.right.text}</p>
            <div className="userInfo">
              <img className="userImg" src={userCards.right.image} alt="User avatar"/>
              <div>
                <span className="testi-job">{userCards.right.job}</span>
                <span className="testi-name">{userCards.right.title}</span>
              </div>
            </div>
          </SideCard>
        </Carousel>
        <BiRightArrow className="arrows" onClick={handleClickRight}/>
      </UserCardBox>
      <MobileTestimonials>
        <BiLeftArrow className="arrows" onClick={handleClickLeft} />
        <MainCard>
          <p>{userCards.main.text}</p>
          <div className="userInfo">
            <img className="userImg" src={userCards.main.image} alt="User avatar"/>
            <div>
              <span className="testi-job">{userCards.main.job}</span>
              <span className="testi-name">{userCards.main.title}</span>
            </div>
          </div>
        </MainCard>
        <BiRightArrow className="arrows" onClick={handleClickRight}/>
      </MobileTestimonials>
    </StyledSectionBottom>
  )
}
