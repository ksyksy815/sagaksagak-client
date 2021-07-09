import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai'
import { device } from '../device'

const TodoWrapper = styled.div`
  
`
const dummyData = [
  {
    id: 1,
    content: "맘스터치 주문하기",
    updatedAt: "2021.07.01",
    checked: false
  },
  {
    id: 2,
    content: "영어 공부하기",
    updatedAt: "2021.06.06",
    checked: false
  },
  {
    id: 3,
    content: "드라마 보기",
    updatedAt: "2021.07.02",
    checked: false
  }
]


export default function TodoList() {
  // Global
  const state = useSelector(state => state.logInStatusReducer)
  const { user } = state

  // Local
  const [newTodo, setNewTodo] = useState({id: 555, content: '', updatedAt: '2021.07.07'})
  const [completed, setCompleted] = useState(dummyData)
  const [inProgress, setInProgress] = useState(dummyData)
  const [todays, setTodays] = useState(dummyData)
  const [inView, setInView] = useState('Today')

  const handleAddTodo = () => {
    setTodays(prev => [newTodo, ...prev])
  }

  const checkTodaysTodo = (e) => {
    console.log(e.target.id)
  }

  const checkInProgressTodo = (e) => {
    console.log(e.target.id)
  }

  const deleteTodo = (e) => {
    if (e.target.localName === 'path') {
      setCompleted( prev => 
        prev.filter(todo => todo.id !== Number(e.target.parentElement.id)) 
      )

      axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/todo/${e.target.parentElement.id}`,{
        withCredentials: true
      })
      .catch(err => console.log(err))

    } else {
      setCompleted( completed => 
        completed.filter(todo => todo.id !== Number(e.target.id))
      )
      axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/todo/${e.target.id}`,{
        withCredentials: true
      })
      .catch(err => console.log(err))
    }
  }

  // Component mount시 저장된 목록 불러오기
  // 로그인상태라면 DB로부터, 로그인상태가 아니라면 localStorage로부터
  // useEffect(() => {
  //   if ( user.isLoggedIn ) {
  //     axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/studylog`, {
  //       withCredentials: true
  //     })
  //     .then (res => {
  //       setCompleted(res.data.doneList)
  //       setInProgress(res.data.todoList.forEach( todo=> todo.checked = false))
  //       setTodays(res.data.todayList.forEach( todo=> todo.checked = false))
  //     })
  //     .catch(err => console.log(err))

  //   } else {

  //   }
  // }, [])

  return (
    <TodoWrapper>
      hello to do 
    </TodoWrapper>
  )
}

