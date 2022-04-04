import { conversationService } from "../services/conversation.service.js";
import { userService } from "../services/user.service.js";

export function loadConversation(filterBy) {
    return async (dispatch) => {
        try {
            const conversations = await conversationService.query(filterBy);
            dispatch({
                type: 'SET_CURR_CONVERSATION',
                conversation: conversations["0"]
            })
        }
        catch (err) {
            console.log('Cannot load conversation', err)
        };

    }
}
export function addConversation(conversation, currUser) {
    return async (dispatch, getState) => {
        try {
            const savedConversation = await conversationService.save(conversation);
            let state = getState();
            const existConversation = state.conversationModule.conversations.filter(conver => conver._id === savedConversation._id)
            console.log('existConversation:', existConversation);
            if (existConversation.length) return;

            dispatch({
                type: 'ADD_CONVERSATION',
                conversation: savedConversation
            });
            dispatch({
                type: 'SET_CURR_CONVERSATION',
                conversation: savedConversation
            })
            delete savedConversation.messages;
            const user = { ...currUser, conversations: [savedConversation, ...currUser.conversations] }
            let savedUser = await userService.save(user);
            dispatch({
                type: 'SET_USER',
                user: savedUser
            });

        }
        catch (err) {
            console.log('Cannot add conversation', err)
        }
    }
}
