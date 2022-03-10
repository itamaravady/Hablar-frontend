import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

function _AppHeader({ onLogin, onSignup, onLogout, user }) {

    return (
        <header className="app-header">
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

                {user &&
                    <span className="user-info">
                        {user.fullname}
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }

                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }

            </nav>

        </header>
    )
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        count: state.userModule.count,
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)