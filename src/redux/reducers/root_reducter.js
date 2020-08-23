import { combineReducers } from 'redux'
import { user_reducer } from './user_reducer'
import { post_reducer } from './post_reducer'

let reducers = combineReducers({
    user_reducer,
    post_reducer
})

export default reducers