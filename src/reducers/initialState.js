export const initialState = {
  user: {
    userId: "",
    username: "",
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
};
