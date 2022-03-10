import React from 'react'
import { connect } from 'react-redux'
import { Messanger } from '../cmps/Messanger'


function _HomePage() {

    return (
        <main className='chat-container'>
            <Messanger />
        </main>
    )
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)