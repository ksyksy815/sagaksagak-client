import { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidV4 } from 'uuid'
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { createTodo, checkTodo, deleteTodo } from '../../actions/index'
import { TodoWrapper } from './TodoList.style.js'
import Todo from './Todo'
import TodoForm from './TodoForm'

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

  const handleCreateTodo = (e) => {
    e.preventDefault()

    const id = uuidV4()
    const content = e.target[1].value
    const today = new Date()
    const createdAt = `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}`

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

  const handleTodoCheck = (e, completed) => {
    let targetId;
    if (e.target.localName === 'path') targetId = e.target.parentElement.id;
    else targetId = e.target.id;

    let index, target
    if (completed === false) {
      index = todoList.findIndex(todo => todo.id === targetId);
      target = todoList[index]
      target.checked = !target.checked

      setTodoList( list => list.filter(todo => todo.id !== targetId) )
      setCompletedList(list => [...list, target])
    } else {
      console.log(completedList)
      index = completedList.findIndex(todo => todo.id === targetId);
      target = completedList[index]
      target.checked = !target.checked

      setCompletedList(list => list.filter(todo => todo.id !== targetId) )
      setTodoList(list => [...list, target] )
    }

    if (user.isLogedIn) {
      axios.patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/todo/${targetId}`,
        { id: targetId },
        { withCredentials: true }
      )
      .then (() => console.log(`투두 체크 여부 서버 저장 완료`))
      .catch(err => {
        if (err.response.status === 403) {
          // access token 만료
        } else {
          console.log(err)
        }
      })
    
    } else {
      dispatch(checkTodo(targetId))
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
    if ( user.isLogedIn ) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/studylog`, {
        withCredentials: true
      })
      .then (res => {
        setCompletedList(res.data.doneList)
        setTodoList(res.data.todoList.forEach( todo=> todo.checked = false))
      })
      .catch(err => console.log(err))
    
    } else {
      setTodoList(todos.filter(todo => todo.checked !== true))
      setCompletedList(todos.filter(todo => todo.checked !== false));
    }
  }, [user.isLogedIn, completeTodos, todos])

  useEffect(() => {
    if (todoList.length === 0) setNoTodoMode(true);
    else setNoTodoMode(false);
    if (completedList.length === 0) setNoCompletedMode(true);
    else setNoCompletedMode(false);
  }, [todoList, completedList])

  return (
    <TodoWrapper>
      <button onClick={toggleTodoForm} id="newTodoBtn">NEW</button>
      <ul id="todo-options">
        <li className="main-lists">
          <div className="list-title" onClick={toggleInProgress}>
            { todosOpen ? <AiFillCaretDown/> : <AiFillCaretRight />}
            <span>Todos</span>
          </div>
          { todosOpen &&
            <ul className="todo-ul">
              { writeMode && 
                <TodoForm 
                  handleCreateTodo={handleCreateTodo} 
                  handleNewTodoChange={handleNewTodoChange}
                />
              }
              { noTodoMode ?
                <div className="noTodoMessage">작성된 투두가 없습니다.</div>
                :
                todoList.map(todo => {
                  return (
                    <Todo 
                      todo={todo} 
                      handleTodoCheck={handleTodoCheck} 
                      handleDeleteTodo={handleDeleteTodo}
                      completed={false}
                      key={todo.id}
                    />
                  )
                })
              }
            </ul>
          }
        </li>

        <li className="main-lists">
          <div className="list-title" onClick={toggleCompleted}>
            { completedOpen ? <AiFillCaretDown/> : <AiFillCaretRight />}
            <span>Completed</span>
          </div>
          { completedOpen &&
            <ul className="todo-ul">
            { noCompletedMode ? 
              <div className="noTodoMessage">완료된 투두가 없습니다.</div>
              :
              completedList.map(todo => {
                return (
                  <Todo 
                    todo={todo} 
                    handleTodoCheck={handleTodoCheck} 
                    handleDeleteTodo={handleDeleteTodo}
                    completed={true} 
                    key={todo.id} 
                  />
                )
              })
            }
            </ul>
          }
        </li>
      </ul>
    </TodoWrapper>
  )
}

