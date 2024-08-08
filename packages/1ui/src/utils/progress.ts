export function getProgressPercentage(
  numberCompleted: number,
  numberTotal: number,
) {
  return numberTotal > 0 ? Math.floor((numberCompleted / numberTotal) * 100) : 0
}
