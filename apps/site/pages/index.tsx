import { useCallback, useEffect, useState } from 'react';
import { ChatBubble } from '../components/ChatBubble';
import { PromptRequestProps } from './api/prompt';

export const Index = () => {
  const [promptText, setPromptText] = useState('start game');
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [messages, setMessages] = useState([]);

  const submitPrompt = useCallback(async () => {
    setLoading(true);

    const prompt = { User: promptText };
    const body: PromptRequestProps = {
      prompt,
      messages,
    };

    setPromptText('');
    setMessages([...messages, prompt]);

    if (!init) {
      body.init = true;
      setInit(true);
    }

    await fetch('api/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((responseMessages) => {
        const _messages = Array.isArray(responseMessages)
          ? responseMessages
          : [
              ...messages,
              { Game: 'Something went wrong, lets restart this game.' },
            ];
        setMessages(_messages);
        setLoading(false);
      });
  }, [init, messages, promptText]);

  useEffect(() => {
    window.scrollTo({
      top: document.getElementById(`${messages.length}`)?.offsetTop,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex h-full flex-col overflow-auto">
        <p className="flex self-center mt-10">
          Type &quot;start game&quot; to begin:
        </p>
        <div className="p-4 flex flex-col gap-8">
          {messages?.map((message, index) => {
            const parsedMessage = Object.values(message)[0] as string;
            const isUser = (Object.keys(message)[0] as string) === 'User';
            return (
              <ChatBubble
                key={JSON.stringify(message)}
                message={parsedMessage}
                index={index}
                isUser={isUser}
              />
            );
          })}
          {loading && (
            <ChatBubble
              key="loading"
              loading={true}
              index={messages.length + 1}
              isUser={false}
            />
          )}
        </div>
      </div>
      <div className="h-20 w-full flex items-center justify-between px-2 py-4">
        <input
          type="text"
          placeholder="Type here"
          value={promptText}
          className="input input-lg	input-bordered w-full"
          onChange={(event) => setPromptText(event.target.value)}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              submitPrompt();
            }
          }}
        />

        <button type="button" className="w-20" onClick={submitPrompt}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Index;
