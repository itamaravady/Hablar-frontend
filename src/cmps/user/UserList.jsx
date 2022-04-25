import { UserPreview } from './UserPreview'

export function UserList({ users, currUser, onAddConversation, searchTerm }) {

    if (!searchTerm) return <ul className='clean-list hidden-search-list'></ul>
    if (!users.length) return <ul className='clean-list empty-search-list'>Contact Not Found 😶</ul>
    return <ul className='clean-list'>
        {users.filter(user => user._id !== currUser._id).map(user => <UserPreview onAddConversation={onAddConversation} key={user._id} user={user} />)}
    </ul>
};