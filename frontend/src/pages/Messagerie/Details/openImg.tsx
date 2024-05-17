import { useRef } from 'react';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const openImg = ({ messages }) => {
  const containerRef = useRef(null);

  const handleImageClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div ref={containerRef}>
      {messages.map((message, index) => {
        const commonProps = {
          key: index,
          id: message.id,
          position: message.position,
          type: message.type,
          text: message.text,
          date: message.date,
          title: message.title,
          focus: message.focus,
          titleColor: message.titleColor,
          forwarded: message.forwarded,
          replyButton: message.replyButton,
          removeButton: message.removeButton,
          retracted: message.retracted,
          status: message.status,
          notch: message.notch,
        };

        if (message.type === 'photo') {
          return (
            <MessageBox
              {...commonProps}
              data={{
                uri: message.data.uri,
                status: message.data.status,
              }}
              onClick={() => handleImageClick(message.data.uri)}
            />
          );
        }

        return <MessageBox {...commonProps} />;
      })}
    </div>
  );
};

export default openImg;
