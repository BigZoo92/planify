import { MessageBox } from 'react-chat-elements';
const formatDate = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
const MessageList = () => {
  const date = new Date();
  return (
    <div>
      <MessageBox
        id={'1'}
        focus={false}
        titleColor="#000"
        position="right"
        title={formatDate(date)}
        type="text"
        text="Hi there!"
        date={date}
        replyButton={false}
        forwarded={false}
        removeButton={false}
        status="sent"
        notch={false}
        retracted={false}
      />
      <MessageBox
        id={'2'}
        focus={false}
        titleColor="#000"
        position="left"
        title={formatDate(date)}
        type="text"
        text="Enzo suce moi"
        date={date}
        replyButton={false}
        forwarded={false}
        removeButton={false}
        status="sent"
        notch={false}
        retracted={false}
      />
    </div>
  );
};

export default MessageList;
