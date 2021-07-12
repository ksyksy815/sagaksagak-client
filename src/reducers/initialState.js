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
    // {
    //   id: 0,
    //   content: "",
    //   createdAt: "",
    //   isChecked: false,
    // },
  ],
  completeTodos: [
    {
      id: 0,
      content: "오징어 굽기",
      updatedAt: "2021.07.21",
      isChecked: true,
    },
  ],
  chatroom: {
    roomId: "",
    participants: [],
  },
};
