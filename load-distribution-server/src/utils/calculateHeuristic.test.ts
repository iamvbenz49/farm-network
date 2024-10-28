import { calculateHeuristic } from './calculateHeuristic';


test('calculates heuristic for given factors array', () => {
  expect(calculateHeuristic([
    [2, 3, 4],  // 2 * 3 * 4 = 24
    [1, 5, 6],  // 1 * 5 * 6 = 30
    [7, 8]      // 7 * 8 = 56
  ])).toBe(110);
});
