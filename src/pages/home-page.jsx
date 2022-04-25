import React from 'react'
import { connect } from 'react-redux'
import { Bot } from '../cmps/bot/Bot'
import { Messanger } from '../cmps/Messanger'


function _HomePage({ user }) {

    return (


        <main className='chat-container'>
            {!!(user._id) && <Bot />}
            <Messanger />
        </main>

    )
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)