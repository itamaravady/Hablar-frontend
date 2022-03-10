const initialState = {
    currConversation: {},
    conversations: []
}
export function conversationReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_CONVERSATION':
            newState = { ...state, conversation: { ...action.conversation } }
            break;
        case 'ADD_CONVERSATION':
            newState = { ...state, conversations: [action.conversation, ...state.conversations] }
            break;
    }
    return newState
}
