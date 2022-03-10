import { conversationService } from "../services/conversation.service.js";
import { userService } from "../services/user.service.js";

export function loadConversation() {
    return async (dispatch) => {
        try {
            const conversation = await conversationService.query();
            dispatch({
                type: 'SET_CONVERSATION',
                conversation
            })
        }
        catch (err) {
            console.log('Cannot load conversation', err)
        };

    }
}
export function onAddConversation(conversation) {
    return async (dispatch) => {
        try {
            const savedConversation = await conversationService.save(conversation);
            dispatch({
                type: 'ADD_CONVERSATION',
                conversation: savedConversation
            })
        }
        catch (err) {
            console.log('Cannot add conversation', err)
        }
    }
}
