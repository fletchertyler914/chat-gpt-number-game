export interface ChatBubbleProps {
  message?: string;
  index: number;
  isUser: boolean;
  loading?: boolean;
}
export const ChatBubble = ({
  message,
  isUser,
  index,
  loading,
}: ChatBubbleProps) => (
  <div
    id={index.toLocaleString()}
    className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}
  >
    <div
      className={`chat-bubble ${
        isUser ? 'chat-bubble-primary' : 'chat-bubble-secondary'
      }`}
    >
      {loading ? 'Loading...' : message}
    </div>
  </div>
);
