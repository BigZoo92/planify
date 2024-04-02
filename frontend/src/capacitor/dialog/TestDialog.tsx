import { testDialog } from './fonctionDialog';
const TestDialog = () => {
    const handleClick = async () => {
      const result = await testDialog();
      console.log(result);
    };
    return (
      <button onClick={handleClick}>Tester Dialog</button>
    );
  };
export default TestDialog;
