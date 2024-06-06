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

  const isImageFile = (file) => {
    const imageExtensions = ['png', 'jpg', 'jpeg', 'webp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  const handleSendMessage = (message, files) => {
    const newMessages = [];

    if (message && files.length === 0) {
      newMessages.push({
        position: 'right',
        type: 'text',
        text: message,
        date: new Date(),
        status: 'sent',
      });
    }

    files.forEach((file) => {
      if (isImageFile(file)) {
        newMessages.push({
          position: 'right',
          type: 'photo-with-text',
          text: message,
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
      }
    });

    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  return (
    <div id="detail-message">
      <MessageHead/>
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default DetailMessage;
