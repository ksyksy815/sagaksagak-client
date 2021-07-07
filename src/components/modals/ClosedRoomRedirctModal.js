import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const RoomClosed = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: grid;
  place-content: center;
`
const MessageBox = styled.div`
  box-sizing: border-box;
  width: 450px;
  height: 200;
  background:  #F5C3B8;
  color: #DE877F;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  line-height: 1.6;
  font-weight: bold;
`

export default function ClosedRoomRedirctModal() {
  const [count, setCount] = useState(5)
  const history = useHistory()

  useEffect(()=> {
    if (count === 0) history.push('/');
    count > 0 && setTimeout(() => setCount(prev=> prev-1), 1000)
  }, [count])

  return (
    <RoomClosed>
      <MessageBox>
        방장이 방을 나갔습니다.<br/> {count}초 후 메인 페이지로 돌아갑니다.
      </MessageBox>
    </RoomClosed>
  )
}
