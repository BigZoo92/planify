import { useState } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import MessageHead from './MessageHead';

const DetailMessage = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message, files) => {
    const newMessages = [
      ...messages,
      {
        position: 'right',
        type: 'text',
        text: message,
        date: new Date(),
        status: 'sent',
      },
    ];

    // Handle file messages if any
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        newMessages.push({
          position: 'right',
          type: 'photo',
          data: {
            uri: URL.createObjectURL(file),
            status: { click: false, loading: 0 },
          },
          date: new Date(),
          status: 'sent',
        });
      } else {
        newMessages.push({
          position: 'right',
          type: 'file',
          text: 'Please find the attached file.',
          data: {
            uri: URL.createObjectURL(file),
            status: { click: false, loading: 0 },
            size: `${Math.round(file.size / 1024)}KB`,
            extension: file.name.split('.').pop(),
          },
          date: new Date(),
          status: 'sent',
        });
      }
    });

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
