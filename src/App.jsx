import { useState } from 'react'
import Quiz from './Quiz.jsx'
import { randomKey, toCamelot, toTraditional, transpose, describe } from './keys.js'

function mappingQuestion() {
  const key = randomKey()
  const showCamelot = Math.random() < 0.5
  return {
    prompt: showCamelot ? toCamelot(key) : toTraditional(key),
    hint: showCamelot ? 'Type the traditional key (e.g. Am, DbM)' : 'Type the Camelot key (e.g. 8A)',
    answer: key,
    answerText: showCamelot ? toTraditional(key) : toCamelot(key),
    wantCamelot: !showCamelot,
  }
}

function transposeQuestion() {
  const key = randomKey()
  let steps = 0
  while (steps === 0) steps = Math.floor(Math.random() * 23) - 11
  const answer = transpose(key, steps)
  return {
    prompt: `${describe(key)}  ${steps > 0 ? '+' : ''}${steps}`,
    hint: 'Type the new key, Camelot or traditional',
    answer,
    answerText: describe(answer),
  }
}

const MODES = [
  { id: 'mappings', title: 'Mappings', blurb: 'Traditional ⇄ Camelot', make: mappingQuestion },
  { id: 'transpose', title: 'Transpose', blurb: 'Shift a key by semitones', make: transposeQuestion },
]

export default function App() {
  const [mode, setMode] = useState(null)

  if (mode) return <Quiz mode={mode} onBack={() => setMode(null)} />

  return (
    <main>
      <h1>djquiz</h1>
      <div className="grid">
        {MODES.map((m) => (
          <button key={m.id} className="card" onClick={() => setMode(m)}>
            <strong>{m.title}</strong>
            <span>{m.blurb}</span>
          </button>
        ))}
      </div>
    </main>
  )
}
