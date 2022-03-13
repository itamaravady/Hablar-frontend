import { onAddConversation } from '../../store/conversation.actions'
import { connect } from 'react-redux'

// export function ConversationList({ conversations }) {
export function _ConversationList({ setScrollDown, loadConversation, onAddConversation }) {


    // if (!conversations.length) return <div>Search a contact to start a new conversation!</div>;
    const conversation = {
        users: ["6224b519694f0c182422fca5", "6224b4f4eecd8708c4ed5b96"],
    }
    return (
        <ul>list
            <button onClick={() => onAddConversation(conversation)}>Add conversation</button>
            <button onClick={() => loadConversation({ _id: "6228d917d7c01a1f205f987f" })}>Load conversation</button>
        </ul>
        // <ul className="conversation-list clean-list">
        //     {conversation.map((conversation) => {
        //         return <ConversationPreview
        //             key={conversation._id}
        //             conversation={conversation}
        //         />
        //     })}
        // </ul>
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
    onAddConversation,
}


export const ConversationList = connect(mapStateToProps, mapDispatchToProps)(_ConversationList)


