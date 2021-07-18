//로그인 및 유저 정보 관련 액션
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOG_IN = "LOG_IN";
export const FIRST_LOG_IN = "FIRST_LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SET_FIRST_LOGIN_FALSE = "SET_FIRST_LOGIN_FALSE";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";

//투두 관련 액션
export const SET_TO_DO_LIST = "SET_TO_DO_LIST";
export const NEW_TO_DO = "NEW_TO_DO";
export const TO_DO_CHECK = "TO_DO_CHECK";
export const DELETE_TO_DO = "DELETE_TO_DO";

//화상채팅방 관련 액션
export const ROOM_ID = "ROOM_ID";
export const PARTICIPANTS = "PARTICIPANTS";
export const ADD_USER = "ADD_USER"
export const DELETE_USER = "DELETE_USER"

export const setAccessToken = (token) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: {
      token,
    },
  };
};

export const logIn = (
  email,
  userId,
  username,
  accessToken,
  category,
  googleId = ""
) => {
  if (category === null) {
    category = [];
  }
  return {
    type: LOG_IN,
    payload: {
      email,
      userId,
      username,
      googleId,
      accessToken,
      category,
      isLogedIn: true,
      isFirstLogedIn: false,
    },
  };
};

export const firstLogIn = (
  email,
  userId,
  username,
  accessToken,
  category,
  googleId = ""
) => {
  if (category === null) {
    category = [];
  }
  return {
    type: FIRST_LOG_IN,
    payload: {
      email,
      userId,
      username,
      googleId,
      accessToken,
      category,
      isLogedIn: true,
      isFirstLogedIn: true,
    },
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: {
      email: "",
      userId: "",
      username: "",
      googleId: "",
      accessToken: "",
      category: [],
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

export const changeUsername = (username) => {
  return {
    type: CHANGE_USERNAME,
    payload: {
      username,
    },
  };
};

export const changeCategory = (category) => {
  return {
    type: CHANGE_CATEGORY,
    payload: {
      category,
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

export const createTodo = (id, content, updatedAt) => {
  return {
    type: NEW_TO_DO,
    payload: {
      id,
      content,
      updatedAt,
      checked: false,
    },
  };
};

export const checkTodo = (id) => {
  return {
    type: TO_DO_CHECK,
    payload: {
      id,
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TO_DO,
    payload: {
      id,
    },
  };
};

export const setRoomId = (roomId) => {
  return {
    type: ROOM_ID,
    payload: {
      roomId,
    },
  };
};

export const setParticipants = (users) => {
  return {
    type: PARTICIPANTS,
    payload: {
      users
    },
  };
};

export const setUser = (peerId, username, streamId) => {
  return {
    type: ADD_USER,
    payload: {
      peerId,
      username,
      streamId
    }
  }
}

export const setDeleteUser = (peerId) => {
  return {
    type: DELETE_USER,
    payload: {
      peerId
    }
  }
}