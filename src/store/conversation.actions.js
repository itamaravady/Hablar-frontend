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
    return async (dispatch) => {
        try {
            const savedConversation = await conversationService.save(conversation);
            const existConversation = currUser.conversations.filter(conver => conver._id === savedConversation._id);
            dispatch({
                type: 'SET_CURR_CONVERSATION',
                conversation: savedConversation
            })
            if (existConversation.length) return;

            dispatch({
                type: 'ADD_CONVERSATION',
                conversation: savedConversation
            });

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
export function addConversationOnNewMessage(conversationId, currUser) {

    return async (dispatch) => {
        try {
            const conversation = await conversationService.query({ _id: conversationId });
            dispatch({
                type: 'ADD_CONVERSATION',
                conversation
            });

            delete conversation.messages;
            const user = { ...currUser, conversations: [conversation, ...currUser.conversations] }
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
