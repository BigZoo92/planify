import { testCamera } from './fonctionCamera';
const TestCameraButton = () => {
  const handleClick = async () => {
    const result = await testCamera();
    console.log(result);
  };
  return (
    <button onClick={handleClick}>Tester Camera</button>
  );
};
export default TestCameraButton;
