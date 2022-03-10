import { useState } from 'react'


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
            <input
                className='txt-input'
                type="text"
                value={txt}
                onChange={handleChange} />
            <button>send</button>
        </form>
    )
}