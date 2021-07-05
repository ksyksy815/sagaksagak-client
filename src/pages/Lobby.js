import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'

const StyledLobby = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: green;
  display: grid;
  place-content: center;
`

export default function Lobby() {
  // Global
  const state = useSelector(state => state.logInStatusReducer)
  const { user } = state
  const history = useHistory()

  // Local
  const [roomId, setRoomId] = useState()
  const [username, setUsername] = useState(user.username !== '' ? user.username : `guest${Math.round(Math.random()*100000)}`)
  const [roomReady, setRoomReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleNewRoom = () => {
    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/room/new`, {
      userId: user.userId,
      category: "공무원",
      roomName: "고시생 모여라"
    })
    .then ( ( data ) => {
      console.log(data.data)
      // 서버로부터 전달받은 방ID를 상태에 저장하고 방 준비
      setRoomId(data.data.roomId)
      setRoomReady(true)
    })
    .catch( ( err ) => {
      setErrorMessage(`방 생성에 실패했습니다. 다시 시도해주세요!`)
    })
  }

  const handleEntrance = () => {
    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/room/${roomId}`)
    .then( (data) => {
      history.push(`/room/${roomId}`)
    })
    .catch( ( err ) => {
      if (err.response.status === 403) {
        setErrorMessage(`Oops! 방이 가득찼습니다. 다른 방에 참여해주세요.`)
      } else {
        console.log(err)
      }
    })
  }

  return (
    <StyledLobby>
      공부방 리스트 표시되는 페이지 (임시 이름 url path: lobby) <br/>
      <button onClick={handleNewRoom}>방만들기</button>
      {
        roomReady &&
        <div>
          방 다 만들어졌슴다 참여하실?
          <button onClick={handleEntrance}>입장하기</button>
        </div>
      }
    </StyledLobby>
  )
}
