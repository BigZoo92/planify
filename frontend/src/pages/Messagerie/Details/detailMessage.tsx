import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageHead from './MessageHead';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import chatData from './../chatData.json';

const DetailMessage = () => {
  const { id } = useParams();
  const contact = chatData.contacts.find((contact) => contact.id === id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

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

    files.forEach((file) => {
      newMessages.push({
        position: 'right',
        type: 'file',
        text: file.name,
        data: {
          uri: URL.createObjectURL(file),
          status: { click: false, loading: 0 },
          size: `${Math.round(file.size / 1024)} KB`,
          extension: file.name.split('.').pop(),
        },
        date: new Date(),
        status: 'sent',
      });
    });

    setMessages(newMessages);
  };

  return (
    <div id="detail-message">
      <MessageHead />
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default DetailMessage;
