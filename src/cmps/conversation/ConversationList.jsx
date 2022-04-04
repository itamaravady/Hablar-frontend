import { loadConversation } from '../../store/conversation.actions'
import { connect } from 'react-redux'
import { ConversationPreview } from './ConversationPreview';
import { useEffect } from 'react';


export function _ConversationList({ user, loadConversation }) {
    useEffect(() => {
        if (user?.conversations[0]) {
            let filterBy = { _id: user.conversations[0]._id }
            loadConversation(filterBy)
        }
    }, [])
    return (

        (!user?.conversations?.length) ?
            <div>Search a contact to start a new conversation!</div> :
            <ul className="conversation-list clean-list">
                {user.conversations.map((conversation) => {
                    conversation.users = conversation.users.filter(currUser => currUser._id !== user._id)
                    return <ConversationPreview
                        key={conversation._id}
                        conversation={conversation}
                        currUserId={user._id}
                        loadConversation={loadConversation}
                    />
                })}
            </ul>
    )
}


function mapStateToProps(state) {
    return {
        messages: state.messageModule.messages,
        currConversation: state.conversationModule.currConversation,
        user: state.userModule.user,
        conversationFilter: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadConversation
}


export const ConversationList = connect(mapStateToProps, mapDispatchToProps)(_ConversationList)


