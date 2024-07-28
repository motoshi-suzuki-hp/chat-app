import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatScreen from './components/ChatScreen';
import AdminScreen from './components/AdminScreen';
// import SettingsScreen from './components/SettingsScreen';
import BlogScreen from './components/BlogScreen';
import ProfileScreen from './components/ProfileScreen';
import './App.css';
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
// import { faGear } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const [view, setView] = useState<'chat' | 'admin'>('chat');

  return (
    <div className="App">
      <div className="content">
        <ProfileScreen />
        {view === 'chat' && <ChatScreen />}
        {view === 'admin' && <AdminScreen />}
        {/* <SettingsScreen /> */}
        <BlogScreen />

      </div>
      <div className="bottom-menu">
        <div className="bottom-menu-content">
          <button onClick={() => setView('chat')}>
            <FontAwesomeIcon icon={faMessage} />
            <p>Talk</p>
          </button>
        </div>
        <div className="bottom-menu-content">
          <button onClick={() => setView('admin')}>
            <FontAwesomeIcon icon={faPencil} />
            <p>Admin</p>
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;


{/* <FontAwesomeIcon icon={faGear} /> */}