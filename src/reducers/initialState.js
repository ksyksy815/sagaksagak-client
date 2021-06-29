export const initialState = {
  user: {
    userId: "",
    accessToken: "",
    isLogedIn: false,
  },
  toDos: [
    {
      id: 0,
      content: "",
      createdAt: "",
      isChecked: false,
    },
  ],
  completeToDos: [
    {
      id: 0,
      content: "",
      updatedAt: "",
      isChecked: true,
    },
  ],
};
