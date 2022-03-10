import { useState } from 'react'
import { LoginSignupForm } from '../cmps/login-signup/LoginSignupForm'
import { onLogin, onSignup } from '../store/user.actions.js'
import { connect } from 'react-redux'

export function _LoginSignup({ onLogin, onSignup }) {
    const [isSignup, setIsSignup] = useState(false)
    // const [users, setUsers] = useState([])



    const toggleSignup = () => {
        setIsSignup(!isSignup)
    }

    return (
        <div className="login-page">
            <div className={`form-container ${isSignup ? 'signup' : ''}`} >

                {!isSignup &&
                    <LoginSignupForm onLogin={onLogin} setIsSignup={setIsSignup} />
                }
                {isSignup &&
                    <LoginSignupForm onSignup={onSignup} setIsSignup={setIsSignup} />
                }
                <p>
                    <button className='btn-switch-auth' onClick={toggleSignup}>{!isSignup ? 'New here?' : 'Already a member?'}</button>
                </p>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    onLogin,
    onSignup
}



export const LoginSignup = connect(null, mapDispatchToProps)(_LoginSignup)
