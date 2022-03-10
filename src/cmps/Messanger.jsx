import { connect } from 'react-redux'
import { onAddMessage, loadMessages } from '../store/message.actions.js'
import { loadConversation } from '../store/conversation.actions.js'
import { useEffect } from 'react'
import { socketService } from '../services/socket.service.js';

import { AddMessageForm } from './messagner/AddMessageForm.jsx';
import { MessageList } from './messagner/MessageList.jsx';
import { SearchConversation } from './conversation/SearchConversation.jsx';
import { ConversationList } from './conversation/ConversationList.jsx';
import { useNavigate } from 'react-router-dom';

export function _Messanger({ loadConversation, onAddMessage, currConversation, messages, user }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('authenticate')
        }
    }, [])
    useEffect(() => {
        (async () => {
            await loadConversation();
        })();
    }, [])
    useEffect(() => {
        loadMessages(currConversation);
    }, [currConversation])
    useEffect(() => {
        socketService.setup();
        socketService.on('new message', (newMessage) => {
            onAddMessage(currConversation.Id, newMessage, true);
        })
        return () => {
            socketService.off('new message')
        }
    }, [])


    function submit(txt) {
        const message = {
            toUserId: '6224b519694f0c182422fca5',
            txt,
            timestamp: Date.now()
        }
        onAddMessage(currConversation._id, message)
        socketService.emit('new message', message);
    }
    if (!currConversation) return <div>Loading...</div>
    return (
        <>
            <section className="conversation-container">
                <SearchConversation />
                <ConversationList />
            </section>
            <section className="messanger-container">
                <MessageList messages={messages} />
                <AddMessageForm submit={submit} />
            </section>
        </>
    )
}

function mapStateToProps(state) {
    return {
        messages: state.messageModule.messages,
        currConversation: state.conversationModule.currConversation,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onAddMessage,
    loadConversation,
    loadMessages,
}


export const Messanger = connect(mapStateToProps, mapDispatchToProps)(_Messanger)