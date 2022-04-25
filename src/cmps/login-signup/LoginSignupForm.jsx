import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginSignupForm({ onLogin, onSignup, setIsSignup }) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const navigate = useNavigate();
    const submit = async ev => {
        ev.preventDefault();
        try {
            if (onLogin) await onLogin(credentials);
            else if (onSignup) await onSignup(credentials);
            clearState();
            navigate('/');
        }
        catch (err) {
            throw new Error(err);
        }
    }

    const handleChange = ev => {
        const field = ev.target.name;
        const value = ev.target.value;
        setCredentials({ ...credentials, [field]: value });
    }

    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '' })
        setIsSignup(false)
    }

    return (
        <form className="login-form" onSubmit={submit}>
            {onSignup && <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
                autoFocus
                autoComplete='off'
            />}
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
                autoComplete='off'

            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete='off'
            />
            <button>{onSignup ? 'Signup' : 'Login'}</button>
        </form>
    )
}
