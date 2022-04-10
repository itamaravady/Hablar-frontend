import { useRef, useEffect } from "react";
import { MessagePreview } from "./MessagePreview"
import { utilService } from "../../services/util.service";

export function MessageList({ user, isScroll, isScrollToBottom, setScroll, messages }) {
    const bottomScrollRef = useRef(null);
    useEffect(() => {
        if (isScrollToBottom) {
            bottomScrollRef.current.scrollIntoView({ behavior: "smooth" });
            setScroll(false, true);
        }
    }, [isScrollToBottom])

    if (!messages.length) return <div ref={bottomScrollRef}>Nothing here</div>;

    return (
        <ul className="message-list clean-list">
            {messages.map((msg, i) => {
                let isLastMsg = false;
                if (i === messages.length - 1) isLastMsg = true;
                const currKey = utilService.makeId(6);
                return <MessagePreview
                    sentClass={msg.toUserId !== user._id ? 'sent' : 'recieved'}
                    key={currKey}
                    message={msg}
                    isLastMsg={isLastMsg}
                    setScroll={setScroll}
                    isScroll={isScroll}
                />
            })}
            <div key='bottomScrollRef' ref={bottomScrollRef} className='bottom-scroll'></div>
        </ul>
    )
}