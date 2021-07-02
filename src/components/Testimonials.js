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

const StyledUserCard = styled.div`
  box-sizing: border-box;
  width: 20vw;
  height: 50vh;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 2rem;
  box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  transition: 0.2s;

  .userImg {
    width: 100px;
    object-fit: cover;
    transition: 0.2s;

    &:hover {
      transform: rotateZ(15deg)
    }
  }
`

const TestimonialTitle = styled.h1`
  margin-bottom: 7rem;
  font-size: 2rem;
  color: #F58820;
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
`

const Carousel = styled.div`
  border: 3px solid #DE877F;
  padding: 2rem;
  display: flex;
  column-gap: 1rem;

`

const userInfo = [
  {
    name: `- 고시생 김코딩(26) -`,
    text: '뱀이다 뱀이다 몸에 좋고 맛도 좋은 뱀이다 뱀이다 요놈의 뱀을 사로잡아 우리 아빠 보약을 해드리면 아이구 우리딸 착하구나 하고 좋아하실거야',
  },
  {
    title: '- 취준생 박해커(27) -',
    text: ` Shining through the city with a little funk and soul. So I'ma light it up like dynamite, whoa oh oh`,
  },
  {
    title: `- 복학생 최루탄(23) -`,
    text: `It's Hammer time!`
  },
  {
    title: '- 직장인 이대리(29) -',
    text: 'You know nothing, Jon Snow.',
  },
  {
    title: '- 외계인 욘두(102) -',
    text: '빵상깨롱깨롱'
  }
]

export default function Testimonials() {
  const [userCards, setUserCards] = useState({
    left: {
      id: 4,
      title: userInfo[4].title,
      text: userInfo[4].text,
      image: user4,
    },
    main: {
      id: 0,
      title: userInfo[0].title,
      text: userInfo[0].text,
      image: user0,
    },
    right: {
      id: 1,
      title: userInfo[1].title,
      text: userInfo[1].title,
      image: user1,
    }
  })
  
  const handleClickLeft = () => {
    setUserCards(prev => {
      switch (prev.main.id) {
        case 0:
          return { 
            left: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3 },
            main: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4 },
            right: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0 }
          }
        case 1:
          return { 
            left: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4 },
            main: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0 },
            right: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1 }
          }
        case 2:
          return { 
            left: { id: 0, title: userInfo[0].title, text: userInfo[0].text, image: user0 },
            main: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1 },
            right: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2 }
          }
        case 3:
          return { 
            left: { id: 1, title: userInfo[1].title, text: userInfo[1].text, image: user1 },
            main: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2 },
            right: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3 }
          }
        case 4:
          return { 
            left: { id: 2, title: userInfo[2].title, text: userInfo[2].text, image: user2 },
            main: { id: 3, title: userInfo[3].title, text: userInfo[3].text, image: user3 },
            right: { id: 4, title: userInfo[4].title, text: userInfo[4].text, image: user4 }
          }
        default:
          console.log(`default`)
      }
    })
  }

  const handleClickRight = () => {
    setUserCards(prev => {
    })
    
  }
  return (
    <StyledSectionBottom>
      <TestimonialTitle><IoFlowerOutline/> 이용 후기 <IoFlowerOutline/></TestimonialTitle>
      <UserCardBox>
        <BiLeftArrow className="arrows" onClick={handleClickLeft} />
        <Carousel>
          <StyledUserCard>
            <div className="userInfo">
              <img className="userImg" src={userCards.left.image} alt="User avatar"/>
              <span>{userCards.left.title}</span>
            </div>
            <p>{userCards.left.text}</p>
          </StyledUserCard>
          <StyledUserCard>
            <div className="userInfo">
              <img className="userImg" src={userCards.main.image} alt="User avatar"/>
              <span>{userCards.main.title}</span>
            </div>
            <p>{userCards.main.text}</p>
          </StyledUserCard>
          <StyledUserCard>
            <div className="userInfo">
              <img className="userImg" src={userCards.right.image} alt="User avatar"/>
              <span>{userCards.right.title}</span>
            </div>
            <p>{userCards.right.text}</p>
          </StyledUserCard>
        </Carousel>
        <BiRightArrow className="arrows" onClick={handleClickRight}/>
      </UserCardBox>
    </StyledSectionBottom>
  )
}
