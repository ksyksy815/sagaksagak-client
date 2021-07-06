import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const ChatroomNav = styled.nav`
  box-sizing: border-box;
  width: 100vw;
  height: 60px;
  padding: 0 2rem;
  display: ${props => props.clientY <= 60 ? `flex` : `none`};
  justify-content: space-between;
  align-items: center;
  background: #205b5ab4;
  position: absolute;
  top: 0;
  z-index: 5;

  h2 {
    a {
      text-decoration: none;
      color: #fff;
    }
  }
  .chatroom-btnBox {
    display: flex;
    column-gap: 1rem;
  }
`

const ChatroomBtn = styled.button`
  height: 30px;
  border-radius: 999px;
  border: none;
  display: flex;
  align-items: center;
  
  &:hover {
    cursor: pointer;
  }
`

const CameraBtn = styled(ChatroomBtn)`
  width: 55px;
  justify-content: ${props => props.cameraOn ? `flex-end` : `flex-start`};
  background-color: ${props => props.cameraOn ? `#66B0F0` : `grey`};
  transition: 0.1s;

  span {
    width: 22px;
    height: 22px;
    border-radius: 9999px;
    background-color: #fff;
  }
`

const NavBtn = styled(ChatroomBtn)`
  width: 80px;
  background: #A2C8BF;
  color: #205B5A;
  padding: 0 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function ChatRoomNav( { cameraOn, handleCamera } ) {
  const history = useHistory()
  const [clientY, setClientY] = useState()
  

  const handleMousemove = (e) => {
    setClientY(e.clientY)
  }

  const handleClickTodos = () => {
    //구현 필요
  }

  const handleClickCamera = () => {
    handleCamera()
  }

  const handleExit = () => {
    history.push('/')
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMousemove )
    return () => window.removeEventListener("mousemove", handleMousemove);
  }, [])

  return (
      <ChatroomNav clientY={clientY}>
        <h2><Link to='/'>사각사각</Link></h2>
        <div className="chatroom-btnBox">
          <CameraBtn cameraOn={cameraOn} onClick={handleClickCamera}><span></span></CameraBtn>
          <NavBtn onClick={handleClickTodos}>To-Dos</NavBtn>
          <NavBtn onClick={handleExit}>나가기</NavBtn>
        </div>
      </ChatroomNav>
  )
}
