import * as action_type from "../actions/action_types";

const initialState = {
  userData: "",
  userNewsfeed:[]
};

export const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case action_type.fetch_user_data:
      return {
        ...state,
        userData: action.payload,
      };
    case action_type.fetch_user_newsfeed:
      return { 
        ...state,
        userNewsfeed : action.payload,  
      }
    default:
      return state;
  }
};
