import './sass/main.scss';
import TestDialog from './capacitor/dialog/TestDialog';
import TestCamera from './capacitor/camera/TestCamera';
function App() {
  return (
    <div>
      <TestDialog />
      <TestCamera />
    </div>
  );
}
export default App;
