export const LEVELS = {
  0: { radius: 8 },
  1: { radius: 12 },
  2: { radius: 16 },
  3: { radius: 20 },
  4: { radius: 24 },
  5: { radius: 28 },
  6: { radius: 32 },
  7: { radius: 36 },
  8: { radius: 40 },
  9: { radius: 45 },
  10: { radius: 50 }
};

export function getRandomLevel() {
  const randomLevel = Math.round(Math.random() * (4-0) + 0)
  return randomLevel
}
