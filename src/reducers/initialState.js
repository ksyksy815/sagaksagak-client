export const initialState = {
  user: {
    email: "",
    userId: 1,
    username: "",
    googleId: "",
    accessToken: "",
    category: [],
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
    // {
    //   id: 0,
    //   content: "오징어 굽기",
    //   updatedAt: "2021.07.21",
    //   checked: true,
    // },
  ],
  chatroom: {
    roomId: "",
    participants: [],
  },
};
