import { ChatItem } from 'react-chat-elements';
import './../../../sass/messagerieHub.scss';

const HubMessage = () => {
  return (
    <div id="hub-message">
      <h1>Messagerie</h1>
      <ChatItem
        id="chat1"
        avatar={'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg'}
        alt={'Reactjs'}
        title={'Support Team'}
        subtitle={'Your ticket has been resolved.'}
        date={new Date()}
        unread={0}
      />
      <ChatItem
        id="chat2"
        avatar={'https://www.missnumerique.com/blog/wp-content/uploads/photo-de-profil-pour-les-reseaux-sociaux-joseph-gonzalez.jpg'}
        alt={'User1'}
        title={'John Doe'}
        subtitle={'Hello! How are you doing today?'}
        date={new Date()}
        unread={3}
      />
      <ChatItem
        id="chat3"
        avatar={'https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?s=612x612&w=0&k=20&c=CS0xj40eNCorQyzN1ImeMKlvPDocPHSaMsXethQ-Q_g='}
        alt={'User2'}
        title={'Jane Smith'}
        subtitle={'Are you coming to the party tonight?'}
        date={new Date(new Date().getTime() - 3600000)} // 1 hour ago
        unread={1}
      />
      <ChatItem
        id="chat4"
        avatar={'https://www.missnumerique.com/blog/wp-content/uploads/reussir-sa-photo-de-profil-michael-dam.jpg'}
        alt={'User3'}
        title={'Alice Johnson'}
        subtitle={"Don't forget the meeting tomorrow at 10 AM."}
        date={new Date(new Date().getTime() - 86400000)} // 1 day ago
        unread={2}
      />
      <ChatItem
        id="chat5"
        avatar={'https://mediaslide-europe.storage.googleapis.com/profil/pictures/11348/24404/profile-1686324879-703bcf7f3efb88a10f6ac5427d212c72.jpg'}
        alt={'User4'}
        title={'Bob Martin'}
        subtitle={'Can you send me the report?'}
        date={new Date(new Date().getTime() - 600000)}
        unread={5}
      />
      <ChatItem
        id="chat6"
        avatar={'https://www.trouver-mon-photographe.fr/media/cache/remote_news_head/upload/1582544247_c-decouvertes.png'}
        alt={'User5'}
        title={'Charlie Brown'}
        subtitle={'Thanks for the update!'}
        date={new Date(new Date().getTime() - 7200000)}
        unread={0}
      />
      <ChatItem
        id="chat7"
        avatar={'https://via.placeholder.com/150'}
        alt={'User6'}
        title={'Diana Prince'}
        subtitle={'I will be on vacation next week.'}
        date={new Date(new Date().getTime() - 259200000)}
        unread={4}
      />
      <ChatItem
        id="chat8"
        avatar={'https://via.placeholder.com/150'}
        alt={'User7'}
        title={'Eve Adams'}
        subtitle={'Please review the attached document.'}
        date={new Date(new Date().getTime() - 43200000)}
        unread={1}
      />
    </div>
  );
};

export default HubMessage;
