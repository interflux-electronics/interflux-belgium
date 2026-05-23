// To find the aspect ratio algorithmically, we need to find the greatest common divider (GCD).
// Inspired from: https://stackoverflow.com/questions/1186414/whats-the-algorithm-to-calculate-aspect-ratio

export function findGCD(a: number, b: number): number {
  return b == 0 ? a : findGCD(b, a % b);
}
