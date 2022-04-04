const initialState = {
    currConversation: {},
    conversations: []
}
export function conversationReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_CONVERSATIONS':
            newState = { ...state, conversations: [...action.conversations] }
            break;
        case 'SET_CURR_CONVERSATION':
            newState = { ...state, currConversation: { ...action.conversation } }
            break;
        case 'ADD_CONVERSATION':
            newState = { ...state, conversations: [action.conversation, ...state.conversations] }
            break;
    }
    return newState
}
