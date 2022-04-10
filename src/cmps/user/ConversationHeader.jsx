import { useEffect } from 'react'
import { UserPreview } from './UserPreview'

export function ConversationHeader({ user }) {

    return <header className="conversation-header">
        <div className='conversation-user-name'>{user.fullname}</div>
    </header>
}