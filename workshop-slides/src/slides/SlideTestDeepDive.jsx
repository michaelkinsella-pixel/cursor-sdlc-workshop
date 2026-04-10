const SlideTestDeepDive = () => (
  <>
    <div className="phase-header">
      <div className="phase-number test">04</div>
      <h2>Test</h2>
    </div>
    <p className="small" style={{ marginBottom: '0.5rem' }}>
      Catching bugs before they ship — and why test coverage stays low despite good intentions
    </p>

    <div className="deepdive-cols">
      <div className="deepdive-col">
        <h3 style={{ color: 'var(--orange)' }}>Discovery Questions</h3>
        <div className="pain-list">
          <div className="discovery-card">
            <span className="dq-icon">💬</span>
            <span className="dq-text">"What's your current test coverage? Are you happy with it?"</span>
          </div>
          <div className="discovery-card">
            <span className="dq-icon">💬</span>
            <span className="dq-text">"Who writes tests — the same engineer who wrote the feature, or a QA team?"</span>
          </div>
          <div className="discovery-card">
            <span className="dq-icon">💬</span>
            <span className="dq-text">"How often do bugs make it to production that tests should have caught?"</span>
          </div>
          <div className="discovery-card">
            <span className="dq-icon">💬</span>
            <span className="dq-text">"How long does your CI pipeline take to run? Does it slow down shipping?"</span>
          </div>
        </div>
      </div>

      <div className="deepdive-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
          padding: '0.5rem 0.75rem',
          background: 'linear-gradient(135deg, rgba(220, 50, 47, 0.06), rgba(220, 50, 47, 0.02))',
          border: '1px solid rgba(220, 50, 47, 0.15)',
          borderRadius: '8px',
        }}>
          <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>→</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--red)' }}>
            These questions surface the same pain points every time
          </span>
        </div>

        <h3 style={{ color: 'var(--red)', marginTop: '0' }}>Common Pain Points</h3>
        <div className="pain-list">
          <div className="pain-item">
            <span className="pain-icon">📉</span>
            <span className="pain-text"><strong>Low test coverage</strong> — writing tests is tedious, so it gets skipped under deadline pressure. Coverage stays at 20–40%.</span>
          </div>
          <div className="pain-item">
            <span className="pain-icon">🧪</span>
            <span className="pain-text"><strong>Tests that don't test the right things</strong> — brittle tests that break on refactors but miss real bugs. High maintenance, low value.</span>
          </div>
          <div className="pain-item">
            <span className="pain-icon">⏱️</span>
            <span className="pain-text"><strong>Slow CI feedback</strong> — 30–60 min pipelines mean devs context-switch away and come back to failures they've already forgotten.</span>
          </div>
          <div className="pain-item">
            <span className="pain-icon">🚀</span>
            <span className="pain-text"><strong>Ship-it culture wins</strong> — when the choice is "write tests or hit the deadline," tests lose every time. The debt compounds silently.</span>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default SlideTestDeepDive
