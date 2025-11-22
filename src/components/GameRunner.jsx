import React, { useState, useEffect } from 'react';

function GameRunner({ socket, pin, hostSecret }) {
    const [question, setQuestion] = useState(null);
    const [results, setResults] = useState(null); // { correctAnswer, leaderboard }
    const [answeredCount, setAnsweredCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isShowingResults, setIsShowingResults] = useState(false);

    useEffect(() => {
        socket.on('new_question_host', (q) => {
            setQuestion(q);
            setResults(null);
            setAnsweredCount(0);
            setTimer(q.timeLimit || 20);
            setIsShowingResults(false);
        });

        socket.on('player_answered', ({ count }) => {
            setAnsweredCount(count);
        });

        socket.on('question_results', (res) => {
            setResults(res);
            setIsShowingResults(true);
        });

        socket.on('game_over', (leaderboard) => {
            // Handle game over, maybe show final podium
            setResults({ leaderboard, isFinal: true });
            setIsShowingResults(true);
        });

        return () => {
            socket.off('new_question_host');
            socket.off('player_answered');
            socket.off('question_results');
            socket.off('game_over');
        };
    }, [socket]);

    useEffect(() => {
        if (timer > 0 && !isShowingResults) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0 && !isShowingResults && question) {
            // Time up, show results automatically or wait for host?
            // Usually host clicks "Show Results" or it happens auto.
            // Let's make it auto for now or host button.
            // socket.emit('show_results', pin); 
        }
    }, [timer, isShowingResults, question]);

    const handleNext = () => {
        if (results && results.isFinal) {
            // Go home or restart
            window.location.href = '/';
        } else if (isShowingResults) {
            socket.emit('next_question', { pin, hostSecret });
        } else {
            socket.emit('show_results', { pin, hostSecret });
        }
    };

    if (!question) return <div className="flex-center full-screen">Loading...</div>;

    return (
        <div className="full-screen flex-col" style={{ background: '#f2f2f2' }}>
            {/* Header */}
            <div className="flex-center" style={{ padding: '1rem', background: 'white', justifyContent: 'space-between' }}>
                <h2>{question.text}</h2>
                <div className="flex-center">
                    <div style={{
                        width: '60px', height: '60px', borderRadius: '50%',
                        background: 'var(--primary)', color: 'white',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        fontSize: '1.5rem', fontWeight: 'bold'
                    }}>
                        {timer}
                    </div>
                    <div style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>
                        Answers: {answeredCount}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-center" style={{ flex: 1, padding: '2rem' }}>
                {isShowingResults ? (
                    <div className="card" style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
                        {results.isFinal ? <h1>Final Leaderboard</h1> : <h1>Results</h1>}
                        {results.leaderboard.map((p, i) => (
                            <div key={p.id} style={{
                                padding: '1rem', margin: '0.5rem 0',
                                background: i === 0 ? 'gold' : '#eee',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex', justifyContent: 'space-between'
                            }}>
                                <span>#{i + 1} {p.nickname}</span>
                                <span>{p.score} pts</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {question.options.map((opt, i) => (
                            <div key={i} className={`flex-center card ${getShapeClass(i)}`} style={{
                                background: getColor(i), color: 'white', fontSize: '1.5rem', fontWeight: 'bold',
                                cursor: 'default'
                            }}>
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Controls */}
            <div className="flex-center" style={{ padding: '1rem', background: 'white' }}>
                <button className="btn btn-primary" onClick={handleNext}>
                    {isShowingResults ? (results?.isFinal ? 'Exit' : 'Next Question') : 'Show Results'}
                </button>
            </div>
        </div>
    );
}

function getColor(index) {
    const colors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];
    return colors[index % 4];
}

function getShapeClass(index) {
    // Just for css reference, not fully implementing shapes in css yet
    return '';
}

export default GameRunner;
