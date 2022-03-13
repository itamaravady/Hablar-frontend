import { useRef, useEffect } from "react";
import { MessagePreview } from "./MessagePreview"

export function MessageList({ isScroll, isScrollToBottom, setScroll, messages }) {
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

                return <MessagePreview
                    key={msg._id}
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