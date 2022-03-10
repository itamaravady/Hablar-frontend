import { MessagePreview } from "./MessagePreview"

export function MessageList({ messages }) {


    if (!messages.length) return <div>Nothing here</div>;

    return (
        <ul className="message-list clean-list">
            {messages.map((msg, i) => {
                let isLastMsg = false;
                if (i === messages.length - 1) isLastMsg = true;

                return <MessagePreview
                    key={msg._id}
                    message={msg}
                    isLastMsg={isLastMsg}
                />
            })}
        </ul>
    )
}


