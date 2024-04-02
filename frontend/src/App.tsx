import './sass/main.scss';
import TestDialog from './capacitor/dialog/TestDialog';
import TestCamera from './capacitor/camera/TestCamera';
import TestGeolocation from './capacitor/geolocalisation/testGeoloc';
import TestNotification from './capacitor/notification/testNotif';
function App() {
  return (
    <div>
      <TestDialog />
      <TestCamera />
      <TestGeolocation />
      <TestNotification />
    </div>
  );
}
export default App;
