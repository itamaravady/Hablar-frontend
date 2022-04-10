import { useRef, useEffect } from "react";

export function MessagePreview({ message, setScroll, isScroll, isLastMsg, sentClass }) {
    let lastMsgRef = useRef(null);

    useEffect(() => {
        if (isScroll && isLastMsg) {
            lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
            setScroll(false);
        }
    }, [isScroll, setScroll])

    function formatTime(timestamp) {
        let date = new Date(timestamp)
        return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    }
    if (isLastMsg) {
        return (
            <li ref={lastMsgRef} className={`clean-list message-preview ${sentClass}`}>
                <span className="message-time">{formatTime(message.timestamp)}</span>
                {message.txt}
            </li>
        )
    }
    return (
        <li className={`clean-list message-preview ${sentClass}`}>
            <span className="message-time">{formatTime(message.timestamp)}</span>
            {message.txt}
        </li>
    )
}

