import './sass/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HubMessage from './pages/Messagerie/Chathub/chathub.tsx';
import DetailMessage from './pages/Messagerie/Details/detailMessage.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/messages" Component={HubMessage} />
        <Route path="/detailmessage/:id" Component={DetailMessage} />
        </Routes>
    </Router>
  );
}

export default App;