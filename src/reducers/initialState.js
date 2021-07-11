export const initialState = {
  user: {
    userId: 1,
    username: "",
    googleId: "",
    accessToken: "",
    isLogedIn: false,
    isFirstLogedIn: false,
  },
  todos: [
    {
      id: 0,
      content: "",
      createdAt: "",
      isChecked: false,
    },
  ],
  completeTodos: [
    {
      id: 0,
      content: "",
      updatedAt: "",
      isChecked: true,
    },
  ],
  chatroom: {
    roomId: "",
    participants: [],
  },
};
