// Pitch classes: 0 = C, 1 = C#/Db, ... 11 = B
const NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

// Camelot number for each pitch class (index = pitch class)
// B (major) side: C=8B, G=9B, ... ; A (minor) side: Am=8A, Em=9A, ...
const MAJOR_NUM = [8, 3, 10, 5, 12, 7, 2, 9, 4, 11, 6, 1]
const MINOR_NUM = [5, 12, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10]

// A key is { pc: 0-11, minor: boolean }

export function toCamelot({ pc, minor }) {
  return (minor ? MINOR_NUM[pc] : MAJOR_NUM[pc]) + (minor ? 'A' : 'B')
}

export function toTraditional({ pc, minor }) {
  let name = NOTE_NAMES[pc]
  if (minor && pc === 1) name = 'C#' // C#m reads nicer than Dbm
  if (minor && pc === 3) name = 'Eb'
  return name + (minor ? 'm' : 'M')
}

export function fromCamelot(num, letter) {
  const table = letter === 'A' ? MINOR_NUM : MAJOR_NUM
  return { pc: table.indexOf(num), minor: letter === 'A' }
}

// Forgiving parser: "8a", "A minor", "a min", "DbM", "C#maj", "f♯m", "Bb major"
export function parseKey(input) {
  let s = String(input).trim().replace(/♯/g, '#').replace(/♭/g, 'b').replace(/\s+/g, '')
  const cam = s.match(/^(\d{1,2})([ab])$/i)
  if (cam) {
    const n = Number(cam[1])
    if (n < 1 || n > 12) return null
    return fromCamelot(n, cam[2].toUpperCase())
  }
  const m = s.match(/^([a-g])(#|b)?(.*)$/i)
  if (!m) return null
  let pc = LETTER_PC[m[1].toUpperCase()]
  if (m[2] === '#') pc += 1
  if (m[2] === 'b') pc -= 1
  pc = (pc + 12) % 12
  // "m" = minor, "M" = major; bare note (e.g. "B") is not a valid key
  const raw = m[3]
  const q = raw.toLowerCase()
  let minor
  if (raw === 'm' || q === 'min' || q === 'minor') minor = true
  else if (raw === 'M' || q === 'maj' || q === 'major') minor = false
  else return null
  return { pc, minor }
}

export function sameKey(a, b) {
  return !!a && !!b && a.pc === b.pc && a.minor === b.minor
}

export function transpose(key, steps) {
  return { pc: (((key.pc + steps) % 12) + 12) % 12, minor: key.minor }
}

export function randomKey() {
  return { pc: Math.floor(Math.random() * 12), minor: Math.random() < 0.5 }
}

export function describe(key) {
  return `${toCamelot(key)} / ${toTraditional(key)}`
}
