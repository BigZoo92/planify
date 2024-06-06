import { useParams, useNavigate } from 'react-router-dom';
import { Avatar } from 'react-chat-elements';
import { CaretLeft } from '@phosphor-icons/react';
import chatData from './../chatData.json';

const MessageHead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = chatData.contacts.find((contact) => contact.id === id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className="message-head">
      <CaretLeft
        size={22}
        onClick={handleBackClick}
        style={{ cursor: 'pointer' }}
      />
      <Avatar src={contact.avatar} alt="avatar" size="small" />
      <div className="message-head-details">
        <h2>{contact.title}</h2>
        <p>{contact.subtitle}</p>
      </div>
    </section>
  );
};

export default MessageHead;
