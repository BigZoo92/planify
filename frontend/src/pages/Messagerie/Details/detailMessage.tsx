import ChatInput from './ChatInput';
import MessageList from './MessageList';
import MessageHead from './MessageHead';
const DetailMessage = () => {
  return (
    <div id="detail-message">
      <MessageHead
        title="John Doe"
        subtitle="Online"
        avatarUrl="https://via.placeholder.com/150"
      />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default DetailMessage;
