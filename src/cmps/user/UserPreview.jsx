

export function UserPreview({ user, onAddConversation }) {
    return <li className="user-preview" onClick={() => onAddConversation(user)}>{user.fullname}</li>
}