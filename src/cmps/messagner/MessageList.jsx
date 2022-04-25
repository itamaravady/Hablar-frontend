import React, { useRef, useEffect } from "react";
import { MessagePreview } from "./MessagePreview"
import { utilService } from "../../services/util.service";

export const MessageList = React.memo(({ user, isScroll, isScrollToBottom, setScroll, messages }) => {
    console.log('message list rendered');
    const bottomScrollRef = useRef(null);
    useEffect(() => {
        if (isScrollToBottom) {
            bottomScrollRef.current.scrollIntoView({ behavior: "smooth" });
            setScroll(false, true);
        }
    }, [isScrollToBottom, setScroll])

    if (!messages.length) return <div className="message-list empty-list" ref={bottomScrollRef}></div>;

    return (
        <ul className="message-list clean-list">
            {messages.map((msg, i) => {
                let isLastMsg = i === messages.length - 1;
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
});