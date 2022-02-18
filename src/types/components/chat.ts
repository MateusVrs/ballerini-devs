export type FirebaseMessageType = {
    text: string
    datePosted: number
    author: string
    authorPhoto: string | null,
    authorName: string
}

export type MessagesType = {
    text: string
    author: string
    authorPhoto: string | null
    key: string
    authorName: string
}

export type messagesSnapshotType = Record<string, {
    text: string
    datePosted: number
    author: string
    authorPhoto: string | null
    authorName: string
}>