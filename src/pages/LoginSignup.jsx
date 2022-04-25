import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { LoginSignupForm } from '../cmps/login-signup/LoginSignupForm'
import { onLogin, onSignup } from '../store/user.actions.js'
import { connect } from 'react-redux'

export function _LoginSignup({ onLogin, onSignup }) {
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate();


    const authAsGuest = async () => {
        const randNum = parseInt(Math.random() * 100000)
        const credentials = {
            username: `guest${randNum}`,
            fullname: `guest${randNum}`,
            password: `guest${randNum}`,
            isGuest: true
        }
        await onSignup(credentials);
        navigate('/');

    }
    const toggleSignup = () => {
        setIsSignup(!isSignup)
    }

    return (
        <div className="login-page">
            <p>
                <button className='btn-guest' onClick={authAsGuest}>Continue as guest</button>
            </p>

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
