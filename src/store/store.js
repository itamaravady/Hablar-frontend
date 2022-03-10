import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { messageReducer } from './message.reducer.js'
import { userReducer } from './user.reducer.js'
import { conversationReducer } from './conversation.reducer'

const rootReducer = combineReducers({
    conversationModule: conversationReducer,
    messageModule: messageReducer,
    userModule: userReducer,
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


