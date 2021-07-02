//로그인 및 유저 정보 관련 액션
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOG_IN = "LOG_IN";
export const FIRST_LOG_IN = "FIRST_LOG_IN";
export const LOG_OUT = "LOG_OUT";

//투두 관련 액션
export const SET_TO_DO_LIST = "SET_TO_DO_LIST";
export const NEW_TO_DO = "NEW_TO_DO";
export const TO_DO_CHECKED = "TO_DO_CHECKED";
export const TO_DO_UNCHECKED = "TO_DO_UNCHECKED";

export const setAccessToken = (token) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: {
      token,
    },
  };
};

export const logIn = (userId, username, accessToken, googleId = "") => {
  return {
    type: LOG_IN,
    payload: {
      userId,
      username,
      googleId,
      accessToken,
      isLogedIn: true,
      isFirstLogedIn: false,
    },
  };
};

export const firstLogIn = (userId, username, accessToken, googleId = "") => {
  return {
    type: FIRST_LOG_IN,
    payload: {
      userId,
      username,
      googleId,
      accessToken,
      isLogedIn: true,
      isFirstLogedIn: true,
    },
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: {
      userId: "",
      username: "",
      googleId: "",
      accessToken: "",
      isLogedIn: false,
      isFirstLogedIn: false,
    },
  };
};

export const setTodoList = (todos, completeTodos) => {
  return {
    type: SET_TO_DO_LIST,
    payload: {
      todos,
      completeTodos,
    },
  };
};

export const newTodo = (id, content) => {
  return {
    type: NEW_TO_DO,
    payload: {
      id,
      content,
      createdAt: "",
      isChecked: false,
    },
  };
};

export const todoChecked = (id, todo) => {
  return {
    type: TO_DO_CHECKED,
    payload: {
      id,
      content: todo.content,
      createdAt: todo.createdAt,
      isChecked: true,
    },
  };
};

export const todoUnchecked = (id, todo) => {
  return {
    type: TO_DO_UNCHECKED,
    payload: {
      id,
      content: todo.content,
      createdAt: todo.createdAt,
      isChecked: false,
    },
  };
};
