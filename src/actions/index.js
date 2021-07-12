//로그인 및 유저 정보 관련 액션
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOG_IN = "LOG_IN";
export const FIRST_LOG_IN = "FIRST_LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SET_FIRST_LOGIN_FALSE = "SET_FIRST_LOGIN_FALSE";

//투두 관련 액션
export const SET_TO_DO_LIST = "SET_TO_DO_LIST";
export const NEW_TO_DO = "NEW_TO_DO";
export const TO_DO_CHECKED = "TO_DO_CHECKED";
export const TO_DO_UNCHECKED = "TO_DO_UNCHECKED";
export const TO_DO_CHECK = "TO_DO_CHECK";
export const DELETE_TO_DO = "DELETE_TO_DO";

//화상채팅방 관련 액션
export const ROOM_ID = "ROOM_ID";
export const PARTICIPANTS = "PARTICIPANTS";

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

export const setFirstLogInFalse = () => {
  return {
    type: SET_FIRST_LOGIN_FALSE,
    payload: {
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

export const createTodo = (id, content) => {
  return {
    type: NEW_TO_DO,
    payload: {
      id,
      content,
      createdAt: new Date(),
      isChecked: false,
    },
  };
};

export const checkTodo = (id) => {
  return {
    type: TO_DO_CHECK,
    payload: {
      id
    }
  };
};

// export const uncheckTodo = (id, todo) => {
//   return {
//     type: TO_DO_UNCHECKED,
//     payload: {
//       id,
//       isChecked: false,
//     },
//   };
// };

export const deleteTodo = (id) => {
  return {
    type: DELETE_TO_DO,
    payload: {
      id
    }
  }
}

export const setRoomId = (roomId) => {
  return {
    type: ROOM_ID,
    payload: {
      roomId,
    },
  };
};

export const setParticipants = (peerId, username) => {
  return {
    type: PARTICIPANTS,
    payload: {
      peerId,
      username,
    },
  };
};
