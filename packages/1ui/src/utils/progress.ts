export function getProgressPercentage(
  numberCompleted: number,
  numberTotal: number,
) {
  return numberTotal > 0 ? (numberCompleted / numberTotal) * 100 : 0
}
