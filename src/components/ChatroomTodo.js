import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken, logOut, createTodo, checkTodo, deleteTodo } from '../actions/index'
import { v4 as uuidV4 } from "uuid";
import axios from 'axios'
import styled from 'styled-components'
import { device } from '../device'
import TodoRoom from './Todos/TodoRoom'

const InRoomTodo = styled.div`
  width: 400px;
  min-height: 500px;
  max-height: 100vh;
  position: absolute;
  background-color: rgba(235, 235, 235, 0.5);
  right: 1rem;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 0.5rem;
  border-radius: 10px;
  box-shadow: 10px 10px 30px 30px rgba(0,0,0,0.3);
  border-top: 0.5px solid rgba(255, 255, 255, 0.5);
  border-left: 0.5px solid rgba(255, 255, 255, 0.5);

  .chatroom-todo-top {
    padding: 0.7rem;
    h2 {
      color: #fff;
    }
    #chatroom-todo-close-btn {
      width: 20px;
      height: 20px;
      position: absolute;
      top:0.5rem;
      right: 0.5rem;
      
    }
  }

  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.2rem;
    padding: 0 1rem;
    position: relative;

    input {
      flex: 1 1 auto;
      color: #fff;
      padding: 0.2rem 0.5rem;
      background: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      transition: 0.2s;

      &::placeholder {
        color: ${props=> props.emptyInput ? 'red' : '#fff'};
        font-style: italic;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.2rem;
    }

    #no-input-message {
      position: absolute;
      bottom: -2rem;
      right: 2rem;
      background: #DDBCB5;
      padding: 0.3rem;
      border-radius: 10px;
      z-index: 5;
    }
  }

  .chatroom-todo-bottom {
    width: 100%;
    max-height: 450px;
    list-style: none;
    flex: 1 1 auto;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 0.5rem;
    overflow-y: scroll;

    .no-todo {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ebebeb;
      align-self: center;
      justify-self: center;
    }
  }
  
  @media ${device.mobile} {
    position: absolute;
    margin: auto;
    width: 90vw;
    height: 90vh;
  }
`

export default function ChatroomTodo( { toggleTodo }) {
  const { user } = useSelector((state) => state.logInStatusReducer);
  const state = useSelector((state) => state.todoReducer);
  const { todos } = state;
  const [todoList, setTodoList] = useState([])
  const [noTodoMode, setNoTodoMode] = useState(false)
  const [inputContent, setInputContent] = useState('')
  const [emptyInput, setEmptyInput] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleInput = (e) => {
    setInputContent(e.target.value)
  }

  const showNoEmptyInputMessage = () => {
    setEmptyInput(true)
    setTimeout(()=> setEmptyInput(false), 2000)
  }

  const handleMakeTodo = (e) => {
    e.preventDefault()
    if (inputContent.length === 0) {
      showNoEmptyInputMessage()
    } else {
      const id = uuidV4()
      const content = inputContent
      const updatedAt = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
  
      if (user.isLogedIn) {
        let contents = content;
        axios
          .post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/todo`,
            { contents: content },
            {
              headers: { authorization: `bearer ${user.accessToken}` },
              withCredentials: true,
            }
          )
          .then((res) => {
            setTodoList((prev) => [
              {
                id: res.data.id,
                content: contents,
                updatedAt: updatedAt,
                checked: false,
              },
              ...prev,
            ]);
          })
          .catch((err) => {
            if (err.response.status === 403) {
              // access token 만료
              axios
                .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
                .then((res) => {
                  dispatch(setAccessToken(res.data.accessToken));
                  axios
                    .post(
                      `${process.env.REACT_APP_SERVER_DOMAIN}/todo`,
                      { contents: content },
                      {
                        headers: { authorization: `bearer ${user.accessToken}` },
                        withCredentials: true,
                      }
                    )
                    .then(() => {
                      setTodoList((prev) => [
                        {
                          id: res.data.id,
                          content: contents,
                          updatedAt: updatedAt,
                          checked: false,
                        },
                        ...prev,
                      ]);
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => {
                  if (err.response.status === 403) {
                    dispatch(logOut());
                    history.push(`/unauthorized`);
                  } else {
                    console.log(err);
                  }
                });
            } else {
              console.log(err);
            }
          });
      } else {
        dispatch(createTodo(id, content, updatedAt));
      }
  
      setInputContent("")
      e.target[0].value = ''
    }
  }

  const handleTodoCheck = (e) => {
    let id;
    if (e.target.localName === "path") {
      id = e.target.parentElement.id;
    } else {
      id = e.target.id;
    }

    if (user.isLogedIn) {
      axios
        .patch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/todo/${id}`,
          { id: id },
          {
            headers: { authorization: `bearer ${user.accessToken}` },
            withCredentials: true,
          }
        )
        .then(() => {
          setTodoList((list) => {
            return list.map(todo => {
              if (todo.id === id) {
                return todo.isDone === 0 ? 1 : 0
              } else {
                return todo
              }
            })
          })
        })
        .catch((err) => {
          if (err.response.status === 403) {
            // access token 만료
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
              .then((res) => {
                dispatch(setAccessToken(res.data.accessToken));
                axios
                  .patch(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/todo/${id}`,
                    { id: id },
                    {
                      headers: {
                        authorization: `bearer ${user.accessToken}`,
                      },
                      withCredentials: true,
                    }
                  )
                  .then(() => {
                    setTodoList((list) => {
                      return list.map(todo => {
                        if (todo.id === id) {
                          return todo.isDone === 0 ? 1 : 0
                        } else {
                          return todo
                        }
                      })
                    })
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => {
                if (err.response.status === 403) {
                  dispatch(logOut());
                  history.push(`/unauthorized`);
                } else {
                  console.log(err);
                }
              });
          } else {
            console.log(err);
          }
        });
    } else {
      dispatch(checkTodo(id));
    }
  }

  const handleTodoDelete = (e) => {
    e.preventDefault();

    let id;
    if (e.target.localName === "path") id = e.target.parentElement.id;
    else id = e.target.id;

    if (user.isLogedIn) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_DOMAIN}/todo/${id}`, {
          headers: { authorization: `bearer ${user.accessToken}` },
          id: id,
          withCredentials: true,
        })
        .then(() => {
          setTodoList((prev) => {
            let index = prev.findIndex((todo) => todo.id === Number(id))
            let list = prev.slice();
            list.splice(index, 1);
            return list;
          })
        })
        .catch((err) => {
          if (err.response.status === 403) {
            // access token 만료
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
              .then((res) => {
                dispatch(setAccessToken(res.data.accessToken));
                axios
                  .delete(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/todo/${id}`,
                    { id: id },
                    {
                      headers: { authorization: `bearer ${user.accessToken}` },
                      withCredentials: true,
                    }
                  )
                  .then(() => {
                    setTodoList((prev) => {
                      let index = prev.findIndex((todo) => todo.id === Number(id))
                      let list = prev.slice();
                      list.splice(index, 1);
                      return list;
                    })
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          } else {
            console.log(err);
          }
        });
    } else {
      dispatch(deleteTodo(id));
    }
  }

  useEffect(() => {
    if (user.isLogedIn) {
      axios
        .get(`${process.env.REACT_APP_SERVER_DOMAIN}/studylog`, {
          headers: { authorization: `bearer ${user.accessToken}` },
          withCredentials: true,
        })
        .then((res) => {
          let list = [...res.data.todoList, ...res.data.doneList]
          if(list.length === 0) {
            setTodoList([])
          } else {
            let listWithPrettyDates = list.reduce((todos, todo) => {
              let date = String(todo.updatedAt).slice(0, 10);
              todo = { ...todo, updatedAt: date };
              todo.checked = todo.isDone === 0 ? false : true
              delete todo.isDone
              return todos.push(todo)
            }, []);
            setTodoList(listWithPrettyDates)
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
              .then((res) => {
                dispatch(setAccessToken(res.data.accessToken));
              })
              .catch((err) => {
                if (err.response.status === 403) {
                  dispatch(logOut());
                  history.push(`/unauthorized`);
                } else {
                  console.log(err);
                }
              });
          } else {
            console.log(err);
          }
        });
    } else if (!user.isLogedIn) {
      setTodoList(todos)
    }
  }, [user.isLogedIn, todos, user.accessToken, dispatch, history]);  

  //로컬 상태인 todoList가 변동되면 불려짐
  useEffect(() => {
    if (todoList.length === 0) {
      setNoTodoMode(true);
    } else setNoTodoMode(false);
  }, [todoList]);

  return (
    <InRoomTodo emptyInput={emptyInput}>
      <div className="chatroom-todo-top">
        <button id="chatroom-todo-close-btn" onClick={toggleTodo}>X</button>
        <h2>To-Dos</h2>
      </div>
      <form onSubmit={handleMakeTodo}>
        <input onChange={handleInput} type="text" placeholder="할 일을 적어주세요!"></input>
        <button type="submit">Save</button>
      </form>
      <ul className="chatroom-todo-bottom">
        {
          noTodoMode ? 
          <div className="no-todo">작성된 투두가 없습니다.</div>
          :
          (
            todoList.map((todo) => {
              return (
                <TodoRoom
                  key={todo.id}
                  todo={todo}
                  deleteTodo={handleTodoDelete}
                  checkTodo={handleTodoCheck}
                />
              );
            })
          )
        }
      </ul>
    </InRoomTodo>
  )
}
