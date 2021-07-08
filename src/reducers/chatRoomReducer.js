import { initialState } from "./initialState";
import { ROOM_ID, PARTICIPANTS } from "../actions/index";

const chatRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_ID:
      return { ...state, chatroom: action.payload};
    case PARTICIPANTS:
      return { 
        ...state, 
        chatroom: {
          ...state.chatroom.state,
          participants: [
            ...state.chatroom.participants,
            action.payload
          ]
        }
      };
    default:
      return state;
  }
};

export default chatRoomReducer;