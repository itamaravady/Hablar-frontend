
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { UserMsg } from './user-msg.jsx'



function _AppFooter({ count, cart, checkout }) {

    return (
        <footer className="app-footer">
            <p>
                itamar avady
            </p>
            <UserMsg />
        </footer >
    )
}


function mapStateToProps(state) {
    return {
    }
}

const mapDispatchToProps = {

}

export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)