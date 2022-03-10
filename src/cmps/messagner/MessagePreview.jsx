import { useRef, useEffect } from "react";
import { connect } from 'react-redux'
import { setScroll } from '../../store/message.actions.js'



export function _MessagePreview({ message, setScroll, isScroll, isLastMsg }) {
    let lastMsgRef = useRef(null);

    useEffect(() => {
        if (isScroll && isLastMsg) {
            lastMsgRef.current.scrollIntoView();
            setScroll(false);
        }
    }, [isScroll, setScroll])

    function formatTime(timestamp) {
        let date = new Date(timestamp)
        return date.toLocaleTimeString('he-IL')
    }
    if (isLastMsg) {
        return (
            <li ref={lastMsgRef} className="clean-list message-preview">
                <span className="message-time">{formatTime(message.timestamp)}</span>
                {message.txt}
            </li>
        )
    }
    return (
        <li className="clean-list message-preview">
            <span className="message-time">{formatTime(message.timestamp)}</span>
            {message.txt}
        </li>
    )
}


function mapStateToProps(state) {
    return {
        messages: state.messageModule.messages,
        isScroll: state.messageModule.isScroll,
    }
}

const mapDispatchToProps = {
    setScroll
}

export const MessagePreview = connect(mapStateToProps, mapDispatchToProps)(_MessagePreview)
