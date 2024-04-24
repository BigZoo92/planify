import { MessageBox } from 'react-chat-elements';

const MessageList = () => {
  return (
    <div>
        <MessageBox
            id={'1'}
            focus={false}
            titleColor='#000'
            position='left'
            title='Burhan'
            type='text'
            text="Hi there!"
            date={new Date()}
            replyButton={true}
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
