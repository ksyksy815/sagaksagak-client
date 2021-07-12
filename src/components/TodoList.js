import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {v4 as uuidV4} from 'uuid'
import { AiOutlineCheckSquare, AiOutlineCloseSquare, AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai'
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import { device } from '../device'
import { useSelector, useDispatch } from 'react-redux'
import { createTodo, checkTodo, deleteTodo } from '../actions/index'


const TodoWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1000px;
  flex: 1 1 auto;
  width: 100%;
  padding: 0 1rem;
  background-color: #E9E4DE;
  position: relative;

  .noTodoMessage {
    padding: 1rem;
    text-align: center;
  }
  #newTodoBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.2rem 0.5rem;
    background-color: #7F554F;
    color: #fff;
    border-radius: 15px;
    border: none;

    &:hover {
      cursor: pointer;
      background-color: #cc857a;
    }
  }

  #todo-options {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 1rem 1rem;
    row-gap: 1rem;

    @media (min-width: 650px) {
      flex-direction: row;
      column-gap: 1rem;
    }

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
      flex: 0 1 50%;

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
            background: transparent;
            border: none;
            font-size: 1.2rem;

            &:hover {
              cursor: pointer;
              svg{
                fill: #7F554F;
              }
            }
          }
          
          .content-date {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            .content-inProgress {
              font-weight: bold;
            }
          }

          
          //삭제 버튼
          #deleteBtn {
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

      .todo-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 1rem;
        width: 100%;

        form {
          width: 100%;
          display: flex;
          column-gap: 1rem;
          input {
            flex: 1 1 auto;
            background: transparent;
            border: none;
            border-bottom: 1px solid #444444;
            padding-left: 0.2rem;
            padding-bottom: 0.2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            &:focus {
              outline: none;
            }
          }
          #saveBtn {
            padding: 0.2rem 1rem;
            border: 1px solid #444444;
            border-radius: 15px;
            background-color: #E9E4DE;

            &:hover {
              cursor: pointer;
              background-color: #7F554F;
              color: #fff;
            }
          }
        }
      }
    }
    
    #completed {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      flex: 0 1 50%;

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
          
          .content-date {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            column-gap: 0.7rem;

            .content-completed {
              font-weight: bold;
              font-style: italic;
              text-decoration: line-through;
            }
          }

          
          //삭제 버튼
          #deleteBtn {
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

      .todo-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 1rem;
        width: 100%;

        form {
          width: 100%;
          display: flex;
          column-gap: 1rem;
          input {
            flex: 1 1 auto;
            background: transparent;
            border: none;
            border-bottom: 1px solid #444444;
            padding-left: 0.2rem;
            padding-bottom: 0.2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            &:focus {
              outline: none;
            }
          }
          #saveBtn {
            padding: 0.2rem 1rem;
            border: 1px solid #444444;
            border-radius: 15px;
            background-color: #E9E4DE;

            &:hover {
              cursor: pointer;
              background-color: #7F554F;
              color: #fff;
              border: none;
            }
          }
        }
      }
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
  const { user, todos, completeTodos } = state
  const dispatch = useDispatch()

  // Local
  const [writeMode, setWriteMode] = useState(false)
  const [todosOpen, setTodosOpen] = useState(true)
  const [completedOpen, setCompletedOpen] = useState(false)
  const [noTodoMode, setNoTodoMode] = useState(false)
  const [noCompletedMode, setNoCompletedMode] = useState(false)
  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])
  const [completedList, setCompletedList] = useState([])

  const toggleTodoForm = () => {
    setWriteMode(true)
  }

  const toggleInProgress = () => {
    setTodosOpen(prev=>!prev)
  }

  const toggleCompleted = () => {
    setCompletedOpen(prev=>!prev)
  }

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value)
  }

  const saveNewTodo = (e) => {
    e.preventDefault()

    const id = uuidV4()
    const content = e.target[0].value
    const createdAt = `${new Date()}`

    setTodoList(prev=> [ {
      id,
      content,
      createdAt,
      checked: false
    }, ...prev])

    setNewTodo('')
    setWriteMode(false)
    
    if (user.isLogedIn) {
      axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/todo`, 
        { contents: content },
        { withCredentials: true}
      )
      .catch(err => console.log(err))
    
    } else {
      dispatch(createTodo(id, content, createdAt))
    }
  }

  const handleTodoCheck = (e) => {
    // 해당 id를 가진 todo 지정
    setTodoList(list => list.map(todo => {
      return todo.id === e.target.id ? {...todo, checked: !todo.checked} : todo 
    }))
    
    if (user.isLogedIn) {
      axios.patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/todo/${e.target.id}`,
        { id: e.target.id },
        { withCredentials: true }
      )
      .then (() => console.log(`투두 체크 여부 서버 저장 완료`))
      .catch(err => console.log(err))
    
    } else {
      dispatch(checkTodo(e.target.id))
    }
  }
  
  const handleDeleteTodo = (e) => {
    let targetId;
    if (e.target.localName === "path") targetId = e.target.parentElement.id;
    else targetId = e.target.id;

    setTodoList(prev=> {
      let index = prev.findIndex(todo => todo.id === targetId);
      let list = prev.slice()
      list.splice(index, 1)

      return list
    })

    if (user.isLogedIn) {
      axios.delete(
        `${process.env.REACT_APP_SERVER_DOMAIN}/todo/${targetId}`,
        { id: targetId },
        { withCredentials: true }
      )
      .then(() => console.log(`투두 삭제 성공`))
      .catch(err => {
        if (err.response.status === 403) {
          // access token 만료
        } else {
          console.log(err)
        }
      })

    } else {
      dispatch(deleteTodo(targetId))
    }
    
  }

  useEffect(() => {
    // 로그인 상태일때: 서버에서 불러오기
    if ( user.isLogedIn ) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/studylog`, {
        withCredentials: true
      })
      .then (res => {
        setCompletedList(res.data.doneList)
        setTodoList(res.data.todoList.forEach( todo=> todo.checked = false))
      })
      .catch(err => console.log(err))
    
    // 로그인 상태가 아닐 때: 전역 상태에서 불러오기
    } else {
      setTodoList(todos)
      setCompletedList(completeTodos);
    }
  }, [user.isLogedIn, completeTodos, todos])

  useEffect(() => {
    // 공통: 작성된 투두 or 완료된 투두가 없을 때 없다는 문구 표시하기
    if (todoList.length === 0) setNoTodoMode(true);
    else setNoTodoMode(false);
    if (completedList.length === 0) setNoCompletedMode(true);
    else setNoCompletedMode(false);
  }, [todoList, completedList])

  return (
    <TodoWrapper>
      <button onClick={toggleTodoForm} id="newTodoBtn">NEW</button>
      <ul id="todo-options">
        <li id="inProgress">
          <div className="list-title" onClick={toggleInProgress}>
            { todosOpen ? <AiFillCaretDown/> : <AiFillCaretRight />}
            <span>Todos</span>
          </div>
          {
            todosOpen &&
            <ul id="todo-list">
              { writeMode && 
                <li className="todo">
                  <div className="todo-wrapper">
                    <span className="todo-check"></span>
                    <form onSubmit={saveNewTodo}>
                      <input onChange={handleNewTodoChange} type="text" placeholder="할 일을 적어주세요!"></input>
                      <button type="submit" id="saveBtn">Save</button>
                    </form>
                  </div>
                </li>
              }
              { !noTodoMode ?
                todoList.map(todo => {
                  return (
                    <li className="todo" key={todo.id}>
                      <button onClick={handleTodoCheck} id={todo.id} className="todo-check">
                        {
                          todo.checked ? <FaRegCheckCircle id={todo.id}/>: <FaRegCircle id={todo.id}/>
                        }
                        
                      </button>
                      <div className="content-date">
                        <span className="content-inProgress">{todo.content}</span>
                        <span className="todo-date">{todo.updatedAt}</span>
                      </div>
                      <button onClick={handleDeleteTodo} id="deleteBtn"><AiOutlineCloseSquare id={todo.id}/></button>
                    </li>
                  )
                })
                :
                <div className="noTodoMessage">작성된 투두가 없습니다.</div>
              }
            </ul>
          }
        </li>
        <li id="completed">
          <div className="list-title" onClick={toggleCompleted}>
            { completedOpen ? <AiFillCaretDown/> : <AiFillCaretRight />}
            <span>Completed</span>
          </div>
          {
            completedOpen &&
            <ul id="completed-list">
            { !noCompletedMode ? 
              completedList.map(todo => {
                return (
                  <li className="todo" key={todo.id}>
                    <span className="todo-check"></span>
                    <div className="content-date">
                      <span className="content-completed">{todo.content}</span>
                      <span className="todo-date">{todo.updatedAt}</span>
                    </div>
                    <button id="deleteBtn"><AiOutlineCloseSquare/></button>
                  </li>
                )
              })
              :
              <div className="noTodoMessage">완료된 투두가 없습니다.</div>
            }
            </ul>
          }
        </li>
      </ul>
    </TodoWrapper>
  )
}

