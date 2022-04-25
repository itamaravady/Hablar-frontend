import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { default as useDebounce } from '../../Hooks/useDebounce'

import { loadUsers, resetUsers, setConversationFilter } from '../../store/user.actions';
import { addConversation } from '../../store/conversation.actions';

import { UserList } from '../user/UserList';

export function _SearchUser({ addConversation, resetUsers, loadUsers, currUser, users, conversationFilter, setConversationFilter }) {
    const [searchTerm, setTerm] = useState('');
    const debounceTerm = useDebounce(searchTerm);

    function handleChange({ target }) {
        setTerm(target.value);
    }

    function onSubmit(ev) {
        ev.preventDefault();
    }

    function onAddConversation(user) {
        const conversation = {
            users: [
                {
                    _id: user._id,
                    fullname: user.fullname
                },
                {
                    _id: currUser._id,
                    fullname: currUser.fullname
                }
            ],
            messages: [],
        }
        addConversation(conversation, currUser);
        resetUsers();
        setTerm('');
    };

    useEffect(() => {
        setConversationFilter({ txt: debounceTerm });
    }, [debounceTerm])

    useEffect(() => {
        if (conversationFilter.txt !== '') loadUsers(conversationFilter);
        else resetUsers();
    }, [conversationFilter])

    return (
        <>
            <form onSubmit={onSubmit} className="search-conversation-form">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={handleChange} />
            </form>
            <section className={`search-result ${conversationFilter.txt !== '' ? 'active' : ''}`}>
                <UserList onAddConversation={onAddConversation} currUser={currUser} users={users} />
            </section>
        </>
    )
}


function mapStateToProps(state) {
    return {
        currConversation: state.conversationModule.currConversation,
        users: state.userModule.users,
        currUser: state.userModule.user,
    }
}

const mapDispatchToProps = {
    loadUsers,
    resetUsers,
    setConversationFilter,
    addConversation,
}


export const SearchUser = connect(mapStateToProps, mapDispatchToProps)(_SearchUser)