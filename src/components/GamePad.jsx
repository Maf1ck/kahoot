import React, { useState, useEffect } from 'react';

function GamePad({ socket, playerState }) {
    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const { question, result, pin, nickname } = playerState;

    useEffect(() => {
        if (question) {
            setAnswered(false);
            setTimeLeft(question.timeLimit);
        }
    }, [question]);

    useEffect(() => {
        if (timeLeft > 0 && !result && !answered) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, result, answered]);

    const submitAnswer = (index) => {
        if (!answered && !result) {
            setAnswered(true);
            socket.emit('submit_answer', { pin, answerIndex: index, timeLeft });
        }
    };

    if (!question) {
        return (
            <div className="full-screen flex-center flex-col" style={{ background: '#46178f', color: 'white' }}>
                <h2>You're in!</h2>
                <p>See your nickname on screen?</p>
                <h3 style={{ marginTop: '1rem' }}>{nickname}</h3>
                <div className="loader" style={{ marginTop: '2rem' }}>Waiting for game to start...</div>
            </div>
        );
    }

    if (result) {
        const isCorrect = result.correctAnswer !== undefined; // If we track individual correctness locally or from server. 
        // Actually server sends `correctAnswer` index. We need to know what we picked? 
        // Simplified: Just show "Result" or "Look at host".
        // Ideally we'd track what we picked.

        return (
            <div className="full-screen flex-center flex-col" style={{ background: '#46178f', color: 'white' }}>
                <h2>Time's Up!</h2>
                <p>Look at the host screen for results.</p>
            </div>
        );
    }

    if (answered) {
        return (
            <div className="full-screen flex-center flex-col" style={{ background: '#46178f', color: 'white' }}>
                <h2>Answer Sent!</h2>
                <p>Waiting for others...</p>
            </div>
        );
    }

    return (
        <div className="full-screen flex-col">
            <div style={{ padding: '1rem', background: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                {question.index + 1} / {question.total}
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', padding: '1rem' }}>
                {['Triangle', 'Diamond', 'Circle', 'Square'].map((shape, i) => (
                    <button
                        key={i}
                        className={`btn flex-center ${getShapeClass(i)}`}
                        style={{
                            background: getColor(i),
                            color: 'white',
                            fontSize: '0', // Hide text, rely on color/icon if we had icons
                            width: '100%', height: '100%'
                        }}
                        onClick={() => submitAnswer(i)}
                    >
                        {/* Could add icons here */}
                    </button>
                ))}
            </div>
        </div>
    );
}

function getColor(index) {
    const colors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];
    return colors[index % 4];
}

function getShapeClass(index) {
    return '';
}

export default GamePad;
