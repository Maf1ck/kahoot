{/* Header */ }
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

{/* Main Content */ }
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

{/* Footer Controls */ }
<div className="flex-center" style={{ padding: '1rem', background: 'white' }}>
    <button className="btn btn-primary" onClick={handleNext}>
        {isShowingResults ? (results?.isFinal ? 'Exit' : 'Next Question') : 'Show Results'}
    </button>
</div>
        </div >
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
