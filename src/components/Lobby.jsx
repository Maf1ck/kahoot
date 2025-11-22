import React from 'react';

function Lobby({ pin, players, socket, hostSecret }) {
    const startGame = () => {
        socket.emit('start_game', { pin, hostSecret });
    };

    return (
        <div className="full-screen flex-col flex-center" style={{ background: 'var(--primary)', color: 'white' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Join with PIN:</h2>
                <h1 style={{ fontSize: '5rem', margin: 0 }}>{typeof pin === 'object' ? pin.pin : pin}</h1>
            </div>

            <div className="container" style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    {players.map((p) => (
                        <div key={p.id} className="animate-fade-in" style={{
                            background: 'white',
                            color: 'var(--text-main)',
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}>
                            {p.nickname}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.1)', padding: '1rem' }} className="flex-center">
                <h3 style={{ marginRight: '2rem' }}>{players.length} Players</h3>
                <button className="btn btn-light" style={{ background: 'white', color: 'var(--primary)' }} onClick={startGame} disabled={players.length === 0}>
                    Start Game
                </button>
            </div>
        </div>
    );
}

export default Lobby;
