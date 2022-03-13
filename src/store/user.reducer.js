import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    conversationFilter: {},
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'SET_CONVERSATION_FILTER':
            newState = { ...state, conversationFilter: { ...state.conversationFilter, txt: action.txt } }
            break;
        default:
    }
    return newState;

}
