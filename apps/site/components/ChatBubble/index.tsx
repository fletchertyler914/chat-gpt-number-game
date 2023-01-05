export interface ChatBubbleProps {
  message: string;
  index: number;
  isUser: boolean;
}
export const ChatBubble = ({ message, isUser, index }: ChatBubbleProps) => (
  <div
    id={index.toLocaleString()}
    className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}
  >
    <div className="chat-bubble">{message}</div>
  </div>
);
