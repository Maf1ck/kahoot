import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Sub-components
import CreateGame from '../components/CreateGame';
import Lobby from '../components/Lobby';
import GameRunner from '../components/GameRunner';

function Host({ socket }) {
    const [gamePin, setGamePin] = useState(null);
    const [players, setPlayers] = useState([]);
    const [hostSecret, setHostSecret] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;

        socket.on('game_created', ({ pin, hostSecret }) => {
            setGamePin(pin);
            setHostSecret(hostSecret);
            navigate('/host/lobby');
        });

        socket.on('player_joined', (updatedPlayers) => {
            setPlayers(updatedPlayers);
        });

        socket.on('game_started', () => {
            navigate('/host/game');
        });

        socket.on('host_disconnected', () => {
            alert('Host disconnected');
            navigate('/');
        });

        socket.on('error', (msg) => {
            alert('Error: ' + msg);
        });

        return () => {
            socket.off('game_created');
            socket.off('player_joined');
            socket.off('game_started');
            socket.off('host_disconnected');
        };
    }, [socket, navigate]);

    return (
        <div className="host-container full-screen" style={{ background: '#f2f2f2' }}>
            <Routes>
                <Route path="/" element={<CreateGame socket={socket} />} />
                <Route path="/lobby" element={<Lobby pin={gamePin} players={players} socket={socket} hostSecret={hostSecret} />} />
                <Route path="/game" element={<GameRunner socket={socket} pin={gamePin} hostSecret={hostSecret} />} />
            </Routes>
        </div>
    );
}

export default Host;
