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
        text="test 2"
        date={date}
        replyButton={false}
        forwarded={false}
        removeButton={false}
        status="read"
        notch={false}
        retracted={false}
      />
      <MessageBox
        id="4"
        position="left"
        focus={false}
        type="photo"
        title={formatDate(date)}
        text="jfdgsirfojqzroo egflbnfk c  bf,v"
        titleColor="#000"
        data={{
          uri: 'https://blog.hubspot.com/hs-fs/hubfs/parts-url_1.webp?width=595&height=400&name=parts-url_1.webp',
          status: { click: false, loading: 0 },
        }}
        date={new Date()}
        replyButton={false}
        forwarded={false}
        removeButton={false}
        status="read"
        notch={false}
        retracted={false}
      />
      <MessageBox
        id="5"
        position="right"
        focus={false}
        type="photo"
        title={formatDate(date)}
        text="jfdgsirfojqzroo egflbnfk c  bf,v"
        titleColor="#000"
        data={{
          uri: 'https://blog.hubspot.com/hs-fs/hubfs/parts-url_1.webp?width=595&height=400&name=parts-url_1.webp',
          status: { click: false, loading: 0 },
        }}
        date={new Date()}
        replyButton={false}
        forwarded={false}
        removeButton={false}
        status="read"
        notch={false}
        retracted={false}
      />
    </div>
  );
};

export default MessageList;
