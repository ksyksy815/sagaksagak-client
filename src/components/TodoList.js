import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai'

const TodoWrapper = styled.div`
  flex: 1 1 80%;
  display: flex;
  margin-top: 5vh;
  height: 80vh;
  flex-direction: row-reverse;
  justify-content: center;
  column-gap: 0.5rem;
  z-index: 10;
`
const TodoColumn = styled.div`
  box-sizing: border-box;
  max-width: 290px;
  overflow-y: scroll;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex: 1 1 33%;
  row-gap: 0.5rem;
  padding: 2rem 0.5rem;
  transition: 0.2s;

  h3 {
    margin: 0;
  }

  &:hover {
    transform: translateY(-3px)
  }
`

const TodoForm = styled.form`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.5rem;

  input {
    flex: 1 1 auto;
    padding: 10px 10px;
    outline: none;
    border: none;
    background: #FAEEE9;
  }
  button {
    height: 100%;
    border: none;
    background: #DE877F;
    color: #fff;

    &:hover{
      cursor: pointer;
      background: #b84e44;
    }
  }
`

const NewList = styled(TodoColumn)`
  margin-right: 0.5rem;
`
const InProgressList = styled(TodoColumn)`

`
const CompletedList = styled(TodoColumn)`
  margin-left: 0.5rem;
`

const Todo = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 320px;
  padding: 1rem;
  transition: 0.2s;
  border-radius: 10px;

  div {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    .todo-content {
      width: 100%;
      border: none;
      font-size: 0.8rem;
      font-weight: bold;
    }

    span {
      margin-left: 0.5rem;
      font-size: 0.7rem;
    }
  }

  svg {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 2rem;
    color: rgba(185, 185, 185);

    &:hover {
      cursor: pointer;
      color: #fff;
    }
  }

  &:hover {
    transform: translateY(-2px);

  }
`

const NewTodo = styled(Todo)`
  background: ${props => props.checked ? `rgba(182, 224, 214, 1)` : `rgba(182, 224, 214, 0.5)`} ;

  &:hover {
    background: rgba(182, 224, 214, 0.8);
  }
`

const InProgressTodo = styled(Todo)`
  background: ${props => props.checked? `rgba(252, 209, 164, 1)` : `rgba(252, 209, 164, 0.5)`} ;

  &:hover {
    background: rgba(252, 209, 164, 0.8);
  }
`

const CompletedTodo = styled(Todo)`
  background: ${props => props.checked? `rgba(247, 176, 161, 1)` : `rgba(247, 176, 161, 0.5)`} ;
  
  &:hover {
    background: rgba(247, 176, 161, 0.8);
  }

  span {
    &:first-child {
      text-decoration: line-through;
      font-style: italic;
    }
  }
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
      <NewList>
        <h3>Today's To-Do</h3>
        <TodoForm>
          <input type='text' placeholder='할일을 작성하세요!'/>
          <button>추가</button>
        </TodoForm>
        {
          todays.map( todo => {
            return (
              <NewTodo key={todo.id} checked={todo.checked}>
                <div>
                  <span className="todo-content">{todo.content}</span>
                  <span>작성일: {todo.updatedAt}</span>
                </div>
                <AiOutlineCheckSquare id={todo.id} onClick={checkTodaysTodo}/>
              </NewTodo>
            )
          })
        }
      </NewList>
      <InProgressList>
        <h3>In Progress</h3>
        {
          inProgress.map( todo => {
            return (
              <InProgressTodo key={todo.id} checked={todo.checked}>
                <div>
                  <span className="todo-content">{todo.content}</span>
                  <span>작성일: {todo.updatedAt}</span>
                </div>
                <AiOutlineCheckSquare id={todo.id} onClick={checkInProgressTodo}/>
              </InProgressTodo>
            )
          })
        }
      </InProgressList>
      <CompletedList>
        <h3>Completed</h3>
        {
            completed.map( todo => {
              return (
                <CompletedTodo key={todo.id}>
                  <div>
                    <span className="todo-content">{todo.content}</span>
                    <span>작성일: {todo.updatedAt}</span>
                  </div>
                  <AiOutlineCloseSquare id={todo.id} onClick={deleteTodo}/>
                </CompletedTodo>
              )
            })
          }
      </CompletedList>
    </TodoWrapper>
  )
}
