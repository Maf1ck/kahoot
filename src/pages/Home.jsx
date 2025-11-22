import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="full-screen flex-center flex-col" style={{ background: 'linear-gradient(135deg, #46178f 0%, #864cbf 100%)', color: 'white' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '2rem', textShadow: '0 4px 0 rgba(0,0,0,0.2)' }}>MyKahoot</h1>

            <div className="flex-center" style={{ gap: '2rem' }}>
                <button
                    className="btn btn-light"
                    style={{ padding: '20px 40px', fontSize: '1.5rem', background: 'white', color: '#46178f' }}
                    onClick={() => navigate('/host')}
                >
                    Create Game
                </button>

                <button
                    className="btn btn-light"
                    style={{ padding: '20px 40px', fontSize: '1.5rem', background: 'white', color: '#46178f' }}
                    onClick={() => navigate('/player')}
                >
                    Join Game
                </button>
            </div>
        </div>
    );
}

export default Home;
