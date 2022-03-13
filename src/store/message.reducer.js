const initialState = {
    messages: [],
    isScroll: false,
    isScrollToBottom: false
}
export function messageReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_MESSAGES':
            newState = { ...state, messages: [...action.messages] }
            break;
        case 'ADD_MESSAGE':
            newState = { ...state, messages: [...state.messages, action.message] }
            break;
        case 'SET_SCROLL':
            newState = { ...state, isScroll: action.isScroll }
            break;
        case 'SET_SCROLL_TO_BOTTOM':
            newState = { ...state, isScrollToBottom: action.isScroll }
            break;
    }
    return newState
}
