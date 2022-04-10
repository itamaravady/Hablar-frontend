import { useState } from 'react'
import { ReactComponent as SendLogo } from '../../assets/svg/send.svg';

export function AddMessageForm({ submit }) {
    const [txt, setTxt] = useState('')

    function handleChange({ target }) {
        const { value } = target
        setTxt(value)
    }

    function onSubmit(ev) {
        ev.preventDefault();
        submit(txt);
        setTxt('');
    }

    return (
        <form className='new-message-form' onSubmit={onSubmit}>
            <textarea
                className='txt-input'
                // type="text"
                value={txt}
                onChange={handleChange} />
            <button><SendLogo className='send-logo' /></button>
        </form>
    )
}