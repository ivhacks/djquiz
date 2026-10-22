import { useState } from 'react'
import { parseKey, sameKey } from './keys.js'

export default function Quiz({ mode, onBack }) {
  const [q, setQ] = useState(mode.make)
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null) // null | 'right' | 'wrong'
  const [score, setScore] = useState({ right: 0, total: 0 })

  function submit(e) {
    e.preventDefault()
    if (result) return next()
    const guess = parseKey(input)
    if (!guess) return setResult('invalid')
    const ok = sameKey(guess, q.answer)
    setResult(ok ? 'right' : 'wrong')
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }))
  }

  function next() {
    setQ(mode.make())
    setInput('')
    setResult(null)
  }

  return (
    <main>
      <div className="top">
        <button className="back" onClick={onBack}>← Back</button>
        <span>{score.right} / {score.total}</span>
      </div>
      <h2>{mode.title}</h2>
      <div className="prompt">{q.prompt}</div>
      <p className="hint">{q.hint}</p>
      <form onSubmit={submit}>
        <input
          autoFocus
          value={input}
          onChange={(e) => { setInput(e.target.value); if (result === 'invalid') setResult(null) }}
          placeholder="Your answer"
          autoCapitalize="off"
          autoComplete="off"
        />
        <button type="submit">{result && result !== 'invalid' ? 'Next' : 'Check'}</button>
      </form>
      {result === 'right' && <p className="right">✓ Correct: {q.answerText}</p>}
      {result === 'wrong' && <p className="wrong">✗ Answer: {q.answerText}</p>}
      {result === 'invalid' && <p className="wrong">Couldn't read that key. Try e.g. 8A, F#m, DbM.</p>}
    </main>
  )
}
