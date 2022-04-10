import { useEffect } from 'react'
import { UserPreview } from './UserPreview'

export function UserList({ users, currUser, onAddConversation }) {
    console.log('users:', users);
    if (!users.length) return <ul className='clean-list empty-search-list'>Contact Not Found 😶</ul>
    return <ul className='clean-list'>
        {users.filter(user => user._id !== currUser._id).map(user => <UserPreview onAddConversation={onAddConversation} key={user._id} user={user} />)}
    </ul>
}