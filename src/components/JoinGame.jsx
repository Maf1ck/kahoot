import React, { useState } from 'react';

function JoinGame({ socket }) {
    const [pin, setPin] = useState('');
    const [nickname, setNickname] = useState('');

    const join = () => {
        if (pin && nickname) {
            socket.emit('join_game', { pin, nickname });
        }
    };

    return (
        <div className="full-screen flex-center flex-col" style={{ background: 'linear-gradient(135deg, #46178f 0%, #864cbf 100%)', color: 'white' }}>
            <h1 style={{ marginBottom: '2rem' }}>MyKahoot</h1>
            <div className="card" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    className="input"
                    placeholder="Game PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                />
                <input
                    className="input"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                />
                <button className="btn btn-dark" style={{ background: '#333', color: 'white', width: '100%' }} onClick={join}>
                    Enter
                </button>
            </div>
        </div>
    );
}

export default JoinGame;
