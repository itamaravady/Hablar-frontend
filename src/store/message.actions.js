import { messageService } from "../services/message.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadMessages(conversation) {
    return (dispatch) => {
        dispatch({
            type: 'SET_MESSAGES',
            messages: conversation.messages
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
            showSuccessMsg('Message added')
        }
        catch (err) {
            showErrorMsg('Cannot add message')
            console.log('Cannot add message', err)
        }
    }
}
export function setScroll(isScroll) {
    return (dispatch) => {
        dispatch({
            type: 'SET_SCROLL',
            isScroll
        })
    }
}
