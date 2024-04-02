import React from 'react';
import { fonctionVibration } from './fonctionVibreur';

const TestVibration: React.FC = () => {
  const handleOnClick = () => {
    fonctionVibration();
  };

  return (
    <button onClick={handleOnClick}>Test Vibration</button>
  );
};

export default TestVibration;
