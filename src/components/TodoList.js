import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { AiOutlineCheckSquare, AiOutlineCloseSquare, AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai'
import { device } from '../device'

const TodoWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1000px;
  flex: 1 1 auto;
  width: 100%;
  padding: 0 1rem;
  background-color: #E9E4DE;

  #todo-options {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 1rem 1rem;
    row-gap: 1rem;

    // 진행중 & 완료 투두 공통
    .list-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      column-gap: 1rem;

      &:hover {
        cursor: pointer;
      }
    }

    #inProgress {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      ul {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        border-radius: 15px;
        background: #ebebeb;
        
        li {
          flex: 1 1 auto;
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          column-gap: 1rem;
          padding: 1rem;
          border-radius: 15px;
          transition: 0.2s;

          .todo-check {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #444444;
            border-radius: 999px;

            &:hover {
              cursor: pointer;
            }
          }
          
          .content-date {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            column-gap: 0.7rem;
          }

          
          //삭제 버튼
          button {
            background: transparent;
            border: none;
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            font-size: 1.2rem;

            &:hover {
              cursor: pointer;
            }
          }
          
          &:hover {
            transform: translateY(-3px);
            background: #fff;
          }
        }
      }
    }
    
    #completed {
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
  const [writeMode, setWriteMode] = useState(false)
  const [todosOpen, setTodosOpen] = useState(true)
  const [completedOpen, setCompletedOpen] = useState(false)

  const toggleInProgress = () => {
    setTodosOpen(prev=>!prev)
  }

  const toggleCompleted = () => {
    setCompletedOpen(prev=>!prev)
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
      <ul id="todo-options">
        <li id="inProgress">
          <div className="list-title" onClick={toggleInProgress}>
            { todosOpen ? <AiFillCaretDown/> : <AiFillCaretRight />}
            <span>Todos</span>
          </div>
          {
            todosOpen &&
            <ul id="todo-list">
              {
                dummyData.map(todo => {
                  return (
                    <li className="todo" key={todo.id}>
                      <span className="todo-check"></span>
                      <div className="content-date">
                        <span>{todo.content}</span>
                        <span className="todo-date">{todo.updatedAt}</span>
                      </div>
                      <button><AiOutlineCloseSquare/></button>
                    </li>
                  )
                })
              }
              {
                writeMode && 
                  <li className="todo">
                    <div className="todo-wrapper">
                      <span className="todo-check"></span>
                      <div>
                        <input type="text" placeholder="할 일을 적어주세요!"></input>
                        <button>Save</button>
                      </div>
                    </div>
                  </li>
              }
            </ul>

          }

        </li>
        <li>
          <div className="list-title" onClick={toggleCompleted}>
            { completedOpen ? <AiFillCaretDown/> : <AiFillCaretRight />}
            <span>Completed</span>
          </div>
          <ul id="completed"></ul>
        </li>
      </ul>
    </TodoWrapper>
  )
}

