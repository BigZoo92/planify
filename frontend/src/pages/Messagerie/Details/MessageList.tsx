import { MessageBox } from 'react-chat-elements';

const formatDate = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageList = ({ messages }) => {
  if (!messages || !Array.isArray(messages)) {
    return null;
  }

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {message.type === 'text' && (
            <MessageBox
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
          )}
          {message.type === 'photo' && (
            <MessageBox
              id={`${index.toString()}-files`}
              focus={false}
              titleColor="#000"
              position={message.position}
              title={formatDate(message.date)}
              type="photo"
              text=""
              date={message.date}
              replyButton={false}
              forwarded={false}
              removeButton={false}
              status={message.status}
              notch={false}
              retracted={false}
              data={{
                uri: message.data.uri,
                status: { click: false, loading: 0 },
              }}
              onClick={message.onClick}
            />
          )}
          {message.type === 'file' && (
            <MessageBox
              id={`${index.toString()}-files`}
              focus={false}
              titleColor="#000"
              position={message.position}
              title={formatDate(message.date)}
              type="file"
              text={message.text}
              date={message.date}
              replyButton={false}
              forwarded={false}
              removeButton={false}
              status={message.status}
              notch={false}
              retracted={false}
              data={{
                uri: message.data.uri,
                status: { click: false, loading: 0 },
                size: message.data.size,
                extension: message.data.extension,
              }}
              onClick={message.onClick}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
