import { describe, it, expect } from 'vitest'
import { parseKey, toCamelot, toTraditional, transpose, sameKey } from './keys.js'

const TABLE = {
  '1A': 'Abm', '1B': 'B', '2A': 'Ebm', '2B': 'F#', '3A': 'Bbm', '3B': 'Db',
  '4A': 'Fm', '4B': 'Ab', '5A': 'Cm', '5B': 'Eb', '6A': 'Gm', '6B': 'Bb',
  '7A': 'Dm', '7B': 'F', '8A': 'Am', '8B': 'C', '9A': 'Em', '9B': 'G',
  '10A': 'Bm', '10B': 'D', '11A': 'F#m', '11B': 'A', '12A': 'Dbm', '12B': 'E',
}

describe('camelot mapping', () => {
  it('matches the full wheel', () => {
    for (const [cam, trad] of Object.entries(TABLE)) {
      expect(toCamelot(parseKey(trad))).toBe(cam)
      expect(sameKey(parseKey(cam), parseKey(trad))).toBe(true)
      expect(parseKey(toTraditional(parseKey(cam)))).toEqual(parseKey(cam))
    }
  })
})

describe('parseKey', () => {
  it('is forgiving', () => {
    const am = parseKey('Am')
    for (const s of ['a minor', 'A min', ' a m ', '8a', '8A']) expect(parseKey(s)).toEqual(am)
    expect(parseKey('C#')).toEqual(parseKey('Db major'))
    expect(parseKey('f♯m')).toEqual(parseKey('Gbm'))
    expect(parseKey('B♭ maj')).toEqual(parseKey('A#'))
    expect(parseKey('Cb')).toEqual(parseKey('B'))
  })
  it('rejects junk', () => {
    for (const s of ['', 'H', '13A', '0B', 'Cx', 'C dorian']) expect(parseKey(s)).toBeNull()
  })
})

describe('transpose', () => {
  it('moves +7 on the wheel per semitone', () => {
    expect(toCamelot(transpose(parseKey('8A'), 1))).toBe('3A')
    expect(toCamelot(transpose(parseKey('8A'), 2))).toBe('10A')
    expect(toCamelot(transpose(parseKey('8B'), -1))).toBe('1B')
    expect(toCamelot(transpose(parseKey('12B'), 12))).toBe('12B')
  })
})
