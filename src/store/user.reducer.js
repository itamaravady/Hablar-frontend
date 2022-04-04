const initialState = {
    accessToken: '',
    refreshToken: '',
    user: {
        conversations: [],
    },
    users: [],
    conversationFilter: { txt: '' },
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            newState = { ...state, accessToken: action.accessToken }
            break;
        case 'SET_REFRESH_TOKEN':
            newState = { ...state, refreshToken: action.refreshToken }
            break;
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'ADD_USER_CONVERSATION':
            newState = { ...state, user: { ...state.user, conversations: [...state.user.conversations, action.conversation] } }
            break;
        // case 'REMOVE_USER':
        //     newState = {
        //         ...state,
        //         users: state.users.filter(user => user._id !== action.userId)
        //     }
        // break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'SET_CONVERSATION_FILTER':

            newState = { ...state, conversationFilter: { ...state.conversationFilter, txt: action.filter.txt } }
            break;
        default:
    }
    return newState;

}
