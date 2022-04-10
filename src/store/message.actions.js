import { messageService } from "../services/message.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadMessages(messages) {
    return (dispatch) => {
        console.log('dispatching load messages')
        dispatch({
            type: 'SET_MESSAGES',
            messages
        })
    }
}
export function onAddMessage(conversationId, message, isAddLocally = false) {
    return async (dispatch) => {
        try {
            let savedMessage = message;
            if (!isAddLocally) {
                savedMessage = await messageService.save(conversationId, message);
            }
            dispatch({
                type: 'ADD_MESSAGE',
                message: savedMessage
            })
            dispatch({
                type: 'SET_SCROLL',
                isScroll: true
            })
        }
        catch (err) {
            console.log('Cannot add message', err)
        }
    }
}
export function setScroll(isScroll, isToBottom = false) {
    return (dispatch) => {
        if (!isToBottom) {
            dispatch({
                type: 'SET_SCROLL',
                isScroll
            })
        } else {
            dispatch({
                type: 'SET_SCROLL_TO_BOTTOM',
                isScroll
            })
        }
    }
}
