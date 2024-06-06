import { MessageBox } from 'react-chat-elements';

const formatDate = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {message.text && (
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
          {message.files && message.files.length > 0 && (
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
                uri: message.files[0].uri,
                status: { click: false, loading: 0 },
              }}
              onClick={message.onClick}
            />
          )}
          {message.files &&
            message.files.length > 0 &&
            !message.text &&
            message.files.length > 1 && (
              <div className="message-files">
                {message.files.slice(1).map((file, fileIndex) => (
                  <div key={fileIndex} className="message-file-item">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={file.uri}
                        alt={file.name}
                        style={{ maxWidth: '200px' }}
                      />
                    ) : (
                      <div>
                        <p>{file.name}</p>
                        <p>{Math.round(file.size / 1024)} KB</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
