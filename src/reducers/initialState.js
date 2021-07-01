export const initialState = {
  user: {
    userId: "",
    username: "",
    accessToken: "",
    isLogedIn: false,
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
