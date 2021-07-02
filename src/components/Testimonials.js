import styled, { keyframes } from 'styled-components'
import { StyledSectionBottom } from '../components/LandingPage.styles.js'
import { IoFlowerOutline } from 'react-icons/io5'
import user5 from '../assets/testimonials/user1.png'
import user1 from '../assets/testimonials/user2.png'
import user4 from '../assets/testimonials/user3.png'
import user2 from '../assets/testimonials/user4.png'
import user3 from '../assets/testimonials/user5.png'

const StyledUserCard = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 200px;
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
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transition: 0.2s;

  .userImg {
    width: 100px;
    object-fit: cover;
    position: absolute;
    top: ${(props) => props.imgTop};
    left: ${(props) => props.imgLeft};
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

export default function Testimonials({ offsetY }) {

  return (
    <StyledSectionBottom>
      <TestimonialTitle><IoFlowerOutline/> Testimonials <IoFlowerOutline/></TestimonialTitle>
      <StyledUserCard 
        backgroundColor={`#fed12dc9`}
        color={``}
        top={`0%`} left={`-20%`}
        imgTop={`70%`} imgLeft={`70%`}
      >
        <p>
        뱀이다 뱀이다 몸에 좋고 맛도 좋은 뱀이다 뱀이다 요놈의 뱀을 사로잡아
        우리 아빠 보약을 해드리면 아이구 우리딸 착하구나 하고 좋아하실거야
        </p>
        <span>- 고시생 김코딩(22) -</span>
        <img className="userImg" src={user1} alt="User avatar" />
      </StyledUserCard>
      <StyledUserCard 
        backgroundColor={`#205b5ab4`} 
        color={`#fff`}
        top={``} left={`20%`}
        imgTop={`70%`} imgLeft={`-10%`}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Corporis nostrum sequi, rem pariatur vitae totam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quia asperiores atque perspiciatis aliquid voluptatibus sunt!
        </p>
        <span>- 취준생 박해커(27) -</span>
        <img className="userImg" src={user2} alt="User avatar" top={``} left={``}/>
      </StyledUserCard>
      <StyledUserCard
        backgroundColor={`#de877fc9`} 
        color={`#fff`}
        top={``} left={`-15%`}
        imgTop={`70%`} imgLeft={`70%`}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Corporis nostrum sequi, rem pariatur vitae totam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quia asperiores atque perspiciatis aliquid voluptatibus sunt!
        </p>
        <span>- 대학생 최루탄(21) -</span>
        <img className="userImg" src={user3} alt="User avatar" top={``} left={``}/>
      </StyledUserCard>
      <StyledUserCard
        backgroundColor={`#f58720be`} 
        color={`#fff`}
        top={``} left={`20%`}
        imgTop={`70%`} imgLeft={`-5%`}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Corporis nostrum sequi, rem pariatur vitae totam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quia asperiores atque perspiciatis aliquid voluptatibus sunt!
        </p>
        <span>- 대학생 김코딩(22) -</span>
        <img className="userImg" src={user4} alt="User avatar" top={``} left={``}/>
      </StyledUserCard>
      <StyledUserCard
        backgroundColor={`#205b5ab4`} 
        color={`#fff`}
        top={``} left={`-20%`}
        imgTop={`70%`} imgLeft={`70%`}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Corporis nostrum sequi, rem pariatur vitae totam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quia asperiores atque perspiciatis aliquid voluptatibus sunt!
        </p>
        <span>- 외계인 욘두(78) -</span>
        <img className="userImg" src={user5} alt="User avatar" top={``} left={``}/>
      </StyledUserCard>
    </StyledSectionBottom>
  )
}
