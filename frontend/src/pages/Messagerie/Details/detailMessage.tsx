import { useState } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import MessageHead from './MessageHead';

const DetailMessage = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message, files) => {
    if (!message && files.length === 0) {
      return; // Do not send empty messages
    }

    const newMessages = [...messages];

    const newMessage = {
      position: 'right',
      type:
        files.length > 0 && message
          ? 'custom'
          : files.length > 0
            ? 'photo'
            : 'text',
      text: message,
      files: files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        uri: URL.createObjectURL(file),
        status: { click: false, loading: 0 },
        extension: file.name.split('.').pop(),
      })),
      date: new Date(),
      status: 'sent',
    };

    newMessages.push(newMessage);

    setMessages(newMessages);
  };

  return (
    <div id="detail-message">
      <MessageHead
        title="John Doe"
        subtitle="Online"
        avatarUrl="https://via.placeholder.com/150"
      />
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default DetailMessage;
