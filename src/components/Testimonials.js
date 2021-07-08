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
  background-color: ${props => props.backgroundColor};
  color: #fff;
  
  &:hover {
    transform: translateY(-5px);
  }

  p {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.6;
    font-size: 1.5rem;
    margin: 0;
  }

  .userInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.5rem;

    span{
      font-weight: bold;
      font-size: 1.2rem;
      margin-top: 2rem;
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
  height: 50vh;

  .userImg {
    width: 100px;
  }

  @media (max-width: 1070px) {
    flex: 1 1 auto;
    max-height: 300px;

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
`
const SideCard = styled(UserCard)`
  width:270px;
  min-width: 225px;
  height: 45vh;
  opacity: 0.6;

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
    color: #F58820;

    &:hover {
      color: #FECF2D;
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
      color: #F58820;
    }
  }
`

const userInfo = [
  {
    title: `김코딩(26)/고시생`,
    text: '"뱀이다 뱀이다 몸에 좋고 맛도 좋은 뱀이다 뱀이다~!"',
    color: `#f58720be`
  },
  {
    title: '박해커(27)/취준생',
    text: `"Shining through the city with a little funk and soul."`,
    color: `#66b0f0b2`
  },
  {
    title: `최루탄(23)/복학생`,
    text: `"It's Hammer time!"`,
    color: `#de877fc9`
  },
  {
    title: '이대리(29)/직장인',
    text: '"공부 공부 공부를 하자"',
    color: `#f58720be`
  },
  {
    title: '욘두(102)/외계인',
    text: '"빵상 깨롱깨롱"',
    color: `#205b5ab4`
  }
]

export default function Testimonials() {
  const [userCards, setUserCards] = useState({
    left: { id: 4, title: userInfo[4].title, text: userInfo[4].text,image: user4, bgColor: userInfo[4].color},
    main: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color},
    right: { id: 1,title: userInfo[1].title, text: userInfo[1].title, image: user1, bgColor: userInfo[1].color}
  })
  
  const handleClickLeft = () => {
    setUserCards(prev => {
      switch (prev.main.id) {
        case 0:
          return { 
            left: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            main: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            right: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color }
          }
        case 1:
          return { 
            left: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            main: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            right: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color }
          }
        case 2:
          return { 
            left: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            main: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            right: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color }
          }
        case 3:
          return { 
            left: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            main: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            right: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color }
          }
        case 4:
          return { 
            left: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            main: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            right: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color }
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
            left: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            main: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            right: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color }
          }
        case 1:
          return { 
            left: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color },
            main: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            right: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color }
          }
        case 2:
          return { 
            left: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2, bgColor: userInfo[2].color },
            main: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            right: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color }
          }
        case 3:
          return { 
            left: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3, bgColor: userInfo[3].color },
            main: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            right: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color }
          }
        case 4:
          return { 
            left: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4, bgColor: userInfo[4].color },
            main: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0, bgColor: userInfo[0].color },
            right: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1, bgColor: userInfo[1].color }
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
          <SideCard onClick={handleClickLeft} backgroundColor={userCards.left.bgColor}>
            <p>{userCards.left.text}</p>
            <div className="userInfo">
              <img className="userImg" src={userCards.left.image} alt="User avatar"/>
              <span>{userCards.left.title}</span>
            </div>
          </SideCard>
          <MainCard backgroundColor={userCards.main.bgColor}>
            <p>{userCards.main.text}</p>
            <div className="userInfo">
              <img className="userImg" src={userCards.main.image} alt="User avatar"/>
              <span>{userCards.main.title}</span>
            </div>
          </MainCard>
          <SideCard onClick={handleClickRight} backgroundColor={userCards.right.bgColor}>
            <p>{userCards.right.text}</p>
            <div className="userInfo">
              <img className="userImg" src={userCards.right.image} alt="User avatar"/>
              <span>{userCards.right.title}</span>
            </div>
          </SideCard>
        </Carousel>
        <BiRightArrow className="arrows" onClick={handleClickRight}/>
      </UserCardBox>
      <MobileTestimonials>
        <BiLeftArrow className="arrows" onClick={handleClickLeft} />
        <MainCard backgroundColor={userCards.main.bgColor}>
          <p>{userCards.main.text}</p>
          <div className="userInfo">
            <img className="userImg" src={userCards.main.image} alt="User avatar"/>
            <span>{userCards.main.title}</span>
          </div>
        </MainCard>
        <BiRightArrow className="arrows" onClick={handleClickRight}/>
      </MobileTestimonials>
    </StyledSectionBottom>
  )
}
