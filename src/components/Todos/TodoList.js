import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createTodo,
  checkTodo,
  deleteTodo,
  logOut,
  setAccessToken,
  logIn,
} from "../../actions/index";
import { TodoWrapper } from "./TodoList.style.js";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import getCookie from "../../utilities/getCookie";

export default function TodoList() {
  // Global
  const { user } = useSelector((state) => state.logInStatusReducer);
  const state = useSelector((state) => state.todoReducer);
  const { todos } = state;
  const dispatch = useDispatch();
  const history = useHistory();

  // Local
  const [writeMode, setWriteMode] = useState(false);
  const [todosOpen, setTodosOpen] = useState(true);
  const [completedOpen, setCompletedOpen] = useState(false);
  const [noTodoMode, setNoTodoMode] = useState(false);
  const [noCompletedMode, setNoCompletedMode] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [emptyInput, setEmptyInput] = useState(false)

  const toggleTodoForm = () => {
    setWriteMode(true);
  };

  const toggleInProgress = () => {
    setTodosOpen((prev) => !prev);
  };

  const toggleCompleted = () => {
    setCompletedOpen((prev) => !prev);
  };

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const showNoEmptyInputMessage = () => {
    setEmptyInput(true)
    setTimeout(()=> setEmptyInput(false), 2000)
  }

  const handleCreateTodo = (e) => {
    e.preventDefault();

    if (newTodo.length === 0) {
      showNoEmptyInputMessage()
    } else {
      const id = uuidV4();
      const content = newTodo;
      const updatedAt = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
  
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
  
      setNewTodo("");
      setWriteMode(false);
    }
  };

  const handleTodoCheck = (e, completed) => {
    let id;
    if (e.target.localName === "path") {
      id = e.target.parentElement.id;
    } else {
      id = e.target.id;
    }

    if (completed === false) {
      // todo -> completed
      if (user.isLogedIn) {
        // 로그인
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
            let index = todoList.findIndex((todo) => todo.id === Number(id));
            let target = todoList[index];
            target.checked = !target.checked;
            setTodoList((list) =>
              list.filter((todo) => todo.id !== Number(id))
            );
            setCompletedList((list) => [...list, target]);
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
                      let index = todoList.findIndex(
                        (todo) => todo.id === Number(id)
                      );
                      let target = todoList[index];
                      target.checked = !target.checked;
                      setTodoList((list) =>
                        list.filter((todo) => todo.id !== Number(id))
                      );
                      setCompletedList((list) => [...list, target]);
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
        // 안로그인
        dispatch(checkTodo(id));
      }
    } else {
      // completed -> todo

      if (user.isLogedIn) {
        // 로그인
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
            let index = completedList.findIndex(
              (todo) => todo.id === Number(id)
            );
            let target = completedList[index];
            target.checked = !target.checked;
            setCompletedList((list) =>
              list.filter((todo) => todo.id !== Number(id))
            );
            setTodoList((list) => [...list, target]);
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
                      let index = completedList.findIndex(
                        (todo) => todo.id === Number(id)
                      );
                      let target = completedList[index];
                      target.checked = !target.checked;
                      setCompletedList((list) =>
                        list.filter((todo) => todo.id !== Number(id))
                      );
                      setTodoList((list) => [...list, target]);
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
        // 안로그인
        dispatch(checkTodo(id));
      }
    }
  };

  const handleDeleteTodo = (e, completed) => {
    e.preventDefault();

    let id;
    if (e.target.localName === "path") id = e.target.parentElement.id;
    else id = e.target.id;

    // 로그인 상태일 경우
    if (user.isLogedIn) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_DOMAIN}/todo/${id}`, {
          headers: { authorization: `bearer ${user.accessToken}` },
          id: id,
          withCredentials: true,
        })
        .then(() => {
          if (completed === false) {
            setTodoList((prev) => {
              let index = prev.findIndex((todo) => todo.id === Number(id));
              let list = prev.slice();
              list.splice(index, 1);
              return list;
            });
          } else {
            setCompletedList((prev) => {
              let index = prev.findIndex((todo) => todo.id === Number(id));
              let list = prev.slice();
              list.splice(index, 1);
              return list;
            });
          }
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
                    if (completed === false) {
                      setTodoList((prev) => {
                        let index = prev.findIndex(
                          (todo) => todo.id === Number(id)
                        );
                        let list = prev.slice();
                        list.splice(index, 1);
                        return list;
                      });
                    } else {
                      setCompletedList((prev) => {
                        let index = prev.findIndex(
                          (todo) => todo.id === Number(id)
                        );
                        let list = prev.slice();
                        list.splice(index, 1);
                        return list;
                      });
                    }
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          } else {
            console.log(err);
          }
        });
    } else {
      // 로그인 상태가 아닐 경우
      dispatch(deleteTodo(id));
    }
  };

  useEffect(() => {
    if (user.isLogedIn) {
      axios
        .get(`${process.env.REACT_APP_SERVER_DOMAIN}/studylog`, {
          headers: { authorization: `bearer ${user.accessToken}` },
          withCredentials: true,
        })
        .then((res) => {
          // 서버에서 받은 투두 날짜 이쁘게(?) 보이게 하기. 테스트 필요
          let completed = res.data.doneList.map((todo) => {
            let date = String(todo.updatedAt).slice(0, 10);
            return { ...todo, updatedAt: date };
          });
          let notCompleted = res.data.todoList.map((todo) => {
            let date = String(todo.updatedAt).slice(0, 10);
            return { ...todo, updatedAt: date };
          });

          setCompletedList(completed);
          setTodoList(notCompleted);
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
      // 전역상태인 todos가 변경되면 로컬상태인 todolist와 completedList를 업데이트함
      setTodoList(todos.filter((todo) => todo.checked !== true));
      setCompletedList(todos.filter((todo) => todo.checked !== false));
    }
  }, [user.isLogedIn, todos, user.accessToken, dispatch, history]);

  //로컬 상태인 todoList와 completedList가 변동되면 불려짐
  useEffect(() => {
    if (todoList.length === 0) {
      setNoTodoMode(true);
    } else setNoTodoMode(false);
    if (completedList.length === 0) {
      setNoCompletedMode(true);
    } else setNoCompletedMode(false);
  }, [todoList, completedList]);

  const refreshLogInRef = useRef();

  const handleRefreshLogIn = () => {
    if (!getCookie("refreshToken")) return;

    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`, {
        headers: {
          relogin: true,
        },
        withCredentials: true,
      })
      .then((res) => {
        const { accessToken, username, userId, email, category, subId } =
          res.data;

        dispatch(logIn(email, userId, username, accessToken, category, subId));
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/logout`, {
                headers: { authorization: `bearer ${user.accessToken}` },
                withCredentials: true,
              })
              .then(() => {
                dispatch(logOut());
              })
              .catch((err) => {
                if (err.response) {
                  console.log(err.response);
                } else if (err.request) {
                  console.log(err.request);
                } else {
                  console.log("Error :", err.message);
                }
                console.log(err.config);
              });
            history.push("/unauthorized");
          }
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  useEffect(() => {
    refreshLogInRef.current = handleRefreshLogIn;
  });

  useEffect(() => {
    const logInRefresh = () => {
      refreshLogInRef.current();
    };

    logInRefresh();
  }, []);

  return (
    <TodoWrapper>
      <button onClick={toggleTodoForm} id="newTodoBtn">
        NEW
      </button>
      <ul id="todo-options">
        <li className="main-lists">
          <div className="list-title" onClick={toggleInProgress}>
            {todosOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}
            <span>Todos</span>
          </div>
          {todosOpen && (
            <ul className="todo-ul">
              {writeMode && (
                <TodoForm
                  handleCreateTodo={handleCreateTodo}
                  handleNewTodoChange={handleNewTodoChange}
                  emptyInput={emptyInput}
                />
              )}
              {noTodoMode ? (
                <div className="noTodoMessage">작성된 투두가 없습니다.</div>
              ) : (
                todoList.map((todo) => {
                  return (
                    <Todo
                      todo={todo}
                      handleTodoCheck={handleTodoCheck}
                      handleDeleteTodo={handleDeleteTodo}
                      completed={false}
                      key={todo.id}
                    />
                  );
                })
              )}
            </ul>
          )}
        </li>
        <li className="main-lists">
          <div className="list-title" onClick={toggleCompleted}>
            {completedOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}
            <span>Completed</span>
          </div>
          {completedOpen && (
            <ul className="todo-ul">
              {noCompletedMode ? (
                <div className="noTodoMessage">완료된 투두가 없습니다.</div>
              ) : (
                completedList.map((todo) => {
                  return (
                    <Todo
                      todo={todo}
                      handleTodoCheck={handleTodoCheck}
                      handleDeleteTodo={handleDeleteTodo}
                      completed={true}
                      key={todo.id}
                    />
                  );
                })
              )}
            </ul>
          )}
        </li>
      </ul>
    </TodoWrapper>
  );
}
