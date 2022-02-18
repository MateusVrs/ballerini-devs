import { Fragment } from "react";

import { MessageProps } from "../types/components/message";

import '../styles/components/message.scss'
import { useAuth } from "../hooks/useAuth";
import { ref, remove } from "firebase/database";
import { realtimedb } from "../services/firebase";

export function Message({ messageInfo }: MessageProps) {
    const { user } = useAuth()

    async function handleDeleteMessage() {
        if (user) {
            await remove(ref(realtimedb, `chat/${messageInfo.key}`))
        }
    }

    return (
        <Fragment>
            <div className="message">
                <img src={messageInfo.authorPhoto || ''} alt="profile" />
                <div className="content">
                    <div className="header">
                        <span>{messageInfo.authorName}</span>
                        {user?.id === messageInfo.author && (
                            <div className="buttons-container">
                                <button type="button" onClick={() => handleDeleteMessage()}>
                                    <span className="material-icons-outlined">delete</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <p>{messageInfo.text}</p>
                </div>
            </div>
        </Fragment>
    )
}