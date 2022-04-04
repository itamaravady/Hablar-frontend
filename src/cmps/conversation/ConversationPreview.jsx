export function ConversationPreview({ conversation, loadConversation }) {
    let filterBy = { _id: conversation._id }
    return <div>
        <ul className="clean-list conversation-users-list">
            {conversation.users.map(user => {
                return <li onClick={() => loadConversation(filterBy)} key={user._id}>
                    {user.fullname}
                </li>
            })}
        </ul>
    </div>
}