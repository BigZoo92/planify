import React from 'react';
import { fonctionNotif } from './fonctionNotif';
const TestNotification: React.FC = () => {
  const handleOnClick = () => {
    fonctionNotif();
  };
  return (
    <button onClick={handleOnClick}>Send Test Notification</button>
  );
};
export default TestNotification;
