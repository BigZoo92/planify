import { ChatItem } from 'react-chat-elements';
import './../../../sass/messagerieHub.scss';
const HubMessage = () => {
  return (
    <div id="hub-message">
      <ChatItem
        id="chat1"
        avatar={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'
        }
        alt={'Reactjs'}
        title={'Facebook'}
        subtitle={'What are you doing?'}
        date={new Date()}
        unread={0}
      />
      <ChatItem
        id="chat2"
        avatar={'https://via.placeholder.com/150'}
        alt={'User1'}
        title={'John Doe'}
        subtitle={'Hello! How are you?'}
        date={new Date()}
        unread={3}
      />
      <ChatItem
        id="chat3"
        avatar={'https://via.placeholder.com/150'}
        alt={'User2'}
        title={'Jane Smith'}
        subtitle={'Are you coming to the party?'}
        date={new Date()}
        unread={1}
      />
      <ChatItem
        id="chat4"
        avatar={'https://via.placeholder.com/150'}
        alt={'User3'}
        title={'Alice Johnson'}
        subtitle={"Don't forget the meeting tomorrow."}
        date={new Date()}
        unread={2}
      />
    </div>
  );
};

export default HubMessage;
