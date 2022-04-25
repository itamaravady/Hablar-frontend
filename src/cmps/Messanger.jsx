import { connect } from 'react-redux'
import { onAddMessage, loadMessages, setScroll } from '../store/message.actions.js'
import { loadConversation, addConversation, addConversationOnNewMessage } from '../store/conversation.actions.js'
import { loadUsers, onLogout, getUserByName } from '../store/user.actions'
import { setConversationFilter } from '../store/user.actions.js'
import { useEffect } from 'react'
import { AddMessageForm } from './messagner/AddMessageForm.jsx';
import { MessageList } from './messagner/MessageList.jsx';
import { SearchUser } from './conversation/SearchUser.jsx';
import { ConversationList } from './conversation/ConversationList.jsx';
import { useNavigate } from 'react-router-dom';

import { httpService } from '../services/http.service.js'
import { ConversationHeader } from './user/ConversationHeader.jsx'
import { UserPanel } from './user/UserPanel.jsx'


export function _Messanger({ addConversation, conversationFilter, setConversationFilter, loadMessages, onAddMessage, currConversation, messages, user, users, accessToken, setScroll, isScroll, isScrollToBottom, onLogout, getUserByName }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user._id) {
            navigate('authenticate')
        } else {
            (async () => {
                const botUser = await getUserByName({ username: 'bot' });

                const botConversation = {
                    isBot: true,
                    users: [
                        {
                            _id: user._id,
                            fullname: user.fullname
                        },
                        {
                            _id: botUser._id,
                            fullname: botUser.fullname
                        }
                    ],
                    messages: [],
                };
                addConversation(botConversation, user);
                const botMessage = {
                    toUserId: user._id,
                    txt: 'Hi!',
                    timestamp: Date.now()
                }

                onAddMessage(botConversation._id, botMessage);
            })();
        }
    }, [user])

    useEffect(() => {
        (async () => {
            if (currConversation.messages) {
                await loadMessages(currConversation.messages);
                setScroll(true, true);
            }
        })()
    }, [currConversation, loadMessages, setScroll])

    useEffect(() => {
        httpService.socketSetup(accessToken);
        return () => {
            httpService.socketTerminate();
        }
    }, [accessToken]);

    useEffect(() => {

        httpService.socketEmit('join conversation', user._id);
        httpService.socketOn('new message', ({ message, conversationId }) => {
            if (conversationId === currConversation._id) onAddMessage(conversationId, message, true)
            else if (!user.conversations.find(conver => conver._id === conversationId)) {
                console.log('not the curr conversation');
                addConversationOnNewMessage(conversationId, user);
            }
        })
        return () => {
            httpService.socketOff('new message');
        }
    }, [currConversation, onAddMessage, user])


    function submit(txt) {
        const toUser = currConversation.users.filter(currUser => currUser._id !== user._id);
        const toUserId = toUser[0]._id;
        const message = {
            toUserId,
            txt,
            timestamp: Date.now()
        }
        onAddMessage(currConversation._id, message);
        let socketEv = currConversation.isBot ? 'new bot message' : 'new message'
        httpService.socketEmit(socketEv, { message, conversationId: currConversation._id });
    }
    return (
        <>
            <section className="conversation-container">
                <UserPanel user={user} onLogout={onLogout} />
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
    addConversation,
    loadConversation,
    loadMessages,
    loadUsers,
    getUserByName,
    onLogout,
    setScroll,
    setConversationFilter,
}


export const Messanger = connect(mapStateToProps, mapDispatchToProps)(_Messanger)