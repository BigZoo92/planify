import { MessageBox } from 'react-chat-elements';
const formatDate = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <MessageBox
          key={index}
          id={index.toString()}
          focus={false}
          titleColor="#000"
          position={message.position}
          title={formatDate(message.date)}
          type={message.type}
          text={message.text}
          date={message.date}
          replyButton={false}
          forwarded={false}
          removeButton={false}
          status={message.status}
          notch={false}
          retracted={false}
          data={message.data}
          onClick={message.onClick}
        />
      ))}
    </div>
  );
};

export default MessageList;
