import { initialState } from "./initialState";
import { ROOM_ID, PARTICIPANTS, ADD_USER, DELETE_USER } from "../actions/index";

const chatRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_ID:
      return { ...state, chatroom: action.payload};
    case PARTICIPANTS:
      return { 
        ...state, 
        chatroom: {
          ...state.chatroom,
          participants: action.payload.users
        }
      };
    case ADD_USER:
      return {
        ...state,
        chatroom: {
          ...state.chatroom,
          participants: [...state.chatroom.participants, action.payload ]
        }
      }
    case DELETE_USER:
      let users = state.chatroom.participants.filter(el => el.peerId !== action.payload.peerId)
      return {
        ...state,
        chatRoom: {
          ...state.chatroom,
          participants: users
        }
      }
    default:
      return state;
  }
};

export default chatRoomReducer;