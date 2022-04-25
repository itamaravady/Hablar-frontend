import { connect } from 'react-redux';
import { useEffect } from 'react'
import { httpService } from '../../services/http.service';
import { getUserByName } from '../../store/user.actions';
import { onAddMessage, onGetBotMessage } from '../../store/message.actions';

export function _Bot({ getUserByName, accessToken, currConversation, onGetBotMessage, onAddMessage, user }) {

    useEffect(() => {
        httpService.socketSetup(accessToken);
        return () => {
            httpService.socketTerminate();
        }
    }, [accessToken]);

    useEffect(() => {
        //bring user bot
        (async () => {
            const botUser = await getUserByName({ username: 'bot' });
            console.log('botUser:', botUser);
            httpService.socketEmit('join conversation', botUser._id);

            httpService.socketOn('new bot message', async ({ message, conversationId }) => {

                if (conversationId === currConversation._id) {

                    //send req for bot message and Emit new message with the recieved txt
                    const longestWord = message.txt.split(/\W/).sort((w1, w2) => w1.length - w2.length).pop();
                    const txtArr = await onGetBotMessage();
                    const txt = `Well, I don't know about "${longestWord}", but as ${txtArr[0].author} said, ${txtArr[0].quote}`;
                    const toUser = currConversation.users.filter(currUser => currUser._id === user._id);
                    const toUserId = toUser[0]._id;
                    const newMessage = {
                        toUserId,
                        txt,
                        timestamp: Date.now(),
                    };
                    onAddMessage(currConversation._id, newMessage);
                }

            })
        })();
        return () => {
            httpService.socketOff('new message')
        }
    }, []);

    return (
        <span className='bot-cmp'></span>
    )
}

function mapStateToProps(state) {
    return {
        messages: state.messageModule.messages,
        isScroll: state.messageModule.isScroll,
        currConversation: state.conversationModule.currConversation,
        user: state.userModule.user,
        accessToken: state.userModule.accessToken,
    }
}

const mapDispatchToProps = {
    onAddMessage,
    getUserByName,
    onGetBotMessage,
}


export const Bot = connect(mapStateToProps, mapDispatchToProps)(_Bot)


