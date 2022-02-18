import { FormEvent, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { useAuth } from "../hooks/useAuth"

import { child, onValue, orderByChild, push, query, ref, update } from "firebase/database"
import { Timestamp } from "firebase/firestore"
import { realtimedb } from "../services/firebase"

import '../styles/components/chat.scss'

import { Button } from "./Button"
import ScrollableFeed from 'react-scrollable-feed'
import { Message } from "./Message"
import { useHideElement } from "../hooks/useHideElement"
import Picker from 'emoji-picker-react';

import { messagesSnapshotType, MessagesType, FirebaseMessageType } from "../types/components/chat";
import { LoadingCircle } from "./LoadingCircle"

export function Chat() {
    const { user } = useAuth()

    const [messageToSend, setMessageToSend] = useState('')
    const [messages, setMessages] = useState(null as MessagesType[] | null)

    const [isEmojiOpen, setIsEmojiOpen] = useState(false)
    useHideElement({ elementId: 'emoji-picker', setShowElement: setIsEmojiOpen })

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault()
        if (user) {
            if (messageToSend.trim() !== '') {
                const newMessageRef = push(child(ref(realtimedb), 'chat'))
                const timeNow = Timestamp.now()
                const newMessage: FirebaseMessageType = {
                    text: messageToSend,
                    author: user.id,
                    datePosted: timeNow.seconds,
                    authorPhoto: user.avatar,
                    authorName: user.name
                }

                await update(newMessageRef, newMessage)

            } else {
                toast.error('Write something')
            }
        }
        setMessageToSend('')
    }

    function handleEmojiPick(event: React.MouseEvent<Element, MouseEvent>, emojiObject: any) {
        setMessageToSend(prevMessage => prevMessage + emojiObject.emoji)
    }

    function handleEmojiPickerRender() {
        return <Picker onEmojiClick={(event, emojiObject) => handleEmojiPick(event, emojiObject)}
            pickerStyle={{
                backgroundColor: '#1D1D1D', boxShadow: '0 0 0px 1px black',
                borderColor: '#1D1D1D', display: isEmojiOpen ? 'flex' : 'none'
            }} />
    }

    useEffect(() => {
        const chatRef = query(ref(realtimedb, 'chat'), orderByChild('datePosted'))
        const unsubscribe = onValue(chatRef, snapshot => {
            const messagesSnapshot: messagesSnapshotType = snapshot.val() ?? {}
            const parsedMessages = Object.entries(messagesSnapshot).map(([key, value]) => {
                return {
                    key: key,
                    text: value.text,
                    author: value.author,
                    authorPhoto: value.authorPhoto,
                    authorName: value.authorName
                }
            })
            setMessages(parsedMessages)
        })

        return () => {
            unsubscribe()
        }
    }, [messages])

    return (
        <section className="chat-page-container">
            <Toaster position="top-center" toastOptions={{
                style: {
                    backgroundColor: '#1D1D1D',
                    color: '#fff'
                }
            }} />
            <div className="chat-container">
                <div className="messages-container">
                    {messages !== null ? (
                        <ScrollableFeed>
                            {messages.map(message => <Message key={message.key} messageInfo={message} />)}
                        </ScrollableFeed>
                    ) : <LoadingCircle />}
                </div>
            </div>
            <div className="message-input-container">
                <form onSubmit={(event) => handleSendMessage(event)}>
                    <div id="emoji-picker">
                        {handleEmojiPickerRender()}
                        <button type="button" className="emoji-button" onClick={() => setIsEmojiOpen(!isEmojiOpen)}>
                            <span className="material-icons-outlined">emoji_emotions</span>
                        </button>
                    </div>
                    <input type="text" placeholder="Mensagem..." maxLength={250}
                        value={messageToSend} onChange={(event) => setMessageToSend(event.target.value)} />
                    <Button type="submit">Enviar</Button>
                </form>
            </div>
        </section>
    )
}