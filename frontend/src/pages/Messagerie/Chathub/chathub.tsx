import { useNavigate } from 'react-router-dom';
import { ChatItem } from 'react-chat-elements';
import './../../../sass/messagerieHub.scss';

const contacts = [
  {
    id: '1',
    avatar: 'https://via.placeholder.com/150',
    title: 'John Doe',
    subtitle: 'Hello! How are you?',
    date: new Date(),
    unread: 3,
  },
  {
    id: '2',
    avatar: 'https://via.placeholder.com/150',
    title: 'Jane Smith',
    subtitle: 'Are you coming to the party?',
    date: new Date(),
    unread: 1,
  },
  {
    id: '3',
    avatar: 'https://via.placeholder.com/150',
    title: 'Alice Johnson',
    subtitle: "Don't forget the meeting tomorrow.",
    date: new Date(),
    unread: 2,
  },
];

const HubMessage = () => {
  const navigate = useNavigate();

  const handleChatItemClick = (id) => {
    navigate(`/detailmessage/${id}`);
  };
  return (
    <div id="hub-message">
      <h1>Messages</h1>
      {contacts.map((contact) => (
        <ChatItem
          key={contact.id}
          id={contact.id}
          avatar={contact.avatar}
          alt={contact.title}
          title={contact.title}
          subtitle={contact.subtitle}
          date={contact.date}
          unread={contact.unread}
          onClick={() => handleChatItemClick('chat1')}
        />
      ))}
    </div>
  );
};

export default HubMessage;
