import { MessageBox } from 'react-chat-elements';
const formatDate = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
const MessageList = () => {
  const downloadFile = (uri, fileName) => {
    const link = document.createElement('a');
    link.href = uri;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        text=""
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
        id="6"
        position="right"
        focus={false}
        type="file"
        title={formatDate(date)}
        text="Please find the attached file."
        titleColor="#000"
        data={{
          uri: 'C:/Users/quent/OneDrive/Images/power-of-attorney.pdf',
          status: { click: false, loading: 0 },
          size: '100KB',
          extension: 'pdf',
        }}
        date={new Date()}
        replyButton={false}
        forwarded={false}
        removeButton={false}
        status="sent"
        notch={false}
        retracted={false}
        onClick={() =>
          downloadFile(
            'https://drive.google.com/file/d/1NO6eUqfqlNNnkOBdeCwS3lrGRYlKirYp/view?usp=sharing',
            'test.pdf'
          )
        }
      />
      <MessageBox
        id="7"
        position="left"
        focus={false}
        type="file"
        title={formatDate(date)}
        text="Please find the attached file."
        titleColor="#000"
        data={{
          uri: 'C:/Users/quent/OneDrive/Images/power-of-attorney.pdf',
          status: { click: false, loading: 0 },
          size: '100KB',
          extension: 'pdf',
        }}
        date={new Date()}
        replyButton={false}
        forwarded={false}
        removeButton={false}
        status="sent"
        notch={false}
        retracted={false}
        onClick={() =>
          downloadFile(
            'https://drive.google.com/file/d/1NO6eUqfqlNNnkOBdeCwS3lrGRYlKirYp/view?usp=sharing',
            'test.pdf'
          )
        }
      />
    </div>
  );
};

export default MessageList;
