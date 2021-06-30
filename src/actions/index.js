//로그인 및 유저 정보 관련 액션
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOG_IN = "LOG_IN";
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

export const logIn = (userName, accessToken) => {
  return {
    type: LOG_IN,
    payload: {
      userName,
      accessToken,
      isLogedIn: true,
    },
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: {
      userId: "",
      accessToken: "",
      isLogedIn: false,
    },
  };
};

export const setToDoList = (toDos, completeToDos) => {
  return {
    type: SET_TO_DO_LIST,
    payload: {
      toDos,
      completeToDos,
    },
  };
};

export const newToDo = (id, content) => {
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

export const toDoChecked = (id, toDo) => {
  return {
    type: TO_DO_CHECKED,
    payload: {
      id,
      content: toDo.content,
      createdAt: toDo.createdAt,
      isChecked: true,
    },
  };
};

export const toDoUnchecked = (id, toDo) => {
  return {
    type: TO_DO_UNCHECKED,
    payload: {
      id,
      content: toDo.content,
      createdAt: toDo.createdAt,
      isChecked: false,
    },
  };
};
