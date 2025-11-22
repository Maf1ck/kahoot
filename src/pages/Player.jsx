import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import JoinGame from '../components/JoinGame';
import GamePad from '../components/GamePad';

function Player({ socket }) {
    const [playerState, setPlayerState] = useState({
        joined: false,
        pin: null,
        nickname: null,
        question: null, // { text, options, index, total, timeLimit }
        result: null // { correctAnswer, leaderboard }
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;

        socket.on('joined_success', ({ pin, nickname }) => {
            setPlayerState(prev => ({ ...prev, joined: true, pin, nickname }));
            navigate('/player/game');
        });

        socket.on('error', (msg) => {
            alert(msg);
        });

        socket.on('new_question_player', (q) => {
            setPlayerState(prev => ({ ...prev, question: q, result: null }));
        });

        socket.on('question_results', (res) => {
            setPlayerState(prev => ({ ...prev, result: res }));
        });

        socket.on('game_over', () => {
            alert('Game Over!');
            navigate('/');
        });

        socket.on('host_disconnected', () => {
            alert('Host disconnected');
            navigate('/');
        });

        return () => {
            socket.off('joined_success');
            socket.off('error');
            socket.off('new_question_player');
            socket.off('question_results');
            socket.off('game_over');
            socket.off('host_disconnected');
        };
    }, [socket, navigate]);

    return (
        <div className="player-container full-screen" style={{ background: '#f2f2f2' }}>
            <Routes>
                <Route path="/" element={<JoinGame socket={socket} />} />
                <Route path="/game" element={<GamePad socket={socket} playerState={playerState} />} />
            </Routes>
        </div>
    );
}

export default Player;
