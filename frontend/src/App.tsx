import './sass/main.scss';
import TestDialog from './capacitor/dialog/TestDialog';
import TestCamera from './capacitor/camera/TestCamera';
import TestGeolocation from './capacitor/geolocalisation/testGeoloc';
import TestNotification from './capacitor/notification/testNotif';
import TestVibreur from './capacitor/haptic/testVibreur';
function App() {
  return (
    <div>
      <TestDialog />
      <TestCamera />
      <TestGeolocation />
      <TestNotification />
      <TestVibreur />
    </div>
  );
}
export default App;
