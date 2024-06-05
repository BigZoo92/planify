import React from 'react';
import { Avatar } from 'react-chat-elements';
import { CaretLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface MessageHeadProps {
  title: string;
  subtitle: string;
  avatarUrl: string;
}

const MessageHead: React.FC<MessageHeadProps> = ({ title, subtitle, avatarUrl }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/messages');
  };

  return (
    <section className="message-head">
      <CaretLeft size={38} onClick={handleBackClick} style={{ cursor: 'pointer' }} />
      <Avatar src={avatarUrl} alt="avatar" size="small" />
      <div className="message-head-details">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </section>
  );
};

export default MessageHead;
