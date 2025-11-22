import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './pages/Home';
import Host from './pages/Host';
import Player from './pages/Player';
import './index.css';

// Initialize socket outside component to prevent multiple connections
const socket = io('https://kahoot-g676.vercel.app/');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host/*" element={<Host socket={socket} />} />
          <Route path="/player/*" element={<Player socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
