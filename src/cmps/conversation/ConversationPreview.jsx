export function ConversationPreview({ conversation, loadConversation, user }) {
    let filterBy = { _id: conversation._id }
    return <li className="clean-list conversation-user-preview"
        onClick={() => loadConversation(filterBy)}
        key={conversation._id}>
        {conversation.users.find(currUser => currUser._id !== user._id).fullname}
    </li>
}