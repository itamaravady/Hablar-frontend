import { connect } from 'react-redux'
import { onAddMessage, loadMessages, setScroll } from '../store/message.actions.js'
import { loadConversation } from '../store/conversation.actions.js'
import { loadUsers } from '../store/user.actions'
import { setConversationFilter } from '../store/user.actions.js'
import { useEffect } from 'react'
import { AddMessageForm } from './messagner/AddMessageForm.jsx';
import { MessageList } from './messagner/MessageList.jsx';
import { SearchUser } from './conversation/SearchUser.jsx';
import { ConversationList } from './conversation/ConversationList.jsx';
import { useNavigate } from 'react-router-dom';

import { httpService } from '../services/http.service.js'
import { ConversationHeader } from './user/ConversationHeader.jsx'


export function _Messanger({ conversationFilter, setConversationFilter, loadMessages, onAddMessage, currConversation, messages, user, users, accessToken, setScroll, isScroll, isScrollToBottom }) {
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
        httpService.socketSetup(accessToken);

    }, [accessToken])

    useEffect(() => {
        httpService.socketSetup(accessToken);
        httpService.socketEmit('join conversation', user._id);
        httpService.socketOn('new message', ({ message, conversationId }) => {
            if (conversationId === currConversation._id) {
                onAddMessage(conversationId, message, true);
            }
        })
        return () => {
            httpService.socketOff('new message')
        }
    }, [currConversation])


    function submit(txt) {
        const toUser = currConversation.users.filter(currUser => currUser._id !== user._id);
        const toUserId = toUser[0]._id;
        const message = {
            toUserId,
            txt,
            timestamp: Date.now()
        }
        onAddMessage(currConversation._id, message);
        httpService.socketEmit('new message', { message, conversationId: currConversation._id });
    }

    return (
        <>
            <section className="conversation-container">
                <SearchUser users={users} conversationFilter={conversationFilter} setConversationFilter={setConversationFilter} />
                <ConversationList />
            </section>
            {!currConversation._id ?
                <section className="messanger-container">Go ahead and add a new contact!</section> :
                <div className='messanger-container'>
                    <ConversationHeader user={
                        currConversation.users.find(currUser => user._id !== currUser._id)
                    } />
                    <section className="messanger-wrapper">
                        <MessageList user={user} isScroll={isScroll} isScrollToBottom={isScrollToBottom} setScroll={setScroll} messages={messages} />
                        <AddMessageForm submit={submit} />
                    </section>
                </div>
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
        accessToken: state.userModule.accessToken,
    }
}

const mapDispatchToProps = {
    onAddMessage,
    loadConversation,
    loadMessages,
    loadUsers,
    setScroll,
    setConversationFilter,
}


export const Messanger = connect(mapStateToProps, mapDispatchToProps)(_Messanger)