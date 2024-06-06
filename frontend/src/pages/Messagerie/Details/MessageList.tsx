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
          {message.type === 'photo-with-text' && (
            <div className="rce-container-mbox">
              <div className="rce-mbox rce-mbox-right rce-mbox--clear-padding rce-mbox--clear-notch">
                <div className="rce-mbox-body">
                  <div className="rce-mbox-title" style={{ color: '#000' }}>
                    <span>{formatDate(message.date)}</span>
                  </div>
                  <div className="rce-mbox-photo">
                    <div className="rce-mbox-photo--img">
                      <img src={message.data.uri} alt="uploaded" />
                      <div className="rce-mbox-photo--img__block">
                        <button className="rce-mbox-photo--img__block-item rce-mbox-photo--download">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 640 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-132.9 88.7L299.3 420.7c-6.2 6.2-16.4 6.2-22.6 0L171.3 315.3c-10.1-10.1-2.9-27.3 11.3-27.3H248V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v112h65.4c14.2 0 21.4 17.2 11.3 27.3z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="rce-mbox-text right">{message.text}</div>
                  </div>
                  <div className="rce-mbox-time rce-mbox-time-block non-copiable" data-text="2 minutes ago">
                    <span className="rce-mbox-status">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
