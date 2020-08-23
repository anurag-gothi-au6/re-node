import * as action_type from "../actions/action_types";

const initialState = {
  postData:[],
  private_data:[],
  user_news_feed:[],
  all_posts:[],
};

export const post_reducer = (state = initialState, action) => {
  switch (action.type) {
    case action_type.fetch_post:
      return {
        ...state,
        postData: action.payload,
        all_posts:state.all_posts=[...state.all_posts,...action.payload.message]
      }
    case action_type.fetch_user_newsfeed:
      return { ...state,
        user_news_feed:action.payload
       }
    case action_type.fetch_user_private_post:
        return { ...state,
          private_data:action.payload,
          all_posts:state.all_posts=[...state.all_posts,...action.payload.message]
        }
    default:return state;
  }
};
