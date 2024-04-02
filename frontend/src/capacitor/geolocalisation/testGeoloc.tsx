import { fonctionGeoloc } from './fonctionGeoloc';
const TestGeolocation = () => {
  const handleClick = async () => {
    const result = await fonctionGeoloc();
    console.log(result);
  };
  return (
    <button onClick={handleClick}>Tester la géolocalisation</button>
  );
};
export default TestGeolocation;
