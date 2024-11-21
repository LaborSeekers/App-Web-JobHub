export interface message{
    id: number,
    content: string,
    sender: number | null,
    conversation?: number,
    isRead: boolean,
    createdAt: String
}