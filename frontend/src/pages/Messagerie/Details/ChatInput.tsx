import { useState } from 'react';
import { Input } from 'react-chat-elements';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg) => {
    console.log('Send message:', msg);
    // Logique pour envoyer le message au serveur ou ajouter à la liste des messages
  };

  return (
    <Input
        placeholder="Type here..."
        multiline={true}
        maxHeight={200}
        rightButtons={
            <button onClick={() => handleSend(message)}>
            Send
            </button>
        }
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        />
  );
};

export default ChatInput;
