import React, { useState } from 'react';

function CreateGame({ socket }) {
    const [questions, setQuestions] = useState([
        { text: '', options: ['', '', '', ''], correctIndex: 0, timeLimit: 20 }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { text: '', options: ['', '', '', ''], correctIndex: 0, timeLimit: 20 }]);
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const updateOption = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const createGame = () => {
        // Validate
        if (questions.some(q => !q.text || q.options.some(o => !o))) {
            alert('Please fill in all fields');
            return;
        }
        socket.emit('create_game', questions);
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Create New Game</h2>

            {questions.map((q, qIndex) => (
                <div key={qIndex} className="card" style={{ marginBottom: '2rem' }}>
                    <h3>Question {qIndex + 1}</h3>
                    <input
                        className="input"
                        placeholder="Question Text"
                        value={q.text}
                        onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {q.options.map((opt, oIndex) => (
                            <div key={oIndex} className="flex-center">
                                <input
                                    type="radio"
                                    name={`correct-${qIndex}`}
                                    checked={q.correctIndex === oIndex}
                                    onChange={() => updateQuestion(qIndex, 'correctIndex', oIndex)}
                                    style={{ marginRight: '0.5rem', transform: 'scale(1.5)' }}
                                />
                                <input
                                    className="input"
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={opt}
                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                    style={{ marginBottom: 0 }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex-center" style={{ gap: '1rem', paddingBottom: '2rem' }}>
                <button className="btn btn-secondary" onClick={addQuestion}>Add Question</button>
                <button className="btn btn-primary" onClick={createGame}>Create & Host</button>
            </div>
        </div>
    );
}

export default CreateGame;
