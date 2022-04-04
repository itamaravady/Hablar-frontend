import { connect } from 'react-redux'
import { onAddMessage, loadMessages, setScroll } from '../store/message.actions.js'
import { loadConversation } from '../store/conversation.actions.js'
import { resetUsers, loadUsers, refreshAuthToken } from '../store/user.actions'
import { setConversationFilter } from '../store/user.actions.js'
import { useEffect } from 'react'
import { socketService } from '../services/socket.service.js';
import { AddMessageForm } from './messagner/AddMessageForm.jsx';
import { MessageList } from './messagner/MessageList.jsx';
import { SearchUser } from './conversation/SearchUser.jsx';
import { ConversationList } from './conversation/ConversationList.jsx';
import { useNavigate } from 'react-router-dom';


export function _Messanger({ refreshAuthToken, resetUsers, conversationFilter, setConversationFilter, loadMessages, onAddMessage, currConversation, messages, user, users, loadUsers, setScroll, isScroll, isScrollToBottom }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user._id) {
            navigate('authenticate')
        }
    }, [user])

    useEffect(() => {
        (async () => {
            if (currConversation.messages) {
                await loadMessages(currConversation.messages);
                setScroll(true, true);
            }
        })()
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

    return (
        <>
            <section className="conversation-container">
                <SearchUser resetUsers={resetUsers} loadUsers={loadUsers} users={users} conversationFilter={conversationFilter} setConversationFilter={setConversationFilter} />
                <ConversationList />
            </section>
            {!currConversation._id ?
                <section className="messanger-container">Go ahead and add a new contact!</section> :
                <section className="messanger-container">
                    <MessageList isScroll={isScroll} isScrollToBottom={isScrollToBottom} setScroll={setScroll} messages={messages} />
                    <AddMessageForm submit={submit} />
                </section>
            }
        </>
    )
}

function mapStateToProps(state) {
    return {
        messages: state.messageModule.messages,
        isScroll: state.messageModule.isScroll,
        isScrollToBottom: state.messageModule.isScrollToBottom,
        currConversation: state.conversationModule.currConversation,
        conversationFilter: state.userModule.conversationFilter,
        user: state.userModule.user,
        users: state.userModule.users,
    }
}

const mapDispatchToProps = {
    refreshAuthToken,
    onAddMessage,
    loadConversation,
    loadMessages,
    loadUsers,
    resetUsers,
    setScroll,
    setConversationFilter,
}


export const Messanger = connect(mapStateToProps, mapDispatchToProps)(_Messanger)