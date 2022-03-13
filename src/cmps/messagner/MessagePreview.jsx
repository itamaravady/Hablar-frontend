import { useRef, useEffect } from "react";

export function MessagePreview({ message, setScroll, isScroll, isLastMsg }) {
    let lastMsgRef = useRef(null);

    useEffect(() => {
        if (isScroll && isLastMsg) {
            lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
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

