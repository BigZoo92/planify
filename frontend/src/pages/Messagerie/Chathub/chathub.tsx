import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatItem } from 'react-chat-elements';
import chatData from './../chatData.json';
import './../../../sass/messagerieHub.scss';

const HubMessage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleChatItemClick = (id) => {
    navigate(`/detailmessage/${id}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      const filtered = chatData.contacts.filter((contact) =>
        contact.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts([]);
    }
  };

  return (
    <div id="hub-message">
      <h1>Messages</h1>
      {chatData.contacts.map((contact) => (
        <ChatItem
          key={contact.id}
          id={contact.id}
          avatar={contact.avatar}
          alt={contact.title}
          title={contact.title}
          subtitle={contact.subtitle}
          date={new Date(contact.date)}
          unread={contact.unread}
          onClick={() => handleChatItemClick(contact.id)}
        />
      ))}
      <form>
        <div className="form-group">
          <label htmlFor="summary">
            Nouveau message<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="summary"
            placeholder="Entrez le nom du contact"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredContacts.length > 0 && (
            <ul className="suggestions">
              {filteredContacts.map((contact) => (
                <li
                  key={contact.id}
                  onClick={() => handleChatItemClick(contact.id)}
                >
                  {contact.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="button-group">
          <button type="button" className="btn secondary full">
            Annuler
          </button>
          <button type="submit" className="btn main full">
            Créer
          </button>
        </div>
      </form>
    </div>
  );
};

export default HubMessage;
